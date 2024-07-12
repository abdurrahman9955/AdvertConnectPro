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

const filterSlice29 = createSlice({
  name: 'filter29',
  initialState,
  reducers: {
    updateFilter29: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter29: (state) => {
      return initialState; 
    },
  },
});

export const { updateFilter29, resetFilter29 } = filterSlice29.actions;
export default filterSlice29.reducer;
