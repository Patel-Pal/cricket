import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  teamLogo: {
    url: String,
    publicId: String,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
    default: 15,
  },
  remainingBudget: {
    type: Number,
    required: true,
  },
  purchasedPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  }],
  totalPoints: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Team || mongoose.model('Team', teamSchema);
