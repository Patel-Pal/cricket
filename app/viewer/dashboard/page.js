'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function ViewerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchAuction();
  }, []);

  const fetchAuction = async () => {
    try {
      const res = await fetch('/api/auction');
      const data = await res.json();
      setAuction(data.data);
    } catch (error) {
      console.error('Failed to fetch auction');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Viewer Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/auction/live" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Live Auction</h3>
            <p className="text-gray-600">Watch the auction live</p>
            {auction?.status === 'active' && (
              <span className="inline-block mt-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Live Now
              </span>
            )}
          </Link>
          <Link href="/leaderboard" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
            <p className="text-gray-600">View team rankings and points</p>
          </Link>
          <Link href="/players" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Players</h3>
            <p className="text-gray-600">Browse all players</p>
          </Link>
          <Link href="/teams" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Teams</h3>
            <p className="text-gray-600">View all teams</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
