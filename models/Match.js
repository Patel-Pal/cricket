import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  matchName: {
    type: String,
    required: true,
  },
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  matchDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed'],
    default: 'scheduled',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Match || mongoose.model('Match', matchSchema);
