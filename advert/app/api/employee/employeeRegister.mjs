import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const EmployeeRegister = express.Router();

EmployeeRegister.post('/register', async (req, res) => {
  try {
    const { fullName, email, country, state, area,  address, password } = req.body;

    if (!fullName || !email || !country || !state || !area || !address || !password) {
      return res.status(400).json({ error: ' all field required for registration ' });
    }
    const existingEmployee = await prisma.employeeRegistration.findUnique({
      where: { email },
    });

    if (existingEmployee) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const createdEmployee = await prisma.employeeRegistration.create({
      data: { fullName, email, country, state, area, address, password },
    });

    res.json({ message: 'Employee registration successfully', employee: createdEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default EmployeeRegister;
