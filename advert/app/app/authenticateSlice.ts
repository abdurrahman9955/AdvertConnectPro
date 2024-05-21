import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: Cookies.get('isAuthenticated') === 'true', 
};

const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      Cookies.set('isAuthenticated', action.payload.toString(), { path: '/', expires: 7 });
    },
  },
});

export const { setAuthenticated } = authenticateSlice.actions;
export default authenticateSlice.reducer;
