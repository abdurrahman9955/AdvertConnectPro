import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
//import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import configurePassport from './auth/configurePassport.mjs';
import { Server } from 'socket.io';

import registerRoutes from './auth/register/route.mjs';
import loginRoutes from './auth/login/route.mjs';
import resetPasswordRouter from './auth/forgotPassword/route.mjs';

import feedbackRoutes from './feedbacks/feedback.mjs';
import contactRoutes from './contacts/contacts.mjs';
import settingsRouter from './settings/settings.mjs';

import images from './images/images.mjs';
import banner from './banner/banner.mjs';
import videos from './videos/videos.mjs';
import profile from './profile/profile.mjs';

import dislikeBanners from './dislikes/dislikeBanners.mjs';
import dislikeImages from './dislikes/dislikeImages.mjs';
import dislikeVideo from './dislikes/dislikeVideo.mjs';

import likeBanner from './likes/likeBanner.mjs';
import likeImages from './likes/likeImages.mjs';
import likeVideo from './likes/likeVideo.mjs';

import favoriteBanners from './favorite/favoriteBanners.mjs';
import favoriteImages from './favorite/favoriteImages.mjs';
import favoriteVideo from './favorite/favoriteVideo.mjs';

import shareBanners from './share/shareBanners.mjs';
import shareImages from './share/shareImages.mjs';
import shareVideo from './share/shareVideo.mjs';

import rateBanners from './rating/ratingBanners.mjs';
import rateImages from './rating/ratingImages.mjs';
import rateVideo from './rating/ratingVideo.mjs';

import commentBanner from './comments/commentBanner.mjs';
import commentImages from './comments/commentImages.mjs';
import commentVideo from './comments/commentVideo.mjs';

import friends from './friends/friends.mjs';
import followers from './followers/followers.mjs';

import downloadBanner from './downloads/downloadBanner.mjs';
import downloadImages from './downloads/downloadImages.mjs';
import downloadVideo from './downloads/downloadVideo.mjs';

import notification from './auth/notifications/notifications.mjs';
import friendsVideo from './videoCall/videoCall.mjs';
import friendsVoice from './voiceCall/voiceCall.mjs';

import friendChats from './friendChats/friendChats.mjs';
import orderRequest from './orderRequest/orderRequest.mjs';
import friendProfile from './friendProfile/friendProfile.mjs';

import facebookAuthRegister from './facebookAuth/facebookAuthRegister.mjs';
import facebookAuthLogin from './facebookAuth/facebookAuthLogin.mjs';
import googleAuthLogin from './googleAuth/googleAuthLogin.mjs';
import googleAuthRegister from './googleAuth/googleAuthRegister.mjs';

import AdminAccess from './admin/adminAccess.mjs';
import AdminLogin from './admin/adminLogin.mjs';
import AdminRegister from './admin/adminRegister.mjs';

import Employee from './employee/employee.mjs';
import EmployeeAccess from './employee/employeeAccess.mjs';
import EmployeeLogin from './employee/employeeLogin.mjs';

import EmployeeRegister from './employee/employeeRegister.mjs';
import logoutRoute from './auth/logout/logout.mjs';
import userTokenRoutes from './userId/userToken.mjs';

import checkUserId from './userId/UsersId.mjs';
import bannerOrder from './orderRequest/bannerOrder.mjs';
import videosOrder from './orderRequest/videosOrder.mjs';

import routerOtpLogin from './auth/verify/verifyLogin.mjs';
import routerOtpReset from './auth/verify/verifyResetPassword.mjs';
import routerOtpVerification from './auth/verify/verifyRegister.mjs';

import getCurrentUser from './userId/userToken.mjs';
import following from './following/following.mjs';

import routerHealth from './health/health.mjs';

import routerContactUs from './contacts/contactMiddleware.mjs';
import routerProducts from './product/product.mjs';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));

/*
app.use(
  cors({
    origin:'https://advertconnectpro.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders:['Content-Type', 'Authorization'],
    preflightContinue: true,
  })
);*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','https://advertconnectpro.com');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204); 
  } else {
    next(); 
  }
});


prisma.$connect().then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.error('Error connecting to the database', err);
});

const server = createServer(app);
const io = new Server(server);
const PORT = 3500 || process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
    },
  })
);

const configuredPassport = configurePassport();
app.use(configuredPassport.initialize());
app.use(configuredPassport.session());

app.use(passport.initialize());
app.use(passport.session());

app.use('/health', routerHealth);

app.use('/auth/login', loginRoutes);
app.use('/auth/register', registerRoutes);
app.use('/auth/forgotPassword', resetPasswordRouter);
app.use('/product', routerProducts);

app.use('/auth/verify', routerOtpLogin);
app.use('/auth/verify', routerOtpVerification);
app.use('/auth/verify', routerOtpReset);

app.use('/feedbacks', feedbackRoutes);
app.use('/contacts', contactRoutes);
app.use('/settings', settingsRouter);

app.use('/images', images);
app.use('/banner', banner);
app.use('/videos', videos);

app.use('/profile', profile);
app.use('/friends', friends);
app.use('/auth/notifications', notification);

app.use('/followers',followers);
app.use('/orderRequest',bannerOrder);
app.use('/orderRequest',videosOrder);

app.use('/downloads', downloadBanner);
app.use('/downloads', downloadImages);
app.use('/downloads', downloadVideo)

app.use('/videoCall', friendsVideo);
app.use('/voiceCall', friendsVoice);
app.use('/friendChats', friendChats);

app.use('/orderRequest', orderRequest);
app.use('/friendProfile', friendProfile);
app.use('/facebookAuth', facebookAuthRegister);
app.use('/facebookAuth', facebookAuthLogin);

app.use('/googleAuth', googleAuthRegister);
app.use('/googleAuth', googleAuthLogin);
app.use('/admin', AdminAccess);
app.use('/admin', AdminLogin);

app.use('/admin', AdminRegister);
app.use('/employee', Employee);
app.use('/employee', EmployeeAccess);

app.use('/employee', EmployeeLogin);
app.use('/employee', EmployeeRegister);
app.use('userId', userTokenRoutes);

app.use('/following', following);
app.use('/userId', getCurrentUser);

app.use('/contacts', routerContactUs);
app.use('/userId', checkUserId);
app.use('/auth/logout', logoutRoute);

app.use('/comments', commentBanner);
app.use('/comments', commentImages);
app.use('/comments', commentVideo);

app.use('/dislikes', dislikeBanners);
app.use('/dislikes', dislikeImages);
app.use('/dislikes', dislikeVideo);

app.use('/favorite', favoriteBanners);
app.use('/favorite', favoriteImages);
app.use('/favorite', favoriteVideo);

app.use('/likes', likeBanner);
app.use('/likes', likeImages);
app.use('/likes', likeVideo);

app.use('/rating', rateBanners);
app.use('/rating', rateImages);
app.use('/rating', rateVideo);

app.use('/share', shareBanners);
app.use('/share', shareImages);
app.use('/share', shareVideo);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect(); 
  process.exit();
});



