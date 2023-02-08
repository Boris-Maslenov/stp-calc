import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {useHttp} from '../../../shared/lib/useHttp';
const initialState = {
    status: '',
    
};

export const fetchBrands = createAsyncThunk(
    'brand/fetchBrands',
    async () => {
        const request = useHttp();
        return await request('');
    }
);

const brendSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrand: (state, action) => {}
    },
    extraReducers: builder => {}
});