import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rateImages = express.Router();

rateImages.post('/images/:productId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const productId = req.params.productId; 
    const { value } = req.body;

    if (value < 0.5 || value > 5) {
      return res.status(400).json({ error: 'Rating value must be between 0.5 and 5' });
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });

   
    if (existingRating) {
      const updatedRating = await prisma.rating.update({
        where: { userId: existingRating.id },
        data: { value: parseFloat(value) },
      });
      return res.status(200).json(updatedRating);
    }

    const newRating = await prisma.rating.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        value: parseFloat(value),
        mediaType: 'PHOTO',
      },
    });

    res.json(newRating);
  } catch (error) {
    console.error('Error rating product:', error);
    res.status(500).json({ error: 'An error occurred while rating the product' });
  }

});

rateImages.get('/images/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
     
      const ratings = await prisma.rating.findMany({
        where: {
          productId: parseInt(productId),
          mediaType: 'PHOTO',
        },
      });
  
      res.json(ratings);
    } catch (error) {
      console.error('Error getting ratings:', error);
      res.status(500).json({ error: 'An error occurred while getting ratings' });
    }
  });
  
  
export default rateImages;

