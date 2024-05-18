import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  otp: '',
  resendDisabled: false,
};

const LoginOtpSlice = createSlice({
  name: 'LoginOTP',
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

export const { setEmail, setOtp, setResendDisabled } = LoginOtpSlice.actions;
export default LoginOtpSlice.reducer;



