'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPlayers: 0,
    approvedPlayers: 0,
    totalTeams: 0,
    activeAuction: null,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [playersRes, teamsRes, auctionRes] = await Promise.all([
        fetch('/api/players'),
        fetch('/api/teams'),
        fetch('/api/auction'),
      ]);

      const players = await playersRes.json();
      const teams = await teamsRes.json();
      const auction = await auctionRes.json();

      setStats({
        totalPlayers: players.data?.length || 0,
        approvedPlayers: players.data?.filter(p => p.isApproved).length || 0,
        totalTeams: teams.data?.length || 0,
        activeAuction: auction.data,
      });
    } catch (error) {
      toast.error('Failed to fetch stats');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-blue-500 text-white">
            <h3 className="text-lg font-semibold">Total Players</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalPlayers}</p>
          </div>
          <div className="card bg-green-500 text-white">
            <h3 className="text-lg font-semibold">Approved Players</h3>
            <p className="text-4xl font-bold mt-2">{stats.approvedPlayers}</p>
          </div>
          <div className="card bg-purple-500 text-white">
            <h3 className="text-lg font-semibold">Total Teams</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalTeams}</p>
          </div>
          <div className="card bg-orange-500 text-white">
            <h3 className="text-lg font-semibold">Auction Status</h3>
            <p className="text-2xl font-bold mt-2">
              {stats.activeAuction?.status || 'No Active'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/players" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Manage Players</h3>
            <p className="text-gray-600">Approve and manage player registrations</p>
          </Link>
          <Link href="/admin/teams" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Manage Teams</h3>
            <p className="text-gray-600">Create and manage teams</p>
          </Link>
          <Link href="/admin/matches" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Match Results</h3>
            <p className="text-gray-600">Enter match results and stats</p>
          </Link>
          <Link href="/leaderboard" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
            <p className="text-gray-600">View team rankings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
