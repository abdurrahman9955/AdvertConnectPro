import express from 'express';
import passport from 'passport';
import session from 'express-session';
import FacebookStrategy from 'passport-facebook';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../auth/protected-route.mjs';
import configurePassport from '../auth/configurePassport.mjs';
import axios from 'axios';

const prisma = new PrismaClient();
const facebookAuthLogin = express.Router();

const facebookAppId = process.env.FACEBOOK_CLIENT_ID;
const facebookAppSecret = process.env.FACEBOOK_CLIENT_SECRET;

configurePassport();

facebookAuthLogin.use(passport.initialize());
facebookAuthLogin.use(passport.session());

facebookAuthLogin.use(
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
  new FacebookStrategy(
    {
      clientID: facebookAppId,
      clientSecret: facebookAppSecret,
      callbackURL: 'http://localhost:3000/', 
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, name } = profile;
        const email = emails ? emails[0].value : null;

        let user = await prisma.user.findUnique({ where: { facebookId: id } });

        if (!user) {
          done(null, false, { message: 'User not found' });
        } else {
          done(null, user);
        }
      } catch (error) {
        console.error('Error logging in with Facebook:', error);
        done(error);
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


facebookAuthLogin.get('/facebook-login', passport.authenticate('facebook', { scope: ['email'] }));

/*facebookAuthLogin.get('/facebook-register', async (req, res) => {
  try {
    const response = await axios.get('https://www.facebook.com/v3.2/dialog/oauth', {
      params: {
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/',
        scope: 'email',
        client_id: facebookAppId,
      },
    });
    res.redirect(response.request.res.responseUrl);
    console.log('response from Facebook', response.data)
  } catch (error) {
    console.error('Error redirecting to Facebook login page:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});*/

facebookAuthLogin.get( '/', passport.authenticate('facebook', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      if (req.user) {
        const token = await generateToken(req.user.id, 'user');
        const accessToken = await generateToken(req.user.id, 'user');
        const refreshToken = await generateToken(req.user.id, 'user');

        req.session.isAuthenticated = true;

        res.json({
          success: true,
          userId: req.user.id,
          token,
          accessToken,
          refreshToken,
        });
      } else {
        res.status(401).json({ success: false, error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error handling Facebook callback:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
);

export default facebookAuthLogin;
