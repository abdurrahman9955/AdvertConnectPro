import express from 'express';
//import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const EmployeeLogin = express.Router();

EmployeeLogin.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await prisma.employee.findUnique({
      where: { email: email },
    });

    if (!employee) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

   // const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: employee.id, role: 'employee' }, process.env.JWT_SECRET,  {
      expiresIn: '1h', 
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default EmployeeLogin;
