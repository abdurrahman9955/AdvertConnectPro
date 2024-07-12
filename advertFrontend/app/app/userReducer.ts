import { SET_USER_DATA } from './userActions';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload.userData,
      };
    default:
      return state;
  }
};

export default userReducer;
