import { NextResponse } from 'next/server';
import { getPlayerById, updatePlayer } from '@/services/playerService';

export async function GET(req, { params }) {
  try {
    const player = await getPlayerById(params.id);
    if (!player) {
      return NextResponse.json({ success: false, error: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const player = await updatePlayer(params.id, body);
    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
