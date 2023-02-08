import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from '../../widgets/calculatorSlice';
import brandReducer from '../../features/select-brand/model/selectBrandSlice';

const store = configureStore({
    reducer:  {calculatorReducer, brandReducer},
    devTools: process.env.NODE_ENV !== 'production',
  });

export default store;