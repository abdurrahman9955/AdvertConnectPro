import express from 'express';
import { processAndSaveImage, deleteImage, editImage, getImages, getImage, getImagesByProductId, getImageByProfileId } from './imageController.mjs';

const images = express.Router();

images.post('/upload',  processAndSaveImage);
images.delete('/delete/:productId',  deleteImage);
images.put('/edit/:id', editImage);
images.get('/getImages',  getImages); 
images.get('/getImage',  getImage);
images.get('/getImagesById',  getImagesByProductId);
images.get('/getImagesByProfileId',  getImageByProfileId);

export default images;

