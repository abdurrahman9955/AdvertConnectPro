import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; 

const prisma = new PrismaClient();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('images');

const processAndSaveImage = async (req, res) => {
  try {

    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    const files = req.files; 
    if (!files || !files.length) {
      return res.status(400).json({ success: false, error: 'No files provided' });
    }

    const savedImages = [];
    const imageUrls = [];

    const uniqueProductId = uuidv4();

    for (let i = 0; i < files.length; i++) {
      const file = files[i]; 
      const uniqueFilename = uuidv4();
      const imageKey = `images/${uniqueFilename}.${file.originalname.split('.').pop()}`;
  
      const processedImageBuffer = await sharp(file.buffer)
        .resize({ width: 500, height: 500 })
        .toBuffer();
  
      const uploadParams = {
        Bucket: process.env.MY_S3_BUCKET_NAME,
        Key: imageKey,
        Body: processedImageBuffer,
        ACL: 'public-read',
      };
  
      const uploadResult = await s3.send(new PutObjectCommand(uploadParams)); 

      console.log(`Processing upload result ${i}:`, uploadResult);

      const bucketUrl = `https://${process.env.MY_S3_BUCKET_NAME}.s3.${process.env.MY_S3_REGION}.amazonaws.com`;
      const fileUrl = `${bucketUrl}/${imageKey}`;

      imageUrls.push(fileUrl); 

      const userId = req.headers['user-id'];
      
      const uploadedById = parseInt(userId, 10); 

      const { product, types, categories, phoneNumber, phoneCode, price, currency, country, state, province, city, fullAddress,emailAddress, productName, companyLink, companyName, description } = req.body;

      const savedImage = await prisma.productImages.create({
        data: {
          mediaType: 'PHOTO',
          mediaUrl: imageUrls,
          uploadedBy:uploadedById,
          productId: uniqueProductId,
          product,
          types,
          categories,
          phoneNumber,
          phoneCode,
          price,
          currency,
          country,
          state,
          province,
          city,
          fullAddress,
          emailAddress,
          productName,
          companyLink,
          companyName,
          description,
          User: { connect: { id:uploadedById} } 
        },
      });
      savedImages.push(savedImage);
    }

    res.status(201).json({ success: true, images: savedImages });
  } catch (error) {
    console.error('Error processing and saving image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



const editImage = async (req, res) => {
  try {
    const { id, mediaUrl } = req.body;
    const userId = req.headers['user-id'];
  
    if (!id || !mediaUrl || !userId) {
      return res.status(400).json({ success: false, error: 'Image ID, URL, and user ID are required' });
    }

    const existingImage = await prisma.productImages.findFirst({
      where: {
        id: parseInt(id),
        uploadedBy: parseInt(userId), 
        mediaType: 'PHOTO',
      },
    });

    if (!existingImage) {
      return res.status(404).json({ success: false, error: 'Image not found or user does not have permission to edit' });
    }

    const updatedImage = await prisma.productImages.update({
      where: {
        id: parseInt(id),
    
      },
      data: {
          mediaUrl,
          product,
          types,
          categories,
          phoneNumber,
          phoneCode,
          price,
          currency,
          country,
          state,
          province,
          city,
          fullAddress,
          emailAddress,
          productName,
          companyLink,
          companyName,
          description,
      }, 
    });


    res.status(200).json({ success: true, updatedImage, message: 'Image updated successfully' });
  } catch (error) {
    console.error('Error editing image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


const deleteImage = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const userId = req.headers['user-id']; 

    if (!productId || !userId) {
      return res.status(400).json({ success: false, error: 'Image ID and user ID are required' });
    }

    const existingImage = await prisma.productImages.findFirst({
      where: {
        id: productId,
        uploadedBy: parseInt(userId), 
      },
    });

    if (!existingImage) {
      return res.status(404).json({ success: false, error: 'Image not found or user does not have permission to delete' });
    }

    const deletedImage = await prisma.productImages.delete({
      where: {
        id: productId,
      },
    });

    await prisma.productImages.deleteMany({
      where: {
        productId: existingImage.productId,
      },
    });

    res.status(200).json({ success: true, deletedImage, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


const getImage = async (req, res) => {
  try {
    const userId = req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const {
      city,
      country,
      state,
      fullAddress,
      minPrice,
      maxPrice,
      company,
      name,
      types,
      categories,
      searchQuery,
    } = req.query;

    const filters = {
      mediaType: 'PHOTO', 
    };

    if (searchQuery) {
      filters.OR = [
        { productName: { contains: searchQuery, mode: 'insensitive' } },
        { types: { contains: searchQuery, mode: 'insensitive' } },
        { categories: { contains: searchQuery, mode: 'insensitive' } },
        { phoneNumber: { contains: searchQuery, mode: 'insensitive' } },
        { phoneCode: { contains: searchQuery, mode: 'insensitive' } },
        { currency: { contains: searchQuery, mode: 'insensitive' } },
        { country: { contains: searchQuery, mode: 'insensitive' } },
        { state: { contains: searchQuery, mode: 'insensitive' } },
        { province: { contains: searchQuery, mode: 'insensitive' } },
        { city: { contains: searchQuery, mode: 'insensitive' } },
        { fullAddress: { contains: searchQuery, mode: 'insensitive' } },
        { emailAddress: { contains: searchQuery, mode: 'insensitive' } },
        { companyName: { contains: searchQuery, mode: 'insensitive' } },
        { companyLink: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        
      ];
    }

    if (city) filters.city = city;
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (fullAddress) filters.fullAddress = fullAddress;
    if (minPrice) filters.price = { ...filters.price, gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
    if (company) filters.companyName = company;
    if (name) filters.productName = name;
    if (categories) filters.categories = categories;
    if (types) filters.types = types;

    const images = await prisma.productImages.findMany({
      where:{
        uploadedBy: parseInt(userId),
        ...filters,
      },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      distinct: ['productId'],
    });

    res.status(200).json({ success: true, images: Array.isArray(images) ? images : [images] });
  } catch (error) {
    console.error('Error fetching images', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

 const getImageByProfileId = async (req, res) => {
  try {
    const userId = req.headers['profile-id'];

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const images = await prisma.productImages.findMany({
      where: {
        uploadedBy: parseInt(userId),
        mediaType: 'PHOTO',
      },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      distinct: ['productId'],
    });

    res.status(200).json({ success: true, images: Array.isArray(images) ? images : [images] });
  } catch (error) {
    console.error('Error fetching images', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getImages = async (req, res) => {
  try {
    const {
      city,
      country,
      state,
      fullAddress,
      minPrice,
      maxPrice,
      company,
      name,
      types,
      categories,
      searchQuery,
    } = req.query;

    const filters = {
      mediaType: 'PHOTO', 
    };

    if (searchQuery) {
      filters.OR = [
        { productName: { contains: searchQuery, mode: 'insensitive' } },
        { types: { contains: searchQuery, mode: 'insensitive' } },
        { categories: { contains: searchQuery, mode: 'insensitive' } },
        { phoneNumber: { contains: searchQuery, mode: 'insensitive' } },
        { phoneCode: { contains: searchQuery, mode: 'insensitive' } },
        { currency: { contains: searchQuery, mode: 'insensitive' } },
        { country: { contains: searchQuery, mode: 'insensitive' } },
        { state: { contains: searchQuery, mode: 'insensitive' } },
        { province: { contains: searchQuery, mode: 'insensitive' } },
        { city: { contains: searchQuery, mode: 'insensitive' } },
        { fullAddress: { contains: searchQuery, mode: 'insensitive' } },
        { emailAddress: { contains: searchQuery, mode: 'insensitive' } },
        { companyName: { contains: searchQuery, mode: 'insensitive' } },
        { companyLink: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        
      ];
    }

    if (city) filters.city = city;
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (fullAddress) filters.fullAddress = fullAddress;
    if (minPrice) filters.price = { ...filters.price, gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
    if (company) filters.companyName = company;
    if (name) filters.productName = name;
    if (categories) filters.categories = categories;
    if (types) filters.types = types;

    const images = await prisma.productImages.findMany({
      where: filters,
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      distinct: ['productId'],
    });

    res.status(200).json({ success: true, images: Array.isArray(images) ? images : [images] });
  } catch (error) {
    console.error('Error fetching images', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getImagesByProductId = async (req, res) => {
  
  const id = parseInt(req.headers['product-id']);
  
  try {
    console.log(`Received request for product with ID: ${id}`);

    if (!id) {
       return res.status(400).json({ success: false, error: 'Missing product id' });
    }

    const product = await prisma.productImages.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      console.error(`Product with ID ${id} not found`);
      return res.status(404).json({ success: false, error: `Product with ID ${id} not found` });
    }

    const productImages = await prisma.productImages.findMany({
      where: {
        productId: product.productId,
        mediaType: 'PHOTO',
      },
      include: {
        User: {
          include: {
            profile: true,
         },
        },
      },
    });

    console.log(`Product images found:`, productImages);
   
    res.status(200).json({ success: true, productImages });
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve product images' });
  }
};


export { processAndSaveImage, deleteImage, editImage, getImages, getImage, getImagesByProductId, getImageByProfileId };

