import express from 'express';
import { PrismaClient } from '@prisma/client';
import { checkCanBlockUsers, checkCanSuspendUsers, checkCanDeleteUsers, checkCanSendMessage,
   checkCanUserAnalysis } from './employeeMiddleware.mjs';

const prisma = new PrismaClient();
const Employee = express.Router();

const checkAccess = (requiredAccess) => async (req, res, next) => {
  try {
    if (!req.user || !req.user.employee) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const employeeAccess = req.user.employee.access;

    if (employeeAccess[requiredAccess]) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

Employee.post('/block/:userId', checkCanBlockUsers, async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { isBlocked: true },
    });

    res.json({ message: 'User account blocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

Employee.post('/suspend/:userId', checkCanSuspendUsers, async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { isSuspended: true },
    });

    res.json({ message: 'User account suspended successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

Employee.post('/delete/:userId', checkCanDeleteUsers, async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

Employee.post('/sendMessage/:userId', checkCanSendMessage, async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

Employee.get('/userAnalysis', checkCanUserAnalysis, async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default Employee;
