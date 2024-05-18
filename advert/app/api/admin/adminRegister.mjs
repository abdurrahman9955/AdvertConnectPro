import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const AdminRegister = express.Router();

AdminRegister.post('/register', async (req, res) => {
  try {
    const { fullName, email, country, state, area,  address, password } = req.body;

    if (!fullName || !email || !country || !state || !area || !address || !password) {
      return res.status(400).json({ error: ' all field required for registration ' });
    }

    const existingAdmin = await prisma.adminRegistration.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const createdAdmin = await prisma.adminRegistration.create({
      data: { fullName, email, country, state, area,  address, password },
    });

    res.json({ message: 'Admin registration successful', admin: createdAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default AdminRegister;

