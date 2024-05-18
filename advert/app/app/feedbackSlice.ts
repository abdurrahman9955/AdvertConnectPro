
interface FeedbackState {
    loading: boolean;
    success: string | null;
    error: string | null;
  }
  
  const initialState: FeedbackState = {
    loading: false,
    success: null,
    error: null,
  };
  
  const FeedbackReducer = (state = initialState, action: any): FeedbackState => {
    switch (action.type) {
      case 'SUBMIT_FEEDBACK_REQUEST':
        return { ...state, loading: true, success: null, error: null };
      case 'SUBMIT_FEEDBACK_SUCCESS':
        return { ...state, loading: false, success: action.payload, error: null };
      case 'SUBMIT_FEEDBACK_FAILURE':
        return { ...state, loading: false, success: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default FeedbackReducer;
  
