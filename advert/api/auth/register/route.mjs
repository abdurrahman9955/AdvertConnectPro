import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import session from 'express-session'; 
import { SES } from '@aws-sdk/client-ses';
import validator from 'validator';
import passport from 'passport';
import { generateToken } from '../protected-route.mjs';
import configurePassport from '../configurePassport.mjs';

const prisma = new PrismaClient();
const registerRoutes = express.Router();

const saltRounds = 10;

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
    console.log(`Email sent to ${email}: ${otp}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send email OTP');
  }
}

configurePassport();

registerRoutes.use(passport.initialize()); 
registerRoutes.use(passport.session()); 

registerRoutes.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

registerRoutes.post('/register', async (req, res) => {
  try {
    

    console.log('Received request body:', req.body); 

    const { email, firstName, lastName, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: ' Please provide a valid email ' });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid password' });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      console.log(`OTP expired for ${email}: ${otp}`);
    }, 60000);

    await sendSESOtp(email, otp);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        otp: otp.toString(),  
        otpExpiration: new Date(Date.now() + 60000), 
      },
    });

    const token = await generateToken(newUser.id, 'user');
    const accessToken = await generateToken(newUser.id, 'user'); 
    const refreshToken = await generateToken(newUser.id, 'user'); 

    req.session.isAuthenticated = true;

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('userId', newUser.id, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.cookie('isAuthenticated', 'true', { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite:'none', secure: true });


    return res.status(201).json({ token, accessToken, refreshToken, userId: newUser.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ' something went wrong! please try again ' });
  }
});

export default registerRoutes;