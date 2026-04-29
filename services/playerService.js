import Player from '@/models/Player';
import connectDB from '@/lib/mongodb';

export const createPlayer = async (playerData) => {
  await connectDB();
  const player = await Player.create(playerData);
  return player;
};

export const getAllPlayers = async (filters = {}) => {
  await connectDB();
  const players = await Player.find(filters).populate('teamId');
  return players;
};

export const getPlayerById = async (id) => {
  await connectDB();
  const player = await Player.findById(id).populate('teamId');
  return player;
};

export const updatePlayer = async (id, updateData) => {
  await connectDB();
  const player = await Player.findByIdAndUpdate(id, updateData, { new: true });
  return player;
};

export const approvePlayer = async (id) => {
  await connectDB();
  const player = await Player.findByIdAndUpdate(
    id,
    { isApproved: true, isAuctionAvailable: true },
    { new: true }
  );
  return player;
};

export const getAvailablePlayers = async () => {
  await connectDB();
  const players = await Player.find({
    isApproved: true,
    isAuctionAvailable: true,
    isSold: false,
  });
  return players;
};
