import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/services/paymentService';

export async function POST(request) {
  try {
    const { playerName, mobile } = await request.json();

    if (!playerName || !mobile) {
      return NextResponse.json(
        { success: false, error: 'Player name and mobile are required' },
        { status: 400 }
      );
    }

    const orderData = await createRazorpayOrder(playerName, mobile);

    return NextResponse.json({
      success: true,
      data: orderData,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
