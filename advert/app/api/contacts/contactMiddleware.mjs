import express from 'express';
import { SES } from '@aws-sdk/client-ses';
import { PrismaClient } from '@prisma/client';

const routerContactUs = express.Router();
const prisma = new PrismaClient();

const ses = new SES({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.MY_SES_REGION,
});

routerContactUs.post('/contactus', async (req, res) => {
  try {
    const { name, email, reason, statement } = req.body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        reason,
        statement,
      },
    });

    await sendSESContactEmail(email, name, reason, statement);

    return res.status(200).json({ message: 'Contact submission and email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function sendSESContactEmail(email, name, reason, statement) {
  const params = {
    Destination: {
      ToAddresses: [process.env.AUTH_EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Data: `New contact submission received!\n\nContact Details:\nName: ${name}\nEmail: ${email}\nReason: ${reason}\nStatement: ${statement}`,
        },
      },
      Subject: {
        Data: 'New Contact Submission',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
    await ses.sendEmail(params);
    console.log(`Email sent to ${process.env.AUTH_EMAIL}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send contact email');
  }
}

export default routerContactUs;
