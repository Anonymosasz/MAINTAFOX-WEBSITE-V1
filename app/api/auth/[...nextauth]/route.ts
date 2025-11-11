import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Ensure NextAuth runs on the Node.js runtime (Prisma is not supported on Edge)
export const runtime = 'nodejs';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
