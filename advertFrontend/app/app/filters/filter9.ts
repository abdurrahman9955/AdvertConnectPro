import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  city: string;
  country: string;
  state: string;
  fullAddress: string;
  minPrice:number | string;
  maxPrice: number | string;
  company: string;
  name: string;
  types: string;
  categories: string;
}

const initialState: FilterState = {
  city: '',
  country: '',
  state: '',
  fullAddress: '',
  minPrice:0,
  maxPrice:1000000000,
  company: '',
  name: '',
  types: '',
  categories: '',
};

const filterSlice9 = createSlice({
  name: 'filter9',
  initialState,
  reducers: {
    updateFilter9: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter9: (state) => {
      return initialState; 
    },
  },
});

export const { updateFilter9, resetFilter9 } = filterSlice9.actions;
export default filterSlice9.reducer;
