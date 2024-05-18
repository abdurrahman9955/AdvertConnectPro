
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFeedback = async (req, res) => {
  try {

    if ( user) {
      await prisma.feedback.delete({
        where: {
          id: req.feedback.id,
        },
      });

      return res.status(200).json({ message: 'Feedback deleted successfully' });
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getFeedbacks, deleteFeedback };


