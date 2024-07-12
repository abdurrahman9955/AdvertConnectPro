
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Feedback {
  name: string;
  reason: string;
  statement: string;
  rating: number;
}


interface FeedbackState {
  feedbacks: Feedback[];
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    getFeedbacksSuccess: (state, action: PayloadAction<Feedback[]>) => {
      state.feedbacks = action.payload;
      state.error = null;
    },
    getFeedbacksFailure: (state, action: PayloadAction<string>) => {
      state.feedbacks = [];
      state.error = action.payload;
    },
    submitFeedbackSuccess: (state, action: PayloadAction<Feedback>) => {
      state.feedbacks.push(action.payload);
      state.error = null;
    },
    submitFeedbackFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  getFeedbacksSuccess,
  getFeedbacksFailure,
  submitFeedbackSuccess,
  submitFeedbackFailure,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;


