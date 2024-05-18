import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getCurrentUser = express.Router();

getCurrentUser.get('/userInfo', async (req, res) => {
  try {

    const userId = req.headers['user-id']; 

    const currentUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        firstName: true,
        lastName: true,
        profile: {
          select: {
            photoUrl: true,
          },
        },
      },
    });

    if (!currentUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, currentUser });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


getCurrentUser.delete('/deleteAccount', async (req, res) => {
  try {
    const userId = req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.profile.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.like.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.comment.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.commentBanner.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.commentVideos.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.dislike.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.dislikeBanner.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.dislikeVideos.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.download.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.employee.delete({
        where: { userId: parseInt(userId) },
      });
      await prisma.favorite.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.favoriteBanner.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.favoriteVideos.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.follower.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.following.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.friendRequest.deleteMany({
        where: {
          OR: [
            { senderId: parseInt(userId) },
            { receiverId: parseInt(userId) },
          ],
        },
      });
      await prisma.friendship.deleteMany({
        where: {
          OR: [
            { userId: parseInt(userId) },
            { friendId: parseInt(userId) },
          ],
        },
      });
     
      await prisma.notifications.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.productImages.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.productBanners.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.productVideos.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.productOrders.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.bannerOrders.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.videosOrders.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.ratings.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.ratingBanners.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.ratingVideos.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.settings.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.shares.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.videoCalls.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.voiceCalls.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.accounts.deleteMany({
        where: { userId: parseInt(userId) },
      });
      await prisma.sessions.deleteMany({
        where: { userId: parseInt(userId) },
      });

      await prisma.user.delete({
        where: { id: parseInt(userId) },
      });
    });

    res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



export default getCurrentUser;


