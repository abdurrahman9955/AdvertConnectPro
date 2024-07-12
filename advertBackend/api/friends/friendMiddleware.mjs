import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkFriendship = async (req, res, next) => {
  try {
    const { friendId } = req.params;


    const friendship = await prisma.friendRequest.findFirst({
      where: {
        AND: [
          { status: 'ACCEPTED' },
          {
            OR: [
              { senderId, receiverId: friendId },
              { senderId: friendId, receiverId },
            ],
          },
        ],
      },
    });

    if (!friendship) {
      return res.status(403).json({ error: 'Forbidden - Friendship not established' });
    }

    next();
  } catch (error) {
    console.error('Error checking friendship:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
