
interface Feedback {
  name: string;
  reason: string;
  statement: string;
  rating: number;
  }
  
  
  interface ApiResponse {
    message: string;
  }
  
  export const submitFeedbackRequest = (feedbackData: Feedback) => ({
      type: 'SUBMIT_FEEDBACK_REQUEST',
      payload:feedbackData,
    });
    
    export const submitFeedbackSuccess = (responseData: ApiResponse) => ({
      type: 'SUBMIT_FEEDBACK_SUCCESS',
      payload: responseData,
    }); 
  
    
    export const submitFeedbackFailure = (error: string) => ({
      type: 'SUBMIT_FEEDBACK_FAILURE',
      payload: error,
    });
  
    
    
  
  