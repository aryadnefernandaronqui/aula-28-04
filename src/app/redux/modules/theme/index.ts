/* eslint-disable no-param-reassign */
import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = 'dark';

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: Redux.PayloadAction<string>) => action.payload,
  },
});

export const { setTheme } = slice.actions;
export const themeReducers = slice.reducer;
