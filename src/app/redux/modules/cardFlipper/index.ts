/* eslint-disable no-param-reassign */
import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const slice = createSlice({
  name: 'cardFlipper',
  initialState,
  reducers: {
    toggleFlipCard: (_, action: Redux.PayloadAction<boolean>) => action.payload,
  },
});

export const { toggleFlipCard } = slice.actions;
export const cardFlipperReducers = slice.reducer;
