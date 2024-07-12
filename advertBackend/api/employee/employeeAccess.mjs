import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const EmployeeAccess = express.Router();

EmployeeAccess.post('/requestAccess', async (req, res) => {
  try {
    const { userId, requestedAccess } = req.body;

    const validAccessTypes = ['read', 'write', 'admin']; 
    if (!validAccessTypes.includes(requestedAccess)) {
      return res.status(400).json({ error: 'Invalid requested access type' });
    }

    const existingRequest = await prisma.accessRequest.findFirst({
      where: {
        userId: parseInt(userId),
        status: 'Pending',
      },
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'There is already a pending request for this user' });
    }

    const createdRequest = await prisma.accessRequest.create({
      data: {
        userId: parseInt(userId),
        requestedAccess,
        status: 'Pending',
      },
    });

    res.json({ message: 'Access request submitted successfully', request: createdRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

EmployeeAccess.get('/accessRequests', async (req, res) => {
  try {
    const accessRequests = await prisma.accessRequest.findMany();

    res.json(accessRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

EmployeeAccess.post('/approveAccess/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const { approvalStatus } = req.body;

    const validStatusTypes = ['approved', 'rejected']; 
    if (!validStatusTypes.includes(approvalStatus)) {
      return res.status(400).json({ error: 'Invalid approval status type' });
    }

    const updatedRequest = await prisma.accessRequest.update({
      where: { id: parseInt(requestId) },
      data: { status: approvalStatus },
    });

    res.json({ message: `Access request ${approvalStatus.toLowerCase()} successfully`, request: updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default EmployeeAccess;
