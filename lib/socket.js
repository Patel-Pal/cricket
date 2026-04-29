import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-auction', (auctionId) => {
      socket.join(`auction-${auctionId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const emitAuctionUpdate = (auctionId, data) => {
  if (io) {
    io.to(`auction-${auctionId}`).emit('auction-update', data);
  }
};

export const emitBidUpdate = (auctionId, bidData) => {
  if (io) {
    io.to(`auction-${auctionId}`).emit('bid-update', bidData);
  }
};

export const emitTimerUpdate = (auctionId, timeRemaining) => {
  if (io) {
    io.to(`auction-${auctionId}`).emit('timer-update', timeRemaining);
  }
};
