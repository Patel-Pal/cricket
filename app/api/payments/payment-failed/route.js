import { NextResponse } from 'next/server';
import { createPaymentRecord } from '@/services/paymentService';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, error_reason, playerName, mobile } = await request.json();

    if (!razorpay_order_id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const payment = await createPaymentRecord({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id || null,
      razorpaySignature: null,
      playerName: playerName || 'Unknown',
      mobile: mobile || '',
      amount: parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 50000,
      currency: 'INR',
      status: 'failed',
    });

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Record failed payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
