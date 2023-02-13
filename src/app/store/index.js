import { configureStore } from '@reduxjs/toolkit';
import {stepReducer} from '../../entities/step-process/';


const store = configureStore({
    reducer:  {stepReducer},
    devTools: process.env.NODE_ENV !== 'production',
  });

export default store;