import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getImages } from '@/app/utils/images';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  //@ts-ignore
    const response = await getImages();
    return response; 
  });

interface Image {
    id: number;
    mediaType: string;
    mediaUrl: string;
    product?: string;
    types?: string;
    categories: string;
    phoneNumber?: string;
    phoneCode?: string;
    price?: number;
    currency?: string;
    country?: string;
    state?: string;
    province?: string;
    city?: string;
    fullAddress?: string;
    emailAddress?: string;
    productName?: string;
    companyLink?: string;
    companyName?: string;
    description?: string;
    Profile?: {
      photoUrl: string;
    };
  }

interface ProductsState {
  data: Image[];
  loading: boolean;
  error: string | null; 
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

const ImagesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default ImagesSlice.reducer;
