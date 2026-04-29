import { NextResponse } from 'next/server';
import Player from '@/models/Player';
import connectDB from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const player = await Player.findById(params.id);
    
    if (!player) {
      return NextResponse.json({ success: false, error: 'Player not found' }, { status: 404 });
    }
    
    // Delete images from Cloudinary
    if (player.photo?.publicId) {
      await deleteFromCloudinary(player.photo.publicId);
    }
    if (player.identityProof?.publicId) {
      await deleteFromCloudinary(player.identityProof.publicId);
    }
    
    await Player.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true, message: 'Player deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
