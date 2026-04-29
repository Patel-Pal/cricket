import { NextResponse } from 'next/server';
import { createPlayer, getAllPlayers } from '@/services/playerService';
import { playerSchema } from '@/lib/validations/player';

export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = playerSchema.parse(body);
    const player = await createPlayer(validatedData);
    return NextResponse.json({ success: true, data: player }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {};
    
    if (searchParams.get('isApproved')) {
      filters.isApproved = searchParams.get('isApproved') === 'true';
    }
    if (searchParams.get('isSold')) {
      filters.isSold = searchParams.get('isSold') === 'true';
    }
    if (searchParams.get('playerNumber')) {
      filters.playerNumber = searchParams.get('playerNumber');
    }
    
    const players = await getAllPlayers(filters);
    return NextResponse.json({ success: true, data: players });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
