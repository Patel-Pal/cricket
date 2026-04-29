'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AuctionDisplayPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [playerNumber, setPlayerNumber] = useState('');
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const fetchAllPlayers = async () => {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      if (data.success) {
        // Filter players with player numbers and sort them
        const playersWithNumbers = data.data
          .filter(p => p.playerNumber)
          .sort((a, b) => {
            const numA = parseInt(a.playerNumber.replace(/\D/g, ''));
            const numB = parseInt(b.playerNumber.replace(/\D/g, ''));
            return numA - numB;
          });
        setAllPlayers(playersWithNumbers);
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  const fetchPlayerByNumber = async (number = playerNumber) => {
    if (!number || !number.toString().trim()) {
      toast.error('Please enter a player number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/players?playerNumber=${number}`);
      const data = await res.json();
      
      if (data.success && data.data.length > 0) {
        setPlayer(data.data[0]);
        setPlayerNumber(number);
        toast.success('Player loaded!');
        
        // Fetch all players if not already loaded
        if (allPlayers.length === 0) {
          fetchAllPlayers();
        }
      } else {
        toast.error('Player not found');
        setPlayer(null);
      }
    } catch (error) {
      toast.error('Failed to fetch player');
    } finally {
      setLoading(false);
    }
  };

  const navigatePlayer = (direction) => {
    if (!player || allPlayers.length === 0) return;

    const currentIndex = allPlayers.findIndex(p => p._id === player._id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allPlayers.length - 1;
    } else {
      newIndex = currentIndex < allPlayers.length - 1 ? currentIndex + 1 : 0;
    }

    const nextPlayer = allPlayers[newIndex];
    fetchPlayerByNumber(nextPlayer.playerNumber);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!session || session.user.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-500 via-red-500 to-purple-600 relative overflow-hidden">
      {/* Colorful Smoke/Splash Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 left-40 w-80 h-80 bg-red-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400 rounded-full filter blur-3xl"></div>
      </div>

      {/* Search Box - Top Right */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        <button
          onClick={toggleFullscreen}
          className="bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-white font-bold px-4 py-2 rounded-lg transition-colors border border-white border-opacity-30"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
        <input
          type="text"
          placeholder="Player Number"
          className="bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-200 px-4 py-2 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
          value={playerNumber}
          onChange={(e) => setPlayerNumber(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchPlayerByNumber()}
        />
        <button
          onClick={() => fetchPlayerByNumber()}
          disabled={loading}
          className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          {loading ? 'Loading...' : 'Load'}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header Logo */}
        <div className="text-center py-4">
          <div className="inline-block bg-white px-16 py-3 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600">
              TALUKA PREMIER LEAGUE
            </h1>
            <p className="text-xs text-gray-600 font-semibold mt-1">SEASON 3 • PLAYERS AUCTION 2026</p>
          </div>
        </div>

        {/* Player Display */}
        {player ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
            {/* Navigation Arrows - Fixed Position */}
            <button
              onClick={() => navigatePlayer('prev')}
              className="fixed left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-white p-4 rounded-full transition-all hover:scale-110 border border-white border-opacity-30 z-50"
              title="Previous Player"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => navigatePlayer('next')}
              className="fixed right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-white p-4 rounded-full transition-all hover:scale-110 border border-white border-opacity-30 z-50"
              title="Next Player"
            >
              <ChevronRight size={32} />
            </button>

            {/* Player Card */}
            <div className="w-full max-w-7xl bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center p-8 gap-10">
                {/* Left Side - Player Image */}
                <div className="flex-shrink-0">
                  <div className="w-[450px] h-[450px] bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl relative">
                    {player.photo?.url ? (
                      <img
                        src={player.photo.url}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-xl">
                        No Photo
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Player Stats */}
                <div className="flex-1">
                  <h2 className="text-white text-6xl font-black mb-3 uppercase tracking-tight">
                    {player.name}
                  </h2>
                  <p className="text-yellow-400 text-2xl font-bold mb-6">PLAYER STATS</p>
                  
                  <div className="border-t border-gray-600 pt-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="text-center">
                        <p className="text-gray-400 text-xl font-semibold mb-2">LOCATION</p>
                        <p className="text-yellow-400 text-3xl font-black">{player.address || 'N/A'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xl font-semibold mb-2">PHONE NO</p>
                        <p className="text-yellow-400 text-3xl font-black">{player.mobile || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full text-lg font-bold capitalize">
                      {player.battingStyle.replace('-', ' ')}
                    </span>
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold capitalize">
                      {player.category}
                    </span>
                    <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold capitalize">
                      {player.bowlingStyle.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white bg-black bg-opacity-30 backdrop-blur-md p-12 rounded-3xl">
              <Search size={64} className="mx-auto mb-4 opacity-70" />
              <p className="text-3xl font-bold">Enter a player number to display</p>
              <p className="text-gray-200 mt-2 text-lg">Use the search box in the top right corner</p>
            </div>
          </div>
        )}

        {/* Footer Branding */}
        <div className="text-center pb-3 pt-2">
          <p className="text-white text-xl font-black tracking-wider bg-black bg-opacity-30 backdrop-blur-md inline-block px-6 py-2 rounded-full">
            SHREE JAY AMBE CRICKET GROUP
          </p>
        </div>
      </div>
    </div>
  );
}
