import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/players/register');
  }
  
  if (session.user.role === 'admin') {
    redirect('/admin/dashboard');
  } else if (session.user.role === 'owner') {
    redirect('/owner/dashboard');
  } else {
    redirect('/viewer/dashboard');
  }
}
