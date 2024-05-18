import express from 'express';
import { PrismaClient } from '@prisma/client';

const routerProducts = express.Router();
const prisma = new PrismaClient();

routerProducts.post('/create', async (req, res) => {
  try {
    const {
      types,
      categories,
      phoneNumber,
      price,
      currency,
      country,
      state,
      province,
      city,
      fullAddress,
      emailAddress,
      productName,
      companyName,
      description,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        types,
        categories,
        phoneNumber,
        price,
        currency,
        country,
        state,
        province,
        city,
        fullAddress,
        emailAddress,
        productName,
        companyName,
        description
      }
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

routerProducts.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        media: true 
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const images = product.media.filter(media => media.mediaType === 'IMAGE');
    const banners = product.media.filter(media => media.mediaType === 'BANNER');
    const videos = product.media.filter(media => media.mediaType === 'VIDEO');

    res.status(200).json({ success: true, product, images, banners, videos  });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


routerProducts.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const {
    types,
    categories,
    phoneNumber,
    price,
    currency,
    country,
    state,
    province,
    city,
    fullAddress,
    emailAddress,
    productName,
    companyName,
    description, 
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        types,
        categories,
        phoneNumber,
        price,
        currency,
        country,
        state,
        province,
        city,
        fullAddress,
        emailAddress,
        productName,
        companyName,
        description
      },
    });

    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

routerProducts.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
       
    });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default routerProducts;


