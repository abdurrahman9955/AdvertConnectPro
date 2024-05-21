
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProduct = async (req, res) => {
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
      userId
      
    } = req.body;

    const imageId = req.headers['image-id'];

  if (!imageId) {
    return res.status(400).json({ success: false, error: 'Image ID is required' });
  }

    const product = await prisma.product.create({
      data: {
        userId,
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
        productMedia: {
          connect: { id: parseInt(imageId) }
        },
      }
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const imageId = req.headers['image-id'];

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        productMedia: {
          connect: { id: parseInt(imageId) }
        },
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
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
    userId 
  } = req.body;

  const imageId = req.headers['image-id'];

  try {

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        userId,
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
        productMedia: {
          connect: { id: parseInt(imageId) }
        },
      },
    });

    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {

  const productId = parseInt(req.params.id);
  const imageId = req.headers['image-id'];

  try {
    await prisma.product.delete({
      where: {
        id: productId,
        productMedia: {
          connect: { id: parseInt(imageId) }
        },
      },
    });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export { createProduct, getProductById, updateProduct, deleteProduct };


