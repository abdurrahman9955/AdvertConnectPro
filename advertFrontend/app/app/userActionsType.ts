

export const SET_USER_NAME = 'SET_USER_NAME';

export interface SetUserNameAction {
  type: typeof SET_USER_NAME;
  payload: string;
}

export type UserAction = SetUserNameAction;

export interface UserState {
    id: string;
   
}

