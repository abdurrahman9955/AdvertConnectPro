
interface ContactState {
    loading: boolean;
    success: string | null;
    error: string | null;
  }
  
  const initialState: ContactState = {
    loading: false,
    success: null,
    error: null,
  };
  
  const contactReducer = (state = initialState, action: any): ContactState => {
    switch (action.type) {
      case 'SUBMIT_CONTACT_REQUEST':
        return { ...state, loading: true, success: null, error: null };
      case 'SUBMIT_CONTACT_SUCCESS':
        return { ...state, loading: false, success: action.payload, error: null };
      case 'SUBMIT_CONTACT_FAILURE':
        return { ...state, loading: false, success: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default contactReducer;
  