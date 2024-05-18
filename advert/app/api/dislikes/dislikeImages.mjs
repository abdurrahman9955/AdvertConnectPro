import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dislikeImages = express.Router();

dislikeImages.post('/images/:productId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const productId = req.params.productId; 

    const existingDislike = await prisma.dislike.findFirst({
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
        mediaType: 'PHOTO', 
      },
    });

    res.json(newDislike);
  } catch (error) {
    console.error('Error disliking product:', error);
    res.status(500).json({ error: 'An error occurred while disliking the product' });
  }
});

dislikeImages.get('/images/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
     
      const dislikeCount = await prisma.dislike.count({
        where: {
          productId: parseInt(productId),
          mediaType: 'PHOTO',
        },
      });
  
      res.json({ dislikeCount });
    } catch (error) {
      console.error('Error getting like count:', error);
      res.status(500).json({ error: 'An error occurred while getting like count' });
    }
  });

export default dislikeImages;

