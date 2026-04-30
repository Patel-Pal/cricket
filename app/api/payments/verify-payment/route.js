import { NextResponse } from 'next/server';
import { verifyPaymentSignature, createPaymentRecord } from '@/services/paymentService';
import { createPlayer } from '@/services/playerService';
import { sendPlayerRegistrationEmail, sendPlayerConfirmationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      playerData,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Payment details are required' },
        { status: 400 }
      );
    }

    if (!playerData) {
      return NextResponse.json(
        { success: false, error: 'Player data is required' },
        { status: 400 }
      );
    }

    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const player = await createPlayer({
      ...playerData,
      paymentStatus: 'paid',
    });

    const payment = await createPaymentRecord({
      playerId: player._id,
      playerName: playerData.name || '',
      mobile: playerData.mobile || '',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 50000,
      currency: 'INR',
      status: 'paid',
    });

    // Send notification email to admin (non-blocking)
    sendPlayerRegistrationEmail({
      playerName: playerData.name || '',
      mobile: playerData.mobile || '',
      category: playerData.category || '',
      amount: parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 50000,
      paymentId: razorpay_payment_id,
    }).catch((err) => console.error('Admin email notification failed:', err));

    // Send confirmation email to player (non-blocking)
    if (playerData.email) {
      sendPlayerConfirmationEmail({
        playerName: playerData.name || '',
        playerEmail: playerData.email,
        mobile: playerData.mobile || '',
        category: playerData.category || '',
        battingStyle: playerData.battingStyle || '',
        bowlingStyle: playerData.bowlingStyle || '',
        amount: parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 50000,
        paymentId: razorpay_payment_id,
      }).catch((err) => console.error('Player confirmation email failed:', err));
    }

    return NextResponse.json(
      { success: true, data: { player, payment } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed: ' + error.message },
      { status: 500 }
    );
  }
}
