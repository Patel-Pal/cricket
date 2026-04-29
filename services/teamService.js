import Team from '@/models/Team';
import Leaderboard from '@/models/Leaderboard';
import connectDB from '@/lib/mongodb';

export const createTeam = async (teamData) => {
  await connectDB();
  const team = await Team.create({
    ...teamData,
    remainingBudget: teamData.budget,
  });
  
  await Leaderboard.create({ teamId: team._id });
  
  return team;
};

export const getAllTeams = async () => {
  await connectDB();
  const teams = await Team.find().populate('ownerId purchasedPlayers');
  return teams;
};

export const getTeamById = async (id) => {
  await connectDB();
  const team = await Team.findById(id).populate('ownerId purchasedPlayers');
  return team;
};

export const updateTeamBudget = async (teamId, amount) => {
  await connectDB();
  const team = await Team.findById(teamId);
  team.remainingBudget -= amount;
  await team.save();
  return team;
};

export const addPlayerToTeam = async (teamId, playerId, amount) => {
  await connectDB();
  const team = await Team.findById(teamId);
  team.purchasedPlayers.push(playerId);
  team.remainingBudget -= amount;
  await team.save();
  return team;
};

export const getTeamByOwnerId = async (ownerId) => {
  await connectDB();
  const team = await Team.findOne({ ownerId }).populate('purchasedPlayers');
  return team;
};
