import express from 'express';
import { PrismaClient } from '@prisma/client';
import { SES } from '@aws-sdk/client-ses';
import { generateToken } from '../protected-route.mjs';
import passport from 'passport';
import session from 'express-session'; 
import configurePassport from '../configurePassport.mjs';

const prisma = new PrismaClient();
const ses = new SES({
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
  region: process.env.MY_S3_REGION,
});

const routerOtpLogin = express.Router();


configurePassport();

routerOtpLogin.use(passport.initialize()); 
routerOtpLogin.use(passport.session());

routerOtpLogin.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

routerOtpLogin.post('/verify', async (req, res) => {
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


    if (user.otp.toString() !== otp.toString()) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    

    if (user.otpExpiration && new Date(user.otpExpiration) < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp: null,
        otpExpiration: null,
        isVerified: true, 
      },
    });

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

    return res.status(200).json({ message: 'OTP verified successfully',
    token,
    userId: user.id,
    accessToken,
    refreshToken,
     });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

routerOtpLogin.post('/resend', async (req, res) => {
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

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    const newOtpExpiration = new Date(Date.now() + 60000);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp: newOtp.toString(),
        otpExpiration: newOtpExpiration,
      },
    });

    await sendSESOtp(email, newOtp);

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

    return res.status(200).json({ message: 'OTP resent successfully', 
    token,
    userId: user.id,
    accessToken,
    refreshToken,
   });

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

export default routerOtpLogin;