import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
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
