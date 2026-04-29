'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Cricket Auction
        </Link>
        <div className="flex items-center gap-4">
          {session && (
            <>
              <span className="text-gray-700">{session.user.name}</span>
              <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">
                {session.user.role}
              </span>
              <button onClick={() => signOut()} className="btn-secondary">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
