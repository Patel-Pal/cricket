import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '@/models/Payment';
import connectDB from '@/lib/mongodb';

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createRazorpayOrder = async (playerName, mobile) => {
  const razorpay = getRazorpayInstance();
  const amount = parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 50000;

  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    notes: {
      playerName,
      mobile,
      purpose: 'player_registration',
    },
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
};

export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

export const createPaymentRecord = async (paymentData) => {
  await connectDB();
  const payment = await Payment.create(paymentData);
  return payment;
};
