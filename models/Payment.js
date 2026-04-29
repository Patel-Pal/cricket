import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  playerName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['paid', 'failed', 'refunded'],
    default: 'paid',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
