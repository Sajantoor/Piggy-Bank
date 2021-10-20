import {configureStore} from '@reduxjs/toolkit';
import transactionReducer from './Slice';

const store = configureStore({
  reducer: transactionReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
