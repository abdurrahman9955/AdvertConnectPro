import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    setContacts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setContacts } = contactSlice.actions;
export default contactSlice.reducer;

