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

const filterSlice16 = createSlice({
  name: 'filter16',
  initialState,
  reducers: {
    updateFilter16: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter16: (state) => {
      return initialState; 
    },
  },
});

export const { updateFilter16, resetFilter16 } = filterSlice16.actions;
export default filterSlice16.reducer;
