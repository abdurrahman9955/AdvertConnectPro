import express from 'express';
import { processAndSaveVideo, deleteVideo, editVideo, getVideos, getVideo, getVideosByProductId, getVideoByProfileId } from './videosController.mjs';

const videos = express.Router();

videos.get('/getVideos',  getVideos);
videos.post('/upload',  processAndSaveVideo);
videos.delete('/delete/:productId',  deleteVideo);
videos.put('/edit/:id',  editVideo);
videos.get('/getVideo',  getVideo);
videos.get('/getVideosById',  getVideosByProductId);
videos.get('/getVideosByProfileId',  getVideoByProfileId);

export default videos;


