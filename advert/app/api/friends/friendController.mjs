import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.params;

    await prisma.friendRequest.updateMany({
      where: {
        AND: [
          { senderId: friendId, receiverId },
          { status: 'PENDING' },
        ],
      },
      data: { status: 'ACCEPTED' },
    });

    res.json({ success: true, message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.params;

    await prisma.friendRequest.updateMany({
      where: {
        AND: [
          { senderId: friendId, receiverId },
          { status: 'PENDING' },
        ],
      },
      data: { status: 'REJECTED' },
    });

    res.json({ success: true, message: 'Friend request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

