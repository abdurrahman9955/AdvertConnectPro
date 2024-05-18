import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  otp: '',
  resendDisabled: false,
};

const RegisterOtpSlice = createSlice({
  name: 'RegisterOTP',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setResendDisabled: (state, action) => {
      state.resendDisabled = action.payload;
    },
  },
});

export const { setEmail, setOtp, setResendDisabled } = RegisterOtpSlice.actions;
export default RegisterOtpSlice.reducer;


