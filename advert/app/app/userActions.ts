import { Dispatch } from 'redux';
import { getUserByToken } from '../utils/userToken';
import { getUserById } from '../utils/userId';
import { SetUserNameAction, SET_USER_NAME } from './userActionsType';
import { RootState } from './store';
import { UserAction } from './userActionsType';
import { UserState } from './userActionsType';

export const SET_USER_DATA = 'SET_USER_DATA';

interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: {
    userData: any; 
  };
}

const initialState: UserState = {
  id: '',
  
};

export const setUserData = (userData: any): SetUserDataAction => ({
  type: SET_USER_DATA,
  payload: { userData },
});

export const getUserData = (authToken: string) => async (dispatch: Dispatch) => {
  try {
    const userDataResponse = await getUserByToken(authToken);

    if (userDataResponse.success) {
      const userData = userDataResponse.data;
      //@ts-ignore
      dispatch(setUserData(userData));
    } else {
      console.error('Error fetching user data:', userDataResponse.error);
    }
  } catch (error:any) {
    console.error('Error fetching user data:', error.message);
  }
};

export const setUserName = (userName: string): SetUserNameAction => ({
  type: SET_USER_NAME,
  payload: userName,
});

export const fetchUserData = () => async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
  try {
    //@ts-ignore
    const userId = getState().user.id;
    const userData = await getUserById(userId);
    if (userData.success && userData.data) {
      const userFirstName = userData.data.firstName || 'Guest';
      const userLastName = userData.data.lastName || '';
      const userDisplayName = `${userFirstName} ${userLastName}`.trim();
      dispatch(setUserName(userDisplayName));
    } else {
      console.error('Error fetching user data:', userData.error || 'Unknown error');
    }
  } catch (error:any) {
    console.error('Error fetching user data:', error.message);
  }
};