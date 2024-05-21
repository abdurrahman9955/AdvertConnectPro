import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const commentBanner = express.Router();

commentBanner.get('/banner/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const comments = await prisma.commentBanner.findMany({
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

commentBanner.post('/banner', async (req, res) => {
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

    const newComment = await prisma.commentBanner.create({
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

export default commentBanner;
