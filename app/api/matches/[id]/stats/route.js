import { NextResponse } from 'next/server';
import { updatePlayerStats, updateTeamPoints, updateLeaderboard } from '@/services/pointsService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const { playerId, stats } = await req.json();
    const playerStats = await updatePlayerStats(playerId, params.id, stats);
    
    const player = await Player.findById(playerId);
    if (player.teamId) {
      await updateTeamPoints(player.teamId);
      await updateLeaderboard();
    }
    
    return NextResponse.json({ success: true, data: playerStats });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
