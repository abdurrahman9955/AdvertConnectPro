import NextAuth, { Session } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const prisma = new PrismaClient();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Google client ID or client secret is not defined');
}

if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
  console.error('Facebook client ID or client secret is not defined');
}

if (!process.env.NEXT_AUTH_SECRET) {
  console.error('next auth secret is not defined');
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET!,
  session: {
    jwt: true,
  } as any,

  callbacks: {
    async jwt(params) {
      try {
        const { token, account, user, profile } = params;
        if (account?.provider === 'google' || account?.provider === 'facebook') {
          token.accessToken = account?.access_token;
          token.refreshToken = account?.refresh_token;
          token.id = user?.id;
          token.id = account?.id;
          account.email = account?.email || user?.email || account.phoneNumber;
          account.name = account?.name || user?.name;
          token.image = account?.image || user?.image;
          profile?.image;

          let existingUser = await prisma.user.findUnique({
            where: {
              email: (account?.email || user?.email || account?.phoneNumber || '') as string,
            },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: (account?.email || user?.email || account?.phoneNumber || '') as string,
                firstName: (user?.name ? user?.name.split(' ')[0] : '') as string,
                lastName: (user?.name ? user?.name.split(' ')[1] : '') as string,
                password: 'social-auth',
                profile: {
                  create: {
                    photoUrl: profile?.image ? String(profile.image) : '',
                  },
                },
              },
            });
          }

          if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account?.refresh_token;
            token.id = user?.id;
          }
        }
      } catch (error) {
        console.error('Error in JWT callback:', error);
      }
      console.log('JWT token:', params.token); 
      return params.token;
    },

    async session(params) {
      try {
        const { session, user, token } = params;

        return {
          ...session,
          user: {
            ...session.user,
            id: user?.id,
            email: user?.email,
            firstName: user?.name,
            accessToken: token?.accessToken,
            freshToken: token?.refreshToken,
          },
          profile: {
            ...session.user,
            userId: user?.id,
            photoUrl: user?.image,
          },
        };
      } catch (error) {
        console.error('Error in session callback:', error);
        return params.session;
      }
    },
  },
});
