import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {useHttp} from '../shared/lib/useHttp';
const initialState = {
    status: '', // loading, error, idle
    brands: [],
};

export const fetchBrands = createAsyncThunk(
    'home/fetchBrands',
    async () => {
        const request = useHttp();
        return await request('http://localhost:5000/brands/');
    }
);

const brendSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state) => {
                state.status = 'error';
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = brendSlice;

export default reducer;

