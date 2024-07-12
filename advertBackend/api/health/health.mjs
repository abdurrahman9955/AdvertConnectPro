import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routerHealth = express.Router();

routerHealth.get('/',  (req, res) => {

    res.status(200).send('well come to advertConnectPro');
  });

routerHealth.get('/health', async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ status: 'well come to advertConnectPro', 
      message: 'thank you for vising an advertConnectPro we are always well coming you to our platform thank you for you support.' });

    } catch (error) {
      res.status(500).json({ status: ' oops! advertConnectPro access denied.',
      message: 'some thing went wrong! please be patient we are working on it to fix the issue'});
    }
  });
 

export default routerHealth;
