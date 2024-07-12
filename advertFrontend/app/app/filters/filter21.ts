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

const filterSlice21 = createSlice({
  name: 'filter21',
  initialState,
  reducers: {
    updateFilter21: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter21: (state) => {
      return initialState; 
    },
  },
});

export const { updateFilter21, resetFilter21 } = filterSlice21.actions;
export default filterSlice21.reducer;
