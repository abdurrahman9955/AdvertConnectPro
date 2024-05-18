import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shareBanners = express.Router();

shareBanners.get('/banner/:bannerId', async (req, res) => {
  try {
    const bannerId = req.params.bannerId;

    const productBanner = await prisma.productBanners.findUnique({
      where: {
        id: parseInt(bannerId),
      },
    });

    if (!productBanner) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    const shareBanner = {
      title: productBanner.productName,
      description: productBanner.description,
      imageUrl: productBanner.mediaUrl,
      productUrl: 'http://advertconnectpro.com/product/' + productBanner.id,
    };

    res.json(shareBanner);
  } catch (error) {
    console.error('Error retrieving product image:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the product image' });
  }
});

export default shareBanners;
