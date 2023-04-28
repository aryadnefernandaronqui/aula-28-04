import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../user';
import { RootState } from '../..';

const adapter = createEntityAdapter<IUser>({
  selectId: (user) => user.email,
});

const initialState = adapter.getInitialState();

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: adapter.addOne,
    updateUser: adapter.updateOne,
    removeUser: adapter.removeOne,
  },
});

export const usersReducer = slice.reducer;
export const usersActions = slice.actions;
export const usersSelectors = adapter.getSelectors((state: RootState) => state.users);
