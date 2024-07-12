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

const sendFeedbackEmail = async (feedback) => {
  const toEmail = process.env.AUTH_EMAIL; 

  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Thank you for providing your feedback! We really 
          appreciate it.\n\nFeedback Details:\nName:
           ${feedback.name}\nReason: ${feedback.reason}\nStatement: 
           ${feedback.statement}\nRating: ${feedback.rating}`,
        },
      },
      Subject: {
        Data: 'New Feedback Received',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
    await ses.sendEmail(params);
    console.log(`Feedback email sent to ${toEmail}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send feedback email');
  }
};

const feedbackMiddleware = async (req, res, next) => {
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

    req.feedback = feedback;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { feedbackMiddleware };




