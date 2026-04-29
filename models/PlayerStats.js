import mongoose from 'mongoose';

const playerStatsSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  catches: {
    type: Number,
    default: 0,
  },
  sixes: {
    type: Number,
    default: 0,
  },
  economyRate: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.PlayerStats || mongoose.model('PlayerStats', playerStatsSchema);
