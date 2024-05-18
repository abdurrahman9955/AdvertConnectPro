import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const downloadVideo = express.Router();
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

downloadVideo.get('/video/:imageKey', async (req, res) => {
  try {
    const imageKey = req.params.imageKey;

    const downloadParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: imageKey,
    };

    const { Body } = await s3.send(new GetObjectCommand(downloadParams));

    if (!Body) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imageStream = new Readable();
    imageStream.push(Body);
    imageStream.push(null);

    res.set('Content-Type', ContentType || mime.lookup(imageKey) || 'application/octet-stream');
    imageStream.pipe(res);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'An error occurred while downloading the image' });
  }
});

export default downloadVideo;

