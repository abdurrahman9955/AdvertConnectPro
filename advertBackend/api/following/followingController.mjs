import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFollowingCount = async (req, res) => {
  try {
    const followerId = parseInt(req.headers['profile-id']);

    if (!followerId) {
      return res.status(400).json({ success: false, error: 'User ID is missing in request params' });
    }

    const following = await prisma.following.findMany({
      where: { followerId },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!following || following.length === 0) {
      return res.status(404).json({ success: false, error: 'User is not following anyone' });
    }


    res.json({ success: true, followingCount: following.length, following });
  } catch (error) {
    console.error('Error getting following:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getFollowerCount = async (req, res) => {
  try {
    const followingId = parseInt(req.headers['profile-id']);

    if (!followingId) {
      return res.status(400).json({ success: false, error: 'User ID is missing in request params' });
    }

    const followers = await prisma.following.findMany({
      where: { followingId },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!followers || followers.length === 0) {
      return res.status(404).json({ success: false, error: 'No followers found' });
    }

    res.json({ success: true, followerCount: followers.length, followers});
  } catch (error) {
    console.error('Error getting followers:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const followUser = async (req, res) => {
  try {
    const followerId = parseInt(req.headers['user-id']);
    const followingId = parseInt(req.headers['profile-id']);

    if (!followerId || !followingId) {
      return res.status(400).json({ success: false, error: 'Follower ID or Following ID is missing' });
    }

    const followingExists = await prisma.following.findFirst({
      where: { followerId, followingId },
    });
    if (followingExists) {
      return res.status(200).json({ success: false, message: 'Already following this user' });
    }

    await prisma.following.create({
      data: { followerId, followingId },
    });

    res.json({ success: true, message: 'Followed successfully' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const followerId = parseInt(req.headers['user-id']);
    const followingId = parseInt(req.headers['profile-id']);

    if (!followerId || !followingId) {
      return res.status(400).json({ success: false, error: 'Follower ID or Following ID is missing' });
    }

    const followingExists = await prisma.following.findFirst({
      where: { followerId, followingId },
    });
    if (!followingExists) {
      return res.status(200).json({ success: false, message: 'Not following this user' });
    }

    await prisma.following.deleteMany({
      where: { followerId, followingId },
    });

    res.json({ success: true, message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
