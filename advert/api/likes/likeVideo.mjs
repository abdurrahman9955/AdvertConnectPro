import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const likeVideo = express.Router();

likeVideo.post('/video/:productId', async (req, res) => {
    try {
      const userId = req.headers['user-id'];
      const productId = req.params.productId; 
 
      const existingLike = await prisma.likeVideos.findFirst({
        where: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      });
  
      if (existingLike) {
        await prisma.likeVideos.delete({
          where: {
            id: existingLike.id,
          },
        });
    
        return res.status(200).json({ success: true, message: 'Like removed successfully' });
      }

      const newLike = await prisma.likeVideos.create({
        data: {
          userId: parseInt(userId),
          productId: parseInt(productId),
          mediaType: 'VIDEO',
        },
      });
  
      res.json(newLike);
    } catch (error) {
      console.error('Error liking product:', error);
      res.status(500).json({ error: 'An error occurred while liking the product' });
    }
  });

  likeVideo.get('/video/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
     
      const likeCount = await prisma.likeVideos.count({
        where: {
          productId: parseInt(productId),
          mediaType: 'VIDEO',
        },
      });
  
      res.json({ likeCount });
    } catch (error) {
      console.error('Error getting like count:', error);
      res.status(500).json({ error: 'An error occurred while getting like count' });
    }
  });
  
export default likeVideo;
