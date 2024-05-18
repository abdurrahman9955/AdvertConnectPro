import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', 
};

const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem('isAuthenticated', action.payload.toString()); 
    },
  },
});

export const { setAuthenticated } = authenticateSlice.actions;
export default authenticateSlice.reducer;
