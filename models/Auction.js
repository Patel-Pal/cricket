import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'completed'],
    default: 'pending',
  },
  currentPlayerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  timerDuration: {
    type: Number,
    default: 60,
  },
  timerRemaining: {
    type: Number,
    default: 60,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Auction || mongoose.model('Auction', auctionSchema);
