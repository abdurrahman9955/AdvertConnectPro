import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import multer from 'multer';
import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const friendChats = express();
const io = new SocketIOServer();

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

friendChats.use(express.json());

friendChats.use('/uploads', express.static('uploads'));

const activeGroups = new Map();

io.on('connection', (socket) => {
  console.log(`User connected`);

  socket.on('chatMessage', (data) => {
    const { userId, message } = data;
    io.emit('chatMessage', { userId, message });
  });

  socket.on('groupChatMessage', (data) => {
    const { userId, groupId, message } = data;
    socket.to(groupId).emit('groupChatMessage', { userId, message });
  });

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('leaveGroup', (groupId) => {
    socket.leave(groupId);
    console.log(`User left group: ${groupId}`);
  });

  socket.on('voiceMessage', async (data) => {
    const { userId, audio } = data;

    const uniqueFilename = uuidv4();
    const audioKey = `uploads/${userId}_${uniqueFilename}.webm`;

    const s3UploadParams = {
      Bucket: process.env.MY_S3_BUCKET_NAME,
      Key: audioKey,
      Body: audio,
      ContentType: 'audio/webm',
      ACL: 'public-read',
    };

    try {
      const s3UploadResult = await new Upload({
        client: s3,
        params: s3UploadParams,
      }).done();

      console.log('Audio uploaded successfully:', s3UploadResult.Location);

      io.emit('voiceMessage', {
        userId,
        audioUrl: s3UploadResult.Location,
      });
    } catch (error) {
      console.error('Error uploading audio:', error);
      socket.emit('uploadError', { error: 'Failed to upload audio' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected`);
  });
});

export default friendChats;

