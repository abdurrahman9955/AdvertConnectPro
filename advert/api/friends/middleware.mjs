import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findOne({
      where: { id: decoded.userId },
      include: { Profile: true },
    });

    if (user.isBlocked) {
      return res.status(403).json({ error: 'Forbidden - User is blocked' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default authenticateUser;
