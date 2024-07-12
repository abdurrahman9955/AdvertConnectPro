import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dislikeBanners = express.Router();

dislikeBanners.post('/banner/:productId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const productId = req.params.productId; 

    const existingDislike = await prisma.dislikeBanners.findFirst({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });

    if (existingDislike) {
        await prisma.like.delete({
          where: {
            id: existingDislike.id,
          },
        });
    
        return res.status(200).json({ success: true, message: 'Like removed successfully' });
      }

    const newDislike = await prisma.dislike.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        mediaType: 'BANNER', 
      },
    });

    res.json(newDislike);
  } catch (error) {
    console.error('Error disliking product:', error);
    res.status(500).json({ error: 'An error occurred while disliking the product' });
  }
});

dislikeBanners.get('/banner/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
     
      const dislikeCount = await prisma.dislikeBanners.count({
        where: {
          productId: parseInt(productId),
          mediaType: 'BANNER',
        },
      });
  
      res.json({ dislikeCount });
    } catch (error) {
      console.error('Error getting like count:', error);
      res.status(500).json({ error: 'An error occurred while getting like count' });
    }
  });

export default dislikeBanners;

