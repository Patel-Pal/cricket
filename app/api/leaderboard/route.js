import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/services/pointsService';

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
