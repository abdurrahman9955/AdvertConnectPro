import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const orderRequest = express.Router();

orderRequest.get('/orders', async (req, res) => {
    try {
      const userId = parseInt(req.headers['user-id']); 
  
      if (isNaN(userId)) {
        throw new Error('Invalid userId');
      }
  
      const userProducts = await prisma.productImages.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });
  
      const productIds = userProducts.map(product => product.id);
  
      const orders = await prisma.productOrder.findMany({
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

  orderRequest.post('/orders', async (req, res) => {
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

    const newOrder = await prisma.productOrder.create({
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

export default orderRequest;