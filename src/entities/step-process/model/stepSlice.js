import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../../../shared/api';
const initialState = {
    status: 'idle', // loading, error, idle
    brands: [], // массив марок авто
    brand: [], // Выбранная марка авто
    models: [], // Модели выбранного бренда
    model: [], // Выбранная модель авто
    bodys: [], // Выбранный кузов
    body: [], // Выбранный кузов
    zones: [], // зоны для рендеригна карточек зон 
    activeZones:[], // активные зоны, только название. для синхронизации с картчоками зон
    levels: [], // Уровни, доступны после выбора кузова
    level: null, // выбранный уровень, по умолчанию Maximum
};

export const fetchBrands = createAsyncThunk(
    'step/fetchBrands',
    async () => {
        const request = useHttp();
        return await request('http://localhost:5000/brands/');
    }
);

export const fetchModels = createAsyncThunk(
    'step/fetchModels',
    async () => {
        const request = useHttp();
        return await request('http://localhost:5000/models/');
    }
);

const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        selectBrand: (state, action) => {
            state.brand = action.payload;
            state.models = action.payload.models;
        },
        selectModel: (state, action) => {
            state.model = action.payload;
            state.bodys = action.payload.bodys;
        },
        selectBody: (state, action) => {
            state.body = action.payload;
            state.levels = action.payload.levels;
            state.level = action.payload.levels[0];
            state.zones = action.payload.levels[0].zones;
            state.activeZones = action.payload.levels[0].zones.map(zone => zone.zone) // ok
        },
        removeZone: (state, action) => {
            state.activeZones = state.activeZones.filter(zone => zone !== action.payload);
        },
        setZone: (state, action) => {
            state.activeZones.push(action.payload); // черновик
        },
        setLevel: (state, action) => {
            const [level] = state.levels.filter((level) => level.level === action.payload);
            state.level = level;
        },
    },
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
        builder
            .addCase(fetchModels.pending, (state) => {
                
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                state.models = action.payload;
            })
            .addCase(fetchModels.rejected, (state) => {
                
            })

            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = stepSlice;

export const {selectBrand, selectModel, selectBody, removeZone, setZone, setLevel} = actions;

export default reducer;