import { NextResponse } from 'next/server';
import { createAuction, getActiveAuction } from '@/services/auctionService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const { name } = await req.json();
    const auction = await createAuction(name);
    return NextResponse.json({ success: true, data: auction }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const auction = await getActiveAuction();
    return NextResponse.json({ success: true, data: auction });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
