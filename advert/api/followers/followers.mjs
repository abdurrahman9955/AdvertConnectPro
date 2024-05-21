import express from 'express';
import { getFollowers,followUser, unfollowUser, getFollowing, getFollowerCount, getFollowingCount,checkFollowingStatus } from './followersController.mjs';

const followers = express.Router();

followers.get('/followers/:userId',  getFollowerCount);
followers.get('/following/:userId',  getFollowingCount);
followers.get('/followers',  getFollowers);
followers.get('/following',  getFollowing);
followers.post('/:userId/follow', followUser);
followers.delete('/:userId/unfollow', unfollowUser);
followers.get('/followingStatus/:userId',  getFollowerCount);


export default followers;
