import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {
  try {

    await prisma.contact.delete({
      where: {
        id: req.contact.id,
      },
    });

    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getContacts, deleteContact };

