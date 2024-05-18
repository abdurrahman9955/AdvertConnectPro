import express from 'express';
import { PrismaClient } from '@prisma/client';
import { CognitoIdentityProviderClient, SignUpCommand, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { generateToken } from '../auth/protected-route.mjs';
import { configurePassport } from '../auth/configurePassport.mjs'; 
import session from 'express-session';

const prisma = new PrismaClient();
const googleAuthRegister = express.Router();
const cognitoClient = new CognitoIdentityProviderClient({ region:  process.env.MY_S3_REGION });

configurePassport(); 

googleAuthRegister.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

googleAuthRegister.get('/google-register', async (req, res, next) => {
  try {

    const userData = req.user;
    const email = userData.email; 
    const firstName = userData.given_name;
    const lastName = userData.family_name;

    const createUserParams = {
      UserPoolId: process.env.MY_COGNITO_USER_POOL_ID,
      Username: email, 
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'given_name', Value: firstName },
        { Name: 'family_name', Value: lastName },
      ]
    };

    const createUserCommand = new AdminCreateUserCommand(createUserParams);
    await cognitoClient.send(createUserCommand);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name,
      }
    });

    const token = await generateToken(newUser.id, 'user');
    const accessToken = await generateToken(newUser.id, 'user');
    const refreshToken = await generateToken(newUser.id, 'user');


    req.session.isAuthenticated = true;

    res.json({ success: true, userId:newUser.id, token, accessToken, refreshToken });
  } catch (error) {
    console.error('Error registering user with Amazon Cognito:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default googleAuthRegister;

