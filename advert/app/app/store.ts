'use client'
import { combineReducers } from 'redux'; 
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authSlice from './loginSlice';
import LoginOtpSlice from './LoginOTP';
import RegisterOtpSlice from './registerOtp';
import authenticateSlice from './authenticateSlice';
import contactReducer from './contactSlice';
import contactSlice from './contacts';
import feedbackSlice from './feedbacks';
import userReducer from './userReducer';
import tokenSlice from './tokenSlice';
import userNameReducer from './nameSlice';
import ImagesSlice from './ImagesSlice';
import filterSlice from './filterSlice';
import filter1 from './filters/filter1';
import filter2 from './filters/filter2';
import filter3 from './filters/filter3';
import filter4 from './filters/filter4';
import filter5 from './filters/filter5';
import filter6 from './filters/filter6';
import filter7 from './filters/filter7';
import filter8 from './filters/filter8';
import filter9 from './filters/filter9';
import filter10 from './filters/filter10';
import filter11 from './filters/filter11';
import filter12 from './filters/filter12';
import filter13 from './filters/filter13';
import filter14 from './filters/filter14';
import filter15 from './filters/filter15';
import filter16 from './filters/filter16';
import filter17 from './filters/filter17';
import filter18 from './filters/filter18';
import filter19 from './filters/filter19';
import filter20 from './filters/filter20';
import filter21 from './filters/filter21';
import filter22 from './filters/filter22';
import filter23 from './filters/filter23';
import filter24 from './filters/filter24';
import filter25 from './filters/filter25';
import filter26 from './filters/filter26';
import filter27 from './filters/filter27';
import filter28 from './filters/filter28';
import filter29 from './filters/filter29';
import filter30 from './filters/filter30';
import filter31 from './filters/filter31';
import filter32 from './filters/filter32';
import filter33 from './filters/filter33';
import filter34 from './filters/filter34';
import filter35 from './filters/filter35';
import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  LoginOTP: LoginOtpSlice,
  RegisterOtp: RegisterOtpSlice,
  authenticate: authenticateSlice,
  contact: contactReducer,
  contacts: contactSlice,
  feedback: feedbackSlice,
  userToken: userReducer,
  name:userNameReducer,
  token:tokenSlice,
  products:ImagesSlice,
  filter:filterSlice,
  filter1:filter1,
  filter2:filter2,
  filter3:filter3,
  filter4:filter4,
  filter5:filter5,
  filter6:filter6,
  filter7:filter7,
  filter8:filter8,
  filter9:filter9,
  filter10:filter10,
  filter11:filter11,
  filter12:filter12,
  filter13:filter13,
  filter14:filter14,
  filter15:filter15,
  filter16:filter16,
  filter17:filter17,
  filter18:filter18,
  filter19:filter19,
  filter20:filter20,
  filter21:filter21,
  filter22:filter22,
  filter23:filter23,
  filter24:filter24,
  filter25:filter25,
  filter26:filter26,
  filter27:filter27,
  filter28:filter28,
  filter29:filter29,
  filter30:filter30,
  filter31:filter31,
  filter32:filter32,
  filter33:filter33,
  filter34:filter34,
  filter35:filter35,
  search:searchSlice
  
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export default store;
