import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { rootReducers } from './modules/rootReducer';

const isDev = process.env.NODE_ENV !== 'production';
const key = 'dnr-growdev-modbackend';
// local storage
const rootConfig = {
  key: isDev ? `dev:${key}` : key,
  storage,
};

export const persistedReducer = persistReducer(rootConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: isDev,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

//
export const storePersisted = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
