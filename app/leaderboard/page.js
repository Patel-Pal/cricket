'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Rank</th>
                  <th className="text-left py-3">Team</th>
                  <th className="text-right py-3">Points</th>
                  <th className="text-right py-3">Matches</th>
                  <th className="text-right py-3">Won</th>
                  <th className="text-right py-3">Lost</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-bold">{entry.rank}</td>
                    <td className="py-3">{entry.teamId?.teamName}</td>
                    <td className="py-3 text-right font-semibold">{entry.totalPoints}</td>
                    <td className="py-3 text-right">{entry.matchesPlayed}</td>
                    <td className="py-3 text-right text-green-600">{entry.matchesWon}</td>
                    <td className="py-3 text-right text-red-600">{entry.matchesLost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
