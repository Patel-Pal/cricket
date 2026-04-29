import { NextResponse } from 'next/server';
import { getTeamById } from '@/services/teamService';

export async function GET(req, { params }) {
  try {
    const team = await getTeamById(params.id);
    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
