import { NextResponse } from 'next/server';
import { createTeam, getAllTeams } from '@/services/teamService';
import { teamSchema } from '@/lib/validations/player';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = teamSchema.parse(body);
    const team = await createTeam(validatedData);
    return NextResponse.json({ success: true, data: team }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const teams = await getAllTeams();
    return NextResponse.json({ success: true, data: teams });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
