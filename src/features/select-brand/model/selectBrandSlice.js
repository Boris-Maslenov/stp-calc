import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {useHttp} from '../../../shared/lib/useHttp';
const initialState = {
      activeBrand: null,
};

const brendSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrand: (state, action) => {
            state.activeBrand = action.payload;
        }
    },
});

const {reducer, actions} = brendSlice;

export const {setBrand} = actions;

export default reducer;