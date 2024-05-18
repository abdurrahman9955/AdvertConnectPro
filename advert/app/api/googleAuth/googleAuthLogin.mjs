import express from 'express';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import { generateToken } from '../auth/protected-route.mjs';
import configurePassport from '../auth/configurePassport.mjs';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import axios from 'axios';

const prisma = new PrismaClient();

const googleAuthLogin = express.Router();

configurePassport();

googleAuthLogin.use(passport.initialize());
googleAuthLogin.use(passport.session());

googleAuthLogin.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

        if (user) {
          return done(null, user);
        }

        return done(new Error('User not found'));
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

googleAuthLogin.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));

/*googleAuthLogin.get('/google-login', async (req, res) => {
  try {
    const response = await axios.get('https://accounts.google.com/o/oauth2/v2/auth', {
      params: {
        response_type: 'code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/', 
        scope: ['profile', 'email'].join(' '), 
      },
    });

    res.send(response.data);
    console.log('response from Oauth', response.data)
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});*/

googleAuthLogin.get('/', passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
  try {
    const token = await generateToken(req.user.id, 'user');
    const accessToken = await generateToken(req.user.id, 'user');
    const refreshToken = await generateToken(req.user.id, 'user');

    req.session.isAuthenticated = true;

    res.json({ success: true, userId: req.user.id, token, accessToken, refreshToken });
  } catch (error) {
    console.error('Error handling Google authentication callback:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default googleAuthLogin;
