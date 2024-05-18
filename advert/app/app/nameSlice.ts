import { Dispatch } from 'redux';
import { getUserById } from '../utils/userId';

enum ActionTypes {
  SET_USER_NAME = 'SET_USER_NAME',
}

interface UserName {
    firstName: string;
    lastName: string;
  }
  
  interface RootState {
    user: {
      id: string;
     
    };
    userName: UserName;
    
  }
  


interface SetUserNameAction {
  type: ActionTypes.SET_USER_NAME;
  payload: UserName;
}

export const setUserName = (userName: UserName): SetUserNameAction => ({
  type: ActionTypes.SET_USER_NAME,
  payload: userName,
});

export const fetchUserData = () => async (dispatch: Dispatch<SetUserNameAction>, getState: () => RootState) => {
  try {
    const userId = getState().user.id;
    const userData = await getUserById(userId as any);
    if (userData.success && userData.data) {
      const { firstName, lastName } = userData.data;
      dispatch(setUserName({ firstName, lastName }));
    } else {
      console.error('Error fetching user data:', userData.error || 'Unknown error');
    }
  } catch (error:any) {
    console.error('Error fetching user data:', error.message);
  }
};


const initialState: RootState = {
  user: { id: '' },
  userName: { firstName: '', lastName: '' },
};

const userNameReducer = (state = initialState, action: SetUserNameAction): RootState => {
  switch (action.type) {
    case ActionTypes.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    
    default:
      return state;
  }
};

export default userNameReducer;

