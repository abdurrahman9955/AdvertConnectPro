import express from 'express';
import { SES } from '@aws-sdk/client-ses';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../protected-route.mjs';

const routerOtpReset = express.Router();
const prisma = new PrismaClient();

const ses = new SES({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  region: process.env.MY_S3_REGION,
});

routerOtpReset.post('/resetpassword', async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    if (email) {
      await sendSESOtp(email, otp);
    } else if (phone) {
      return res.status(400).json({ error: 'Phone number reset is not supported' });
    } else {
      return res.status(400).json({ error: 'User must provide either email or phone' });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken: otp,
        resetTokenExpiry: new Date(Date.now() + 3600000).toISOString(),
      },
    });

    return res.status(200).json({ message: 'Reset token sent successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function sendSESOtp(email, otp) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your OTP is: ${otp}. It will expire in 60 seconds.`,
        },
      },
      Subject: {
        Data: 'Your OTP',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
    await ses.sendEmail(params);
    console.log(`Email sent to ${email}: ${otp}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send email OTP');
  }
}

export default routerOtpReset;
