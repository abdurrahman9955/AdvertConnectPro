import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const checkUserId = express.Router(); 

checkUserId.use(express.json());

checkUserId.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default checkUserId;

