import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectToQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'notifications';
    await channel.assertQueue(queue, { durable: true });

    return { connection, channel, queue };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

const sendNotificationToQueue = async (channel, content, userId) => {
  try {
    const notification = {
      content,
      userId,
      timestamp: Date.now(),
      messageId: uuidv4(),
    };

    await channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)), {
      persistent: true,
    });
  } catch (error) {
    console.error('Error sending notification to queue:', error);
    throw error;
  }
};

export const sendNotification = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const user = await prisma.user.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { connection, channel } = await connectToQueue();
    await sendNotificationToQueue(channel, content, userId);

    res.json({ success: true, message: 'Notification sent successfully' });

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
