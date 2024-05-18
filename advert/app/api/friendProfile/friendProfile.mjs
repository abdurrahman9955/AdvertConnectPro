import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const friendProfile = express.Router();

friendProfile.post('/friend/create', async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: parseInt(userId), friendId: parseInt(friendId) },
          { userId: parseInt(friendId), friendId: parseInt(userId) },
        ],
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'Friendship already exists' });
    }

    const newFriendship = await prisma.friendship.create({
      data: {
        userId: parseInt(userId),
        friendId: parseInt(friendId),
        status: 'PENDING', 
      },
    });

    res.json(newFriendship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friendProfile.get('/friend/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const userFriendships = await prisma.friendship.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        Friend: true, 
      },
    });

    res.json(userFriendships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friendProfile.put('/:friendshipId/update-status', async (req, res) => {
  try {
    const { friendshipId } = req.params;
    const { newStatus } = req.body;

    const existingFriendship = await prisma.friendship.findUnique({
      where: {
        id: parseInt(friendshipId),
      },
    });

    if (!existingFriendship) {
      return res.status(404).json({ error: 'Friendship not found' });
    }

    const updatedFriendship = await prisma.friendship.update({
      where: {
        id: parseInt(friendshipId),
      },
      data: {
        status: newStatus,
      },
    });

    res.json(updatedFriendship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friendProfile.put('/:friendshipId/block', async (req, res) => {
  try {
    const { friendshipId } = req.params;
    const { isBlocked } = req.body;

    const existingFriendship = await prisma.friendship.findUnique({
      where: {
        id: parseInt(friendshipId),
      },
    });

    if (!existingFriendship) {
      return res.status(404).json({ error: 'Friendship not found' });
    }

    const updatedFriendship = await prisma.friendship.update({
      where: {
        id: parseInt(friendshipId),
      },
      data: {
        isBlocked: isBlocked,
      },
    });

    res.json(updatedFriendship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default friendProfile;
