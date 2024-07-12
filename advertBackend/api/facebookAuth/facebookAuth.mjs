import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const facebookPassport = passport;

facebookPassport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { facebookId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              facebookId: profile.id,
              email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
              firstName: profile.displayName,
              profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  )
);

facebookPassport.serializeUser((user, done) => {
  done(null, user.id);
});

facebookPassport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default facebookPassport;

