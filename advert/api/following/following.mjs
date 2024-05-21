import express from 'express';
import {followUser, unfollowUser, getFollowerCount, getFollowingCount } from './followingController.mjs';

const following = express.Router();

following.get('/followers',  getFollowerCount);
following.get('/following',  getFollowingCount);
following.post('/follow', followUser);
following.delete('/unfollow', unfollowUser);


export default following;

