import passport from 'passport';
import { generateAccessToken, generateRefreshToken } from './configurePassport.mjs';

export const generateAccessTokenMiddleware = () => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.locals.user = user;
    res.locals.accessToken = accessToken;
    res.locals.refreshToken = refreshToken;

    next();
  })(req, res, next);
};

export const generateRefreshTokenMiddleware = () => (req, res, next) => {
  const refreshToken = generateRefreshToken(res.locals.user);
  res.json({ accessToken: res.locals.accessToken, refreshToken });
};



