import { NextResponse } from 'next/server';
import { placeBid } from '@/services/auctionService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { bidSchema } from '@/lib/validations/player';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'owner') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = bidSchema.parse(body);
    
    const { auctionId, bidAmount, playerId } = validatedData;
    const bid = await placeBid(auctionId, validatedData.teamId, playerId, bidAmount);
    
    return NextResponse.json({ success: true, data: bid });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
