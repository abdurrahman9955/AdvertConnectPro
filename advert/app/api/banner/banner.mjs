import express from 'express'; 
import { editBanner, deleteBanner, processAndSaveBanner, getBanners, getBanner, getBannerByProductId, getBannerByProfileId } from './bannerController.mjs';

const banner = express.Router();

banner.get('/getBanners',  getBanners);
banner.get('/getBanner',  getBanner);
banner.post('/upload', processAndSaveBanner);
banner.delete('/delete/:productId', deleteBanner);
banner.put('/edit/:id',  editBanner);
banner.get('/getBannerById',  getBannerByProductId);
banner.get('/getBannerByProfileId',  getBannerByProfileId);


export default banner;


