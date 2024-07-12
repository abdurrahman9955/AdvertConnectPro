import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaClient } from '@prisma/client';

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

interface Session {
  user: {
    id: string;
  };
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId:process.env.FACEBOOK_CLIENT_ID!,
      clientSecret:process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret:process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, 
    
  },
  callbacks: {
    async signIn({ account, user, profile}) {
      try {
        if (account?.provider === 'google' || account?.provider === 'facebook') {

          let existingUser = await prisma.user.findFirst({
            where: {
              email: (user?.email || account?.phoneNumber || '') as string,
            },
          });
  
          if (!existingUser) {
          await prisma.user.create({
              data: {
                email: ( user?.email || account?.phoneNumber || '') as string,
                firstName: ( user?.name?.split(' ')[0]) as string,
                lastName: (  user?.name?.split(' ')[1]) as string,
                password: 'mpcKIIpmdYiqrXMYiVC7mPX7et61kbcBzV5N0EcM',
                profile: {
                  create: {
                    photoUrl: user.image ? String(user.image) : 'https://advertconnectpro.s3.amazonaws.com/profile/11/images/0e1fab7c-0c44-4f41-8f4b-e7e578383b12.png',
                  },
                },
              },
            });
          }

          return true;
        }
        return false;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt(params) {
      try {
        const { token, account, user, session } = params;
        if (account?.provider === 'google' || account?.provider === 'facebook') {
          token.accessToken = account?.access_token;
          token.refreshToken = account?.refresh_token;
          token.accessTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
          token.id = user?.id;
          token.image = user?.image;
        }

      } catch (error) {
        console.error('Error in JWT callback:', error);
      }
      console.log('JWT token:', params.token);
      return params.token;
    },  

    async session(params) {
      try {
        const { session,  } = params;
        const { user} = session;
   
        if (user) {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          });
   
          if (existingUser) {
            return {
              ...session,
              user: {
                ...user,
                id: existingUser.id,
              },
            };

          }
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return params.session;
      }
    },
    
  }, 
};

  
