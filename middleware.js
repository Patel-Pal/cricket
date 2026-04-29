export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin/:path*',
    '/owner/:path*',
    '/viewer/:path*',
  ],
};
