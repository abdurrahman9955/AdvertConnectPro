import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const videosOrder = express.Router();

videosOrder.get('/videos', async (req, res) => {
    try {
      const userId = parseInt(req.headers['user-id']); 
  
      if (isNaN(userId)) {
        throw new Error('Invalid userId');
      }
 
      const userProducts = await prisma.productBanners.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });
  
      const productIds = userProducts.map(product => product.id);
  
      const orders = await prisma.videosOrder.findMany({
        where: {
          productId: {
            in: productIds,
          },
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
 
      res.json(orders);
    } catch (error) {
      console.error('Error retrieving product orders:', error);
      res.status(500).json({ error: 'An error occurred while retrieving product orders' });
    }
  });

  videosOrder.post('/video', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, fullAddress, description } = req.body;
    const userId = parseInt(req.headers['user-id']);
    const productId = parseInt(req.headers['product-id']);

    if (isNaN(userId)) {
      throw new Error('Invalid userId');
    }

    if (isNaN(productId)) {
      throw new Error('Invalid productId! and user must provide a valid productId');
    }

    const newOrder = await prisma.videosOrder.create({
      data: {
        userId,
        productId,
        fullName,
        email,
        phoneNumber,
        fullAddress,
        description,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error adding product order:', error);
    res.status(500).json({ error: 'An error occurred while adding product order' });
  }
});

export default videosOrder;
