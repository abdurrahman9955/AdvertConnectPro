import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rateVideo = express.Router();

rateVideo.post('/video/:productId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const productId = req.params.productId; 
    const { value } = req.body;

    if (value < 0.5 || value > 5) {
      return res.status(400).json({ error: 'Rating value must be between 0.5 and 5' });
    }

    const existingRating = await prisma.ratingVideos.findFirst({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });

    if (existingRating) {
      const updatedRating = await prisma.ratingVideos.update({
        where: { userId: existingRating.id },
        data: { value: parseFloat(value) },
      });
      return res.status(200).json(updatedRating);
    }

    const newRating = await prisma.ratingVideos.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        value: parseFloat(value),
        mediaType: 'VIDEO',
      },
    });

    res.json(newRating);
  } catch (error) {
    console.error('Error rating product:', error);
    res.status(500).json({ error: 'An error occurred while rating the product' });
  }

});

rateVideo.get('/video/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
     
      const ratings = await prisma.ratingVideos.findMany({
        where: {
          productId: parseInt(productId),
          mediaType: 'VIDEO',
        },
      });
  
      res.json(ratings);
    } catch (error) {
      console.error('Error getting ratings:', error);
      res.status(500).json({ error: 'An error occurred while getting ratings' });
    }
  });
  
  
export default rateVideo;