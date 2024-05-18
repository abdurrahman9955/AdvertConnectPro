import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AdminMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const isAdmin = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. User is not an admin.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

