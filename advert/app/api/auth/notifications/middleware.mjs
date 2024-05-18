import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findOne({
      where: { id: decoded.userId },
      include: { Profile: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ error: 'Forbidden - User is blocked' });
    }
    req.user = user;

    if (!checkRoles(user.role, ['user'])) {
      return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

const checkRoles = (userRole, allowedRoles) => {
  return allowedRoles.some(role => userRole === role);
};

export default authenticateUser;
