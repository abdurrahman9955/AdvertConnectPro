import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AdminMiddleware } from './adminMiddleware.mjs';

const prisma = new PrismaClient();
const AdminAccess = express.Router();

AdminAccess.post('/:employeeId', AdminMiddleware, async (req, res) => {
  try {
    const { employeeId } = req.params;

    res.json({ message: 'Employee onboarded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default AdminAccess;
