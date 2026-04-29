'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/hooks/useSocket';
import useAuctionStore from '@/store/useAuctionStore';
import Navbar from '@/components/Navbar';
import AuctionTimer from '@/components/AuctionTimer';
import toast from 'react-hot-toast';

export default function LiveAuctionPage() {
  const { data: session } = useSession();
  const { socket, isConnected } = useSocket();
  const { currentPlayer, currentBid, timerRemaining, updateAuction } = useAuctionStore();
  const [bidAmount, setBidAmount] = useState(0);
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    fetchAuction();
  }, []);

  useEffect(() => {
    if (socket && auction) {
      socket.emit('join-auction', auction._id);

      socket.on('auction-update', (data) => {
        updateAuction(data);
      });

      socket.on('bid-update', (data) => {
        updateAuction({
          currentBid: data.bidAmount,
          currentBidder: data.teamId,
        });
        toast.success(`New bid: ₹${data.bidAmount.toLocaleString()}`);
      });

      socket.on('timer-update', (time) => {
        updateAuction({ timerRemaining: time });
      });
    }

    return () => {
      if (socket) {
        socket.off('auction-update');
        socket.off('bid-update');
        socket.off('timer-update');
      }
    };
  }, [socket, auction]);

  const fetchAuction = async () => {
    try {
      const res = await fetch('/api/auction');
      const data = await res.json();
      if (data.success && data.data) {
        setAuction(data.data);
        updateAuction({
          currentPlayer: data.data.currentPlayerId,
          currentBid: data.data.currentBid,
          timerRemaining: data.data.timerRemaining,
        });
        setBidAmount(data.data.currentBid + 100000);
      }
    } catch (error) {
      toast.error('Failed to fetch auction');
    }
  };

  const handleBid = async () => {
    if (!session?.user?.teamId) {
      toast.error('You need a team to bid');
      return;
    }

    try {
      const res = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auctionId: auction._id,
          teamId: session.user.teamId,
          playerId: currentPlayer._id,
          bidAmount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Bid placed');
        setBidAmount(bidAmount + 100000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Failed to place bid');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Live Auction</h1>

        {!isConnected && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            Connecting to auction...
          </div>
        )}

        {currentPlayer ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card">
              <h2 className="text-2xl font-bold mb-4">{currentPlayer.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Category</p>
                  <p className="font-semibold">{currentPlayer.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Base Price</p>
                  <p className="font-semibold">₹{currentPlayer.basePrice?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Experience</p>
                  <p className="font-semibold">{currentPlayer.experience} years</p>
                </div>
                <div>
                  <p className="text-gray-600">Matches</p>
                  <p className="font-semibold">{currentPlayer.matchesPlayed}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Current Bid</p>
                <p className="text-4xl font-bold text-blue-600">₹{currentBid.toLocaleString()}</p>
              </div>

              {session?.user?.role === 'owner' && (
                <div className="space-y-4">
                  <input
                    type="number"
                    className="input"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    step={100000}
                  />
                  <button onClick={handleBid} className="btn-primary w-full">
                    Place Bid
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <AuctionTimer initialTime={timerRemaining} />
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-xl text-gray-600">No player selected for auction</p>
          </div>
        )}
      </div>
    </div>
  );
}
