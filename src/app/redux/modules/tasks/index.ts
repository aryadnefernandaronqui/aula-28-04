import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';
import { TTask } from '@/@types/app';
import { RootState } from '../..';

const adapter = createEntityAdapter<TTask>({
  selectId: (task) => task.id,
  sortComparer: (a, b) => {
    const aDate = dayjs(a.date);
    const bDate = dayjs(b.date);
    const daysDiff = aDate.diff(bDate, 'day');
    if (daysDiff !== 0) return daysDiff;

    const [aHour, aMinute] = a.hour.split(':');
    const [bHour, bMinute] = b.hour.split(':');
    const hoursDiff = Number(aHour) - Number(bHour);
    if (hoursDiff !== 0) {
      return hoursDiff;
    }
    return Number(aMinute) - Number(bMinute);
  },
});

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    addManyTasks: adapter.addMany,
    updateTask: adapter.updateOne,
    removeTask: adapter.removeOne,
    clearTasks: () => adapter.getInitialState(),
  },
});

export const taskActions = slice.actions;
export const taskReducers = slice.reducer;
export const selectorTasks = adapter.getSelectors<RootState>(({ tasks }) => tasks);
