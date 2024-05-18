import express from 'express';
import { WebSocketServer }  from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const friendsVoice = express.Router();
const wss = new WebSocketServer({ noServer: true });

const activeVoiceMeetings = new Map();

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'offer' || data.type === 'answer' || data.type === 'ice-candidate') {
      handleSignalingData(data, ws);
    }

    if (data.type === 'chat') {
      broadcastChatMessage(data, ws);
    }
  });

  ws.on('close', () => {
    handleParticipantLeaving(ws);
  });
});

friendsVoice.post('/start', async (req, res) => {
  try {
    const meetingLink = uuidv4();
    const meetingWss = new WebSocketServer({ noServer: true });

    meetingWss.on('connection', (ws) => {
      ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'offer' || data.type === 'answer' || data.type === 'ice-candidate') {
          handleSignalingData(data, ws);
        }

        if (data.type === 'chat') {
          broadcastChatMessage(data, ws);
        }
      });

      ws.on('close', () => {
        handleParticipantLeaving(ws);
      });
    });

    activeVoiceMeetings.set(meetingLink, meetingWss);

    res.json({ meetingLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friendsVoice.get('/:meetingLink', (req, res) => {
  const { meetingLink } = req.params;
  const meetingWss = activeVoiceMeetings.get(meetingLink);

  if (!meetingWss) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  const { upgradeReq } = req;

  meetingWss.handleUpgrade(upgradeReq, req.socket, Buffer.alloc(0), (ws) => {
    meetingWss.emit('connection', ws, upgradeReq);
  });
});

function handleSignalingData(data, sender) {
  const meetingWss = activeVoiceMeetings.get(data.meetingLink);
  if (!meetingWss) return;

  meetingWss.clients.forEach((participant) => {
    if (participant !== sender) {
      participant.send(JSON.stringify(data));
    }
  });
}

function broadcastChatMessage(data, sender) {
  const meetingWss = activeVoiceMeetings.get(data.meetingLink);
  if (!meetingWss) return;

  meetingWss.clients.forEach((participant) => {
    participant.send(JSON.stringify(data));
  });
}


async function handleParticipantLeaving(leavingParticipant) {
  activeVoiceMeetings.forEach(async (meetingWss) => {
    meetingWss.clients.forEach(async (participant) => {
      if (participant !== leavingParticipant) {
        const userId = participant.userId;
        await prisma.user.update({
          where: { id: userId },
          data: { 
            status: "Online",
            lastMeetingTimestamp: new Date(),
          },
        });
      }
    });
  });
}

function sendNotificationToUser(userId, title, message) {
  const userSocket = Array.from(wss.clients).find((client) => client.userId === userId);
  if (userSocket) {
    userSocket.send(JSON.stringify({ type: 'notification', title, message }));
  }
}

export default friendsVoice;



