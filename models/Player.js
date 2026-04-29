import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['batsman', 'bowler', 'allrounder', 'wicketkeeper'],
    required: true,
  },
  battingStyle: {
    type: String,
    enum: ['right-hand', 'left-hand', 'none'],
    required: true,
  },
  bowlingStyle: {
    type: String,
    enum: ['right-arm-fast', 'left-arm-fast', 'right-arm-spin', 'left-arm-spin', 'none'],
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  matchesPlayed: {
    type: Number,
    default: 0,
  },
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  strikeRate: {
    type: Number,
    default: 0,
  },
  photo: {
    url: String,
    publicId: String,
  },
  identityProof: {
    url: String,
    publicId: String,
  },
  playerNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAuctionAvailable: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  soldPrice: {
    type: Number,
    default: 0,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Player || mongoose.model('Player', playerSchema);
