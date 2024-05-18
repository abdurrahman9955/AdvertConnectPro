import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import mime from 'mime-types';
import sharp from 'sharp';

const prisma = new PrismaClient();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);


const processThumbnail = async (thumbnailBuffer) => {
  const processedThumbnailBuffer = await sharp(thumbnailBuffer)
    .resize(500, 500)
    .toFormat('jpeg') 
    .jpeg({ quality: 100 }) 
    .toBuffer();
  return processedThumbnailBuffer;
};


const processAndSaveThumbnail = async (thumbnailFile) => {
  try {
    const thumbnailUniqueFilename = uuidv4();
    const thumbnailKey = `thumbnails/${thumbnailUniqueFilename}.${thumbnailFile.originalname.split('.').pop()}`;

    const processedThumbnailBuffer = await processThumbnail(thumbnailFile.buffer);

    const s3ThumbnailUploadParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: thumbnailKey,
      Body: processedThumbnailBuffer,
      ACL: 'public-read',
    };

    const s3ThumbnailUploadResult = await s3.send(new PutObjectCommand(s3ThumbnailUploadParams));

    if (!s3ThumbnailUploadResult) {
      console.error('Error: Thumbnail upload result is missing.');
      throw new Error('Thumbnail upload failed');
    }

    const bucketUrl = `https://${process.env.MY_S3_BUCKET_NAME}.s3.${process.env.MY_S3_REGION}.amazonaws.com`;
    const thumbnailUrl = `${bucketUrl}/${thumbnailKey}`;

    return thumbnailUrl;
  } catch (error) {
    console.error('Error processing and saving thumbnail:', error);
    throw new Error('Internal Server Error');
  }
};

const processAndSaveVideo = async (req, res) => {
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
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ success: false, error: 'No files provided' });
    }

    const videoFile = files['video']?.[0];
    const thumbnailFile = files['thumbnail']?.[0]; 
   
    if (!videoFile && thumbnailFile) {
      return res.status(400).json({ success: false, error: 'No video and thumbnail file provided' });
    }

    const videoMimeType = mime.lookup(videoFile.originalname);
    if (!videoMimeType || !videoMimeType.startsWith('video/')) {
      return res.status(400).json({ success: false, error: 'Invalid video file type' });
    }
  
    const uniqueProductId = uuidv4();

    for (const file of Object.values(files)) {
      const uniqueFilename = uuidv4();
      const videoKey = `videos/${uniqueFilename}.${file.originalname ? file.originalname.split('.').pop() : ''}`;

      const s3UploadParams = {
        Bucket: process.env.MY_S3_BUCKET_NAME,
        Key: videoKey,
        Body: videoFile.buffer, 
        ACL: 'public-read',
        ContentType: 'video/mp4', 
        ContentLength: videoFile.size 
      };

      const s3UploadResult = await s3.send(new PutObjectCommand(s3UploadParams));

      if (!s3UploadResult) {
        console.error('Error: Video upload result is missing.');
        return res.status(500).json({ success: false, error: 'Video upload failed' });
      }
      const bucketUrl = `https://${process.env.MY_S3_BUCKET_NAME}.s3.${process.env.MY_S3_REGION}.amazonaws.com`;
      const fileUrl = `${bucketUrl}/${videoKey}`;


       if (thumbnailFile && files === thumbnailFile) {}

        const thumbnailUrl = await processAndSaveThumbnail(thumbnailFile);
  
        if (!videoFile && thumbnailFile) {
          return res.status(400).json({ success: false, error: 'No video and thumbnail file provided' });
        }

    const userId = req.headers['user-id'];
    
    const uploadedById = parseInt(userId, 10);

    const { product, types, categories, phoneNumber, phoneCode, price, currency, country, state, province, city, fullAddress, emailAddress, productName, companyLink, companyName, description } = req.body;

    const savedVideo = await prisma.productVideos.create({
      data: {
        mediaType: 'VIDEO',
        mediaUrl: fileUrl,
        thumbnailUrl: thumbnailUrl,
        uploadedBy: uploadedById,
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
        User: { connect: { id: uploadedById } }
      },
    });

    if (!thumbnailUrl && fileUrl) {
      console.error('thumbnail url and the file url are invalid');
      return res.status(404).json({ success: false, error: 'thumbnailUrl and the fileUrl must be valid'});
    }

   if (!savedVideo) {
      console.error(' user must upload video and the thumbnail');
      return res.status(404).json({ success: false, error: 'video and thumbnail cannot be uploaded'});
    }
 
    res.status(201).json({ success: true, video: savedVideo });
    }
  } catch (error) {
    console.error('Error processing and saving video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

const deleteVideo = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const userId = req.headers['user-id']; 

    if (!productId || !userId) {
      return res.status(400).json({ success: false, error: 'video ID and user ID are required' });
    }

    const existingVideo = await prisma.productVideos.findFirst({
      where: {
        id: productId,
        userId: parseInt(userId), 
      },
    });

    if (!existingVideo) {
      return res.status(404).json({ success: false, error: 'video not found or user does not have permission to delete' });
    }

    const deletedVideo = await prisma.productVideos.delete({
      where: {
        id: productId,
       
      },
    });

    await prisma.productVideos.deleteMany({
      where: {
        productId: existingVideo.productId,
      },
    });

    res.status(200).json({ success: true, deletedVideo, message: 'video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const editVideo = async (req, res) => {
  try {
    const { id, mediaUrl } = req.body;
    const userId = req.headers['user-id'];

    if (!id || !mediaUrl || !userId) {
      return res.status(400).json({ success: false, error: 'video ID, URL, and user ID are required' });
    }

    const existingVideo = await prisma.productVideos.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId), 
        mediaType: 'VIDEO',
      },
    });

    if (!existingVideo) {
      return res.status(404).json({ success: false, error: 'video not found or user does not have permission to edit' });
    }

    const { product, types, categories, phoneNumber, phoneCode, price, currency, country, state, province, city, fullAddress,emailAddress, productName, companyLink, companyName, description } = req.body;

    const updatedVideo = await prisma.productVideos.update({
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

    res.status(200).json({ success: true, updatedVideo, message: 'video updated successfully' });
  } catch (error) {
    console.error('Error editing video:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getVideoByProfileId = async (req, res) => {
  try {

    const userId = req.headers['profile-id'];

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }
   
    const videos = await prisma.productVideos.findMany({
      where:{
        uploadedBy: parseInt(userId),
        mediaType:'VIDEO'
      },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      distinct: ['productId'],
      orderBy: {
        createdAt: 'desc', 
      },
    });

    const videosWithThumbnail = videos.map(video => ({
      ...video,
      thumbnailUrl: video.thumbnailUrl, 
    }));

    res.status(200).json({ success: true, videos: Array.isArray(videosWithThumbnail) ? videosWithThumbnail : [videosWithThumbnail] });
  } catch (error) {
    console.error('Error fetching videos', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getVideo = async (req, res) => {
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
      mediaType:'VIDEO'
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
  
    const videos = await prisma.productVideos.findMany({
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
      orderBy: {
        createdAt: 'desc', 
      },
    });

    const videosWithThumbnail = videos.map(video => ({
      ...video,
      thumbnailUrl: video.thumbnailUrl, 
    }));

    res.status(200).json({ success: true, videos: Array.isArray(videosWithThumbnail) ? videosWithThumbnail : [videosWithThumbnail] });
  } catch (error) {
    console.error('Error fetching videos', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getVideos = async (req, res) => {
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
      mediaType:'VIDEO'
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

    const videos = await prisma.productVideos.findMany({
      where:  filters,
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
      distinct: ['productId'],
      orderBy: {
        createdAt: 'desc',
      },
    });

    const videosWithThumbnail = videos.map(video => ({
      ...video,
      thumbnailUrl: video.thumbnailUrl, 
    }));

    res.status(200).json({ success: true, videos: Array.isArray(videosWithThumbnail) ? videosWithThumbnail : [videosWithThumbnail] });
  } catch (error) {
    console.error('Error fetching videos', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getVideosByProductId = async (req, res) => {
  
  const id = parseInt(req.headers['product-id']);
  
  try {
    console.log(`Received request for product with ID: ${id}`);

    if (!id) {
       return res.status(400).json({ success: false, error: 'Missing product id' });
    }

    const product = await prisma.productVideos.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      console.error(`Product with ID ${id} not found`);
      return res.status(404).json({ success: false, error: `Product with ID ${id} not found` });
    }

    const productVideos = await prisma.productVideos.findMany({
      where: {
        productId: product.productId,
        mediaType: 'VIDEO',
      },
      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
    });

    console.log(`Product videos found:`, productVideos);
   
    res.status(200).json({ success: true, productVideos });
  } catch (error) {
    console.error('Error fetching product videos:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve product videos ' });
  }
};


export { processAndSaveVideo, deleteVideo, editVideo, getVideos, getVideo, getVideosByProductId, getVideoByProfileId };

