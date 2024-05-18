import express from 'express';
import { getUserSettings, updateUserSettings, deleteUserSettings } from './settingsController.mjs';

const settingsRouter = express.Router();

settingsRouter.get('/settings', getUserSettings);
settingsRouter.post('/settings', updateUserSettings);
settingsRouter.delete('/settings', deleteUserSettings);

export default settingsRouter;


