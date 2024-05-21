import express from 'express';

const logoutRoute = express.Router();

logoutRoute.post('/logout', async (req, res) => {
  try {
    req.session.destroy();

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default logoutRoute;

