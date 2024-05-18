import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shareVideo = express.Router();

shareVideo.get('/video/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;

    const productVideo = await prisma.productVideos.findUnique({
      where: {
        id: parseInt(videoId),
      },
    });

    if (!productVideo) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    const shareVideo = {
      title: productVideo.productName,
      description: productVideo.description,
      imageUrl: productVideo.mediaUrl,
      productUrl: 'http://advertconnectpro.com/product/' + productVideo.id,
    };

    res.json(shareVideo);
  } catch (error) {
    console.error('Error retrieving product image:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the product image' });
  }
});

export default shareVideo;

