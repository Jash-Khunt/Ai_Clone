import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import worksheetReducer from './slices/worksheetSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    worksheet: worksheetReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
