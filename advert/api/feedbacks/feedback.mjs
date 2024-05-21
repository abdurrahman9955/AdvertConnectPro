import express from 'express';
import { PrismaClient } from '@prisma/client';
import { SES } from '@aws-sdk/client-ses';

const prisma = new PrismaClient();
const ses = new SES({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.MY_SES_REGION,
});

const feedbackRoutes = express.Router();

async function sendFeedbackEmail(feedback) {
  const toEmail = process.env.AUTH_EMAIL;

  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Thank you for providing your feedback! We really appreciate it.\n\nFeedback Details:\nName: ${feedback.name}\nReason: ${feedback.reason}\nStatement: ${feedback.statement}\nRating: ${feedback.rating}`,
        },
      },
      Subject: {
        Data: 'New Feedback Received',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
   // await ses.sendEmail(params);
    console.log(`Feedback email sent to ${toEmail}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send feedback email');
  }
}

feedbackRoutes.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

feedbackRoutes.post('/feedback', async (req, res) => {
  try {
    const { name, reason, statement, rating } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        name,
        reason,
        statement,
        rating,
      },
    });

    await sendFeedbackEmail(feedback);

    return res.status(200).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

feedbackRoutes.delete('/feedback/:id', async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id, 10);

    await prisma.feedback.delete({
      where: {
        id: feedbackId,
      },
    });

    return res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default feedbackRoutes;



