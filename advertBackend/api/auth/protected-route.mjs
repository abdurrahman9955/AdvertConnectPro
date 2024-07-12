import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generateToken = async (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET,
     { expiresIn: process.env.JWT_REFRESH_EXPIRY });
  return token;
};


export const protectRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const newToken = await generateToken(null, null);
    return res.status(401).json({ success: false, error: 'Unauthorized - Missing token', newToken });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;

    const user = await prisma.user.findUnique({
      where: { id: userId, role: role },
      select: { id: true, role: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    let newToken = null;

   
    if (error.name === 'TokenExpiredError') {
      
      newToken = await generateToken(req.user.id, req.user.role);
    } else {
    
      newToken = await generateToken(null, null);
    }

    return res.status(401).json({ success: false, error: error.message || 'Unauthorized - Invalid token', newToken });
  }
};

