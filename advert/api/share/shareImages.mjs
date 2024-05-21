import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shareImages = express.Router();

shareImages.get('/images/:imageId', async (req, res) => {
  try {
    const imageId = req.params.imageId;

    const productImage = await prisma.productImages.findUnique({
      where: {
        id: parseInt(imageId),
      },
    });

    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    const shareImage = {
      title: productImage.productName,
      description: productImage.description,
      imageUrl: productImage.mediaUrl,
      productUrl: 'http://advertconnectpro.com/product/' + productImage.id,
    };

    res.json(shareImage);
  } catch (error) {
    console.error('Error retrieving product image:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the product image' });
  }
});

export default shareImages;
