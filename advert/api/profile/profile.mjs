import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';

const prisma = new PrismaClient();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

const profile = express.Router();

profile.post('/upload/:userId', async (req, res) => {
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

    const userId = req.headers['user-id']; 
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const uniqueFilename = uuidv4();
    const imageKey = `profile/${userId}/images/${uniqueFilename}.${file.originalname.split('.').pop()}`;
    const processedImageBuffer = await sharp(file.buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    const uploadParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: imageKey,
      Body: processedImageBuffer,
      ACL: 'public-read',
    };

    const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

    console.log(`Processing upload result:`, uploadResult);

    if (!uploadResult) {
      console.error('Error: Upload result is missing.');
      return res.status(500).json({ success: false, error: 'Upload failed' });
    }

    const bucketUrl = `https://${process.env.MY_S3_BUCKET_NAME}.s3.${process.env.MY_S3_REGION}.amazonaws.com`;
    const fileUrl = `${bucketUrl}/${imageKey}`;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (existingProfile) {
      await prisma.profile.update({
        where: { userId: parseInt(userId) },
        data: { photoUrl: fileUrl },
      });
    }  else {
      await prisma.profile.create({
        data: {
          userId: parseInt(userId),
          photoUrl: fileUrl,
        },
      });
    }

    res.status(201).json({ success: true, message: 'Profile image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

profile.get('/get/:userId', async (req, res) => {
  try {
    const userId = req.headers['user-id']; 

    const user = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      select: { photoUrl: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (!user.photoUrl) {
      return res.status(404).json({ success: false, error: 'Profile image not found' });
    }

    res.status(200).json({ success: true, imageUrl: user.photoUrl });
  } catch (error) {
    console.error('Error getting profile image:', error);
    if (error instanceof PrismaClient.Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({ success: false, error: 'Database Error' });
    }
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


profile.put('/update/:userId', async (req, res) => {
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

    const userId = req.headers['user-id']; 
    const { file } = req;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const uniqueFilename = uuidv4();
    const imageKey = `profile/${userId}/images/${uniqueFilename}.${file.originalname.split('.').pop()}`;

    const processedImageBuffer = await sharp(file.buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    const uploadParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: imageKey,
      Body: processedImageBuffer,
      ACL: 'public-read',
    };

    const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

    console.log(`Processing upload result:`, uploadResult);

    if (!uploadResult) {
      console.error('Error: Upload result is missing.');
      return res.status(500).json({ success: false, error: 'Upload failed' });
    }

    const bucketUrl = `https://${process.env.MY_S3_BUCKET_NAME}.s3.${process.env.MY_S3_REGION}.amazonaws.com`;
    const fileUrl = `${bucketUrl}/${imageKey}`;

    await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: {
        photoUrl: fileUrl,
      },
    });

    res.status(200).json({ success: true, message: 'Profile image updated successfully', imageUrl: fileUrl });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

profile.delete('/delete/:userId', async (req, res) => {
  try {
    const  userId  = req.headers['user-id']; 

    const user = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      select: { photoUrl: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (!user.photoUrl) {
      return res.status(404).json({ success: false, error: 'Profile image not found' });
    }

    const imageKey = user.photoUrl.split('/').slice(-1)[0];
    const deleteParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: imageKey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: { photoUrl: null },
    });

    res.status(200).json({ success: true, message: 'Profile image deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile image:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default profile;


