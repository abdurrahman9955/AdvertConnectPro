import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateUserSettings(req, res) {
    try {
        const {
            country,
            currency,
            continent,
            state,
            province,
            fullAddress,
            emailAddress,
            phoneNumber
        } = req.body;

        const userId = parseInt(req.headers['user-id']);

        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }

        const existingSettings = await prisma.settings.findUnique({
            where: { userId },
        });

        if (existingSettings) {
            // If settings already exist, update them
            const updatedSettings = await prisma.settings.update({
                where: { userId },
                data: {
                    country,
                    currency,
                    continent,
                    state,
                    province,
                    fullAddress,
                    emailAddress,
                    phoneNumber
                },
            });
            res.status(200).json(updatedSettings);
        } else {
            // If settings don't exist, create them
            const newSettings = await prisma.settings.create({
                data: {
                    userId,
                    country,
                    currency,
                    continent,
                    state,
                    province,
                    fullAddress,
                    emailAddress,
                    phoneNumber
                },
            });
            res.status(201).json(newSettings);
        }
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'An error occurred while updating user settings' });
    }
}

export async function getUserSettings(req, res) {
    try {
        const userId = parseInt(req.headers['user-id']);

        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }

        const userSettings = await prisma.settings.findUnique({
            where: { userId },
        });

        if (!userSettings) {
            return res.status(404).json({ error: 'User settings not found' });
        }

        res.status(200).json(userSettings);
    } catch (error) {
        console.error('Error getting user settings:', error);
        res.status(500).json({ error: 'An error occurred while getting user settings' });
    }
}

export async function deleteUserSettings(req, res) {
    try {
        const userId = parseInt(req.headers['user-id']);

        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }

        await prisma.settings.delete({
            where: { userId },
        });

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting user settings:', error);
        res.status(500).json({ error: 'An error occurred while deleting user settings' });
    }
}
