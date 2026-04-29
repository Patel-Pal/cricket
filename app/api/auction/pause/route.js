import { NextResponse } from 'next/server';
import { pauseAuction } from '@/services/auctionService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const { auctionId } = await req.json();
    const auction = await pauseAuction(auctionId);
    return NextResponse.json({ success: true, data: auction });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
