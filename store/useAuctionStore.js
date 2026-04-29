import { create } from 'zustand';

const useAuctionStore = create((set) => ({
  auction: null,
  currentPlayer: null,
  currentBid: 0,
  currentBidder: null,
  timerRemaining: 60,
  isActive: false,
  
  setAuction: (auction) => set({ auction }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setCurrentBid: (bid) => set({ currentBid: bid }),
  setCurrentBidder: (bidder) => set({ currentBidder: bidder }),
  setTimerRemaining: (time) => set({ timerRemaining: time }),
  setIsActive: (active) => set({ isActive: active }),
  
  updateAuction: (data) => set((state) => ({
    ...state,
    ...data,
  })),
  
  resetAuction: () => set({
    auction: null,
    currentPlayer: null,
    currentBid: 0,
    currentBidder: null,
    timerRemaining: 60,
    isActive: false,
  }),
}));

export default useAuctionStore;
