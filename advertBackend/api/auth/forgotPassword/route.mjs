import express from 'express';
import { v4 as uuidv4 } from 'uuid'; 
import argon2 from 'argon2';
import { SES } from '@aws-sdk/client-ses';
import session from 'express-session'; 
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../protected-route.mjs';
import configurePassport from '../configurePassport.mjs';

const prisma = new PrismaClient();
const resetPasswordRouter = express.Router();

const saltRounds = 10;

const ses = new SES({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

resetPasswordRouter.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const currentTimestamp = Date.now();

    if (user.otpExpiration && new Date(user.otpExpiration) < new Date(currentTimestamp)) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

resetPasswordRouter.post('/resend', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newOtp = generateOtp();
    const newOtpExpiration = Date.now() + 60000;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp: newOtp.toString(),
        otpExpiration: new Date(newOtpExpiration),
      },
    });

    await sendSESOtp(email, newOtp);

    return res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error during OTP resend:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

configurePassport();

resetPasswordRouter.use(passport.initialize()); 
resetPasswordRouter.use(passport.session());

resetPasswordRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

resetPasswordRouter.post('/update-password', async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        otp: otp,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid OTP' });
    }

    if (!newPassword || typeof newPassword !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid password' });
    }

    const currentTimestamp = Date.now();

    if (user.otpExpiration && new Date(user.otpExpiration) < new Date(currentTimestamp)) {
      throw new Error('OTP has expired');
    }

    const resetToken = uuidv4();  
    const resetTokenExpiry = Date.now() + 3600000;

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken,
        resetTokenExpiry: new Date(resetTokenExpiry),
        isVerified: true,
      },
    });


    sendResetTokenEmail(user.email, resetToken);


    let role = 'user';  

      if (user.isAdmin) {
      role = 'admin';

      } else if (user.isEmployee) {
      role = 'employee';
      }

    const token = await generateToken(user.id, role);
    const accessToken = await generateToken(user.id, role); 
    const refreshToken = await generateToken(user.id, role); 

    req.session.isAuthenticated = true;

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('userId', user.id, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('isAuthenticated', 'true', { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite:'none', secure: true });


    return res.status(200).json({
      message: 'Password updated successfully',
      token,
      accessToken,
      refreshToken,
      userId: user.id,
    });
  } catch (error) {
    console.error('Error during password update:', error.message);
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
          Data: `Dear our lovely and valuable user,

          Your One-Time Password (OTP) is: ${otp}. This code is valid for 60 seconds.
   
          Please use this OTP to complete your registration on advertConnectPro.com .
   
          Note: Do not share this OTP with anyone for security reasons. If you did not request

         this OTP, please ignore this message. `,
        },
      },
      Subject: {
        Data: 'Your OTP for sign-up to advertConnectPro.com',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
    await ses.sendEmail(params);
    console.log(`Email sent to ${email}: OTP`);
  } catch (error) {
    console.error('SES email error:', error.message);
    throw new Error('Failed to send email OTP');
  }
}

function sendResetTokenEmail(email, resetToken) {
  console.log(`Reset token sent to ${email}: ${resetToken}`);
}

export default resetPasswordRouter;