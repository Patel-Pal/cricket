'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'owner') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.teamId) {
      fetchTeam();
    }
  }, [session]);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`/api/teams/${session.user.teamId}`);
      const data = await res.json();
      if (data.success) {
        setTeam(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch team');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Team Owner Dashboard</h1>
        
        {team && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-blue-500 text-white">
              <h3 className="text-lg font-semibold">Remaining Budget</h3>
              <p className="text-4xl font-bold mt-2">₹{team.remainingBudget.toLocaleString()}</p>
            </div>
            <div className="card bg-green-500 text-white">
              <h3 className="text-lg font-semibold">Players</h3>
              <p className="text-4xl font-bold mt-2">{team.purchasedPlayers.length}/{team.maxPlayers}</p>
            </div>
            <div className="card bg-purple-500 text-white">
              <h3 className="text-lg font-semibold">Total Points</h3>
              <p className="text-4xl font-bold mt-2">{team.totalPoints}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/auction/live" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Live Auction</h3>
            <p className="text-gray-600">Participate in live bidding</p>
          </Link>
          <Link href="/owner/team" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">My Team</h3>
            <p className="text-gray-600">View your purchased players</p>
          </Link>
          <Link href="/leaderboard" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
            <p className="text-gray-600">View rankings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
