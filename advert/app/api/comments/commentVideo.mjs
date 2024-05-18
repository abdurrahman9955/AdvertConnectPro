import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const commentVideo = express.Router();

commentVideo.get('/video/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const comments = await prisma.commentVideos.findMany({
      where: {
        productId,
      },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    res.json(comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ error: 'An error occurred while retrieving comments' });
  }
});

commentVideo.post('/video', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = parseInt(req.headers['user-id']);
    const productId = parseInt(req.headers['product-id']);

    if (isNaN(userId)) {
      throw new Error('Invalid userId');
    }

    if (isNaN(productId)) {
      throw new Error('Invalid productId! and user must provide a valid productId');
    }

    const newComment = await prisma.commentVideos.create({
      data: {
        userId,
        content,
        productId: productId,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'An error occurred while adding comment' });
  }
});

export default commentVideo;
