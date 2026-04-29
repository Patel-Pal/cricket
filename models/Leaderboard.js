import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    unique: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  matchesPlayed: {
    type: Number,
    default: 0,
  },
  matchesWon: {
    type: Number,
    default: 0,
  },
  matchesLost: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
