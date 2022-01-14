import { configureStore } from '@reduxjs/toolkit';
import dataTableReducer from './tableDataSlice'

export const store = configureStore({
    reducer: dataTableReducer,
});