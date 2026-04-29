import { NextResponse } from 'next/server';
import Match from '@/models/Match';
import connectDB from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const body = await req.json();
    const match = await Match.create(body);
    return NextResponse.json({ success: true, data: match }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const matches = await Match.find().populate('team1 team2 winner');
    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
