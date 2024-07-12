import express from 'express';
import argon2 from 'argon2';
import { SES } from '@aws-sdk/client-ses';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import session from 'express-session'; 
import configurePassport from '../configurePassport.mjs';
import { generateToken } from '../protected-route.mjs';

const prisma = new PrismaClient();
const loginRoutes = express.Router();

const ses = new SES({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
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
   
          Please use this OTP to complete your Login on advertConnectPro.com .
   
          Note: Do not share this OTP with anyone for security reasons. If you did not request

         this OTP, please ignore this message.`,
        },
      },
      Subject: {
        Data: 'Your OTP for login to your account',
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

configurePassport();

loginRoutes.use(passport.initialize()); 
loginRoutes.use(passport.session());

loginRoutes.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

loginRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email not registered. Please create a new account.' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password. Please enter the correct password and try again.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = new Date(Date.now() + 60000); 

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        otp: otp.toString(),
        otpExpiration,
      },
    });

    await sendSESOtp(email, otp);

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
      message: 'OTP sent successfully',
      token,
      userId: user.id,
      accessToken,
      refreshToken,
    });} 
    
    catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

loginRoutes.get('/loginGet', (req, res) => {
  res.json({ message: 'GET request received on login route' });
});

export default loginRoutes;