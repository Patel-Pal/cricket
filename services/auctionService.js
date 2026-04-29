import Auction from '@/models/Auction';
import Player from '@/models/Player';
import Bid from '@/models/Bid';
import Transaction from '@/models/Transaction';
import connectDB from '@/lib/mongodb';

export const createAuction = async (name) => {
  await connectDB();
  const auction = await Auction.create({ name });
  return auction;
};

export const getActiveAuction = async () => {
  await connectDB();
  const auction = await Auction.findOne({ status: { $in: ['active', 'paused'] } })
    .populate('currentPlayerId currentBidder');
  return auction;
};

export const startAuction = async (auctionId) => {
  await connectDB();
  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    { status: 'active', startTime: new Date() },
    { new: true }
  );
  return auction;
};

export const pauseAuction = async (auctionId) => {
  await connectDB();
  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    { status: 'paused' },
    { new: true }
  );
  return auction;
};

export const endAuction = async (auctionId) => {
  await connectDB();
  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    { status: 'completed', endTime: new Date() },
    { new: true }
  );
  return auction;
};

export const selectNextPlayer = async (auctionId, playerId) => {
  await connectDB();
  const player = await Player.findById(playerId);
  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    {
      currentPlayerId: playerId,
      currentBid: player.basePrice,
      currentBidder: null,
      timerRemaining: 60,
    },
    { new: true }
  ).populate('currentPlayerId');
  return auction;
};

export const placeBid = async (auctionId, teamId, playerId, bidAmount) => {
  await connectDB();
  
  const bid = await Bid.create({
    bidAmount,
    teamId,
    playerId,
    auctionId,
  });
  
  await Auction.findByIdAndUpdate(auctionId, {
    currentBid: bidAmount,
    currentBidder: teamId,
    timerRemaining: 60,
  });
  
  return bid;
};

export const finalizePlayerSale = async (auctionId) => {
  await connectDB();
  const auction = await Auction.findById(auctionId);
  
  if (auction.currentBidder) {
    await Player.findByIdAndUpdate(auction.currentPlayerId, {
      isSold: true,
      soldPrice: auction.currentBid,
      teamId: auction.currentBidder,
      isAuctionAvailable: false,
    });
    
    await Transaction.create({
      teamId: auction.currentBidder,
      playerId: auction.currentPlayerId,
      amount: auction.currentBid,
      type: 'purchase',
      auctionId,
    });
  }
  
  return auction;
};

export const resetAuction = async (auctionId) => {
  await connectDB();
  await Player.updateMany({}, {
    isSold: false,
    soldPrice: 0,
    teamId: null,
  });
  
  await Auction.findByIdAndUpdate(auctionId, {
    status: 'pending',
    currentPlayerId: null,
    currentBid: 0,
    currentBidder: null,
  });
};
