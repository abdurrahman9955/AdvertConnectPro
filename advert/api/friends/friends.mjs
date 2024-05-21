import express from 'express';
import authenticateUser from './middleware.mjs';
import { checkFriendship } from './friendMiddleware.mjs';
import { acceptFriendRequest, rejectFriendRequest } from './friendController.mjs';


const friends = express.Router();

friends.post('/:friendId/accept', authenticateUser, async (req, res) => {
  try {
    const { friendId } = req.params;

    const isSuccess = await acceptFriendRequest(friendId);

    if (isSuccess) {
      res.json({ success: true, message: 'Friend request accepted successfully' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friends.post('/:friendId/reject', authenticateUser, async (req, res) => {
  try {
    const { friendId } = req.params;

    const isSuccess = await rejectFriendRequest(friendId);

    if (isSuccess) {
      res.json({ success: true, message: 'Friend request rejected successfully' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

friends.get('/:friendId/check', authenticateUser, async (req, res) => {
  try {
    const { friendId } = req.params;

    const isFriend = await checkFriendship(friendId);

    if (isFriend) {
      res.json({ success: true, message: 'Friendship established' });
    } else {
      res.json({ success: false, message: 'Friendship not established' });
    }
  } catch (error) {
    console.error('Error checking friendship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default friends;

