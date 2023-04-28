import { combineReducers } from '@reduxjs/toolkit';
import { taskReducers } from './tasks';
import { themeReducers } from './theme';
import { userReducer } from './user';
import { cardFlipperReducers } from './cardFlipper';
import { usersReducer } from './users';

export const rootReducers = combineReducers({
  theme: themeReducers,
  user: userReducer,
  users: usersReducer,
  tasks: taskReducers,
  cardFlipper: cardFlipperReducers,
});

export type typeReducers = ReturnType<typeof rootReducers>;
export type typeActions = typeof rootReducers;
