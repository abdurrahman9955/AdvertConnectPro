import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const favoriteImages = express.Router();

favoriteImages.post('/images/:productId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const productId = req.params.productId;

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });

      return res.json({ success: true, message: 'Product removed from favorites' });
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        mediaType: 'PHOTO', 
      },
    });

    res.json(newFavorite);
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    res.status(500).json({ error: 'An error occurred while adding product to favorites' });
  }
});

favoriteImages.get('/images', async (req, res) => {
  try {
    const userId = parseInt(req.headers['user-id']);
    
    const favoriteImages = await prisma.favorite.findMany({
      where: {
        userId: userId,
        mediaType: 'PHOTO', 
      },
      select: {
        productId: true,
      },
    });

    const products = await Promise.all(favoriteImages.map(async (favorite) => {
      const product = await prisma.productImages.findUnique({
        where: {
          id: favorite.productId,
        },
      });

      if (product && product.mediaUrl && product.productName) {
        return product;
      } else {
        return null; 
      }
    }));

    const filteredProducts = products.filter(product => product !== null);

    res.status(200).json({success: true, data: filteredProducts });
  } catch (error) {
    console.error('Error retrieving favorite products:', error);
    res.status(500).json({ error: 'An error occurred while retrieving favorite products' });
  }
});

 
favoriteImages.delete('/images/:favoriteId', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const favoriteId = req.params.favoriteId;

    await prisma.favorite.delete({
      where: {
        userId: parseInt(userId),
        productId: parseInt(favoriteId),
      },
    });

    res.json({ success: true, message: 'Product removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing product from favorites:', error);
    res.status(500).json({ error: 'An error occurred while removing product from favorites' });
  }
});


export default favoriteImages;

