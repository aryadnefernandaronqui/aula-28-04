/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTask } from '@/@types/app';

export interface IUser {
  name: string;
  email: string;
  password: string;
  remember?: boolean;
  tasks: TTask[];
}

const initialState: IUser = {
  name: '',
  email: '',
  password: '',
  remember: false,
  tasks: [],
};

const isDev = process.env.NODE_ENV !== 'production';
const key = 'dnr-growdev-modbackend-user';
const keySession = isDev ? `dev:${key}` : key;

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<IUser>) => {
      sessionStorage.setItem(keySession, JSON.stringify(action.payload));
      return action.payload;
    },
    isLogged: () => {
      const user = sessionStorage.getItem(keySession);
      if (user) {
        return JSON.parse(user);
      }
      return initialState;
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.name = action.payload.name!;
      state.email = action.payload.email!;
      return state;
    },
    logout: () => {
      sessionStorage.removeItem(keySession);
      return initialState;
    },
    addNewTask: (state, action: PayloadAction<TTask>) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<TTask>) => {
      const task = action.payload;
      const posicao = state.tasks.findIndex((item) => item.id === task.id);

      state.tasks[posicao] = task;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const posicao = state.tasks.findIndex((item) => item.id === id);

      state.tasks.splice(posicao, 1);
    },
  },

});

export const userReducer = slice.reducer;
export const userActions = slice.actions;
