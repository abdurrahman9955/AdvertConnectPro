import express from 'express';
import  authenticateUser  from './middleware.mjs';
import { sendNotification } from './notificationController.mjs';


const notification = express.Router();

notification.post('/notifications', authenticateUser, sendNotification);

export default notification;
