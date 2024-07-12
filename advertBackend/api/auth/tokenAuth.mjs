
import passport from 'passport';
import { generateAccessTokenMiddleware, generateRefreshTokenMiddleware } from './authMiddleware.mjs';

export const TokenRoute = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;

    const accessToken = generateAccessTokenMiddleware(user);
    const refreshToken = generateRefreshTokenMiddleware(user);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return next();
  })(req, res, next);
};


