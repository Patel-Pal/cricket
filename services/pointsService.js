import PlayerStats from '@/models/PlayerStats';
import Team from '@/models/Team';
import Leaderboard from '@/models/Leaderboard';
import connectDB from '@/lib/mongodb';

export const calculatePlayerPoints = (stats) => {
  let points = 0;
  
  points += stats.runs * 1;
  points += stats.wickets * 25;
  points += stats.catches * 8;
  points += stats.sixes * 2;
  
  if (stats.economyRate < 6) {
    points += 10;
  } else if (stats.economyRate < 7) {
    points += 5;
  }
  
  return points;
};

export const updatePlayerStats = async (playerId, matchId, stats) => {
  await connectDB();
  
  const points = calculatePlayerPoints(stats);
  
  const playerStats = await PlayerStats.create({
    playerId,
    matchId,
    ...stats,
    points,
  });
  
  return playerStats;
};

export const updateTeamPoints = async (teamId) => {
  await connectDB();
  
  const team = await Team.findById(teamId).populate('purchasedPlayers');
  
  let totalPoints = 0;
  for (const player of team.purchasedPlayers) {
    const stats = await PlayerStats.find({ playerId: player._id });
    totalPoints += stats.reduce((sum, stat) => sum + stat.points, 0);
  }
  
  await Team.findByIdAndUpdate(teamId, { totalPoints });
  await Leaderboard.findOneAndUpdate(
    { teamId },
    { totalPoints },
    { upsert: true }
  );
  
  return totalPoints;
};

export const updateLeaderboard = async () => {
  await connectDB();
  
  const leaderboard = await Leaderboard.find()
    .populate('teamId')
    .sort({ totalPoints: -1 });
  
  for (let i = 0; i < leaderboard.length; i++) {
    await Leaderboard.findByIdAndUpdate(leaderboard[i]._id, { rank: i + 1 });
  }
  
  return leaderboard;
};

export const getLeaderboard = async () => {
  await connectDB();
  const leaderboard = await Leaderboard.find()
    .populate('teamId')
    .sort({ rank: 1 });
  return leaderboard;
};
