import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../../../shared/api';
const initialState = {
    status: 'idle', // loading, error, idle
    brands: [], // массив марок авто
    brand: null, // Выбранная марка авто
    models: [], // Модели выбранного бренда
    model: null, // Выбранная модель авто
    bodys: [], // Выбранный кузов
    body: null, // Выбранный кузов
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
            // Сбросим весь выбор после смены авто
            // ИСПРАВИТЬ: сделать контролируемый autocomlite (bags: при сбросе остается старое значение)
            if(state.brands.length){
                state.models = [];
                state.model = null;
                state.bodys = [];
                state.body = null;
                state.zones = []
                state.activeZones = [];
                state.levels = []; 
                state.level = null;
            }
            state.brand = action.payload;
            state.models = action.payload.models;
        },
        selectModel: (state, action) => {
            state.model = action.payload;
            state.bodys = action.payload.bodys;
            // при выборе модели нужно очистить вывод уровней и зон
            state.body = null;
            state.zones = []
            state.activeZones = [];
            state.levels = []; 
            state.level = null;
        },
        selectBody: (state, action) => {
            //ИСПРАВИТь: нужно убрать лишние рендеры при выборе того же самого типа кузова!
            state.body = action.payload; // активный кузов
            state.levels = action.payload.levels; // уровни
            state.level = action.payload.levels[0]; // уровень Maximum по умолчанию
            state.zones = action.payload.levels[0].zones; // список зон обработки для первоначального рендеринга(для всех уровней одинаковые поэтому берем у первого)
            state.activeZones = action.payload.levels[0].zones.map((zone) => zone.zone) // по умолчанию все зоны активны, контролируемый список с state.zones
        },
        removeZone: (state, action) => {
            state.activeZones = state.activeZones.filter(zone => zone !== action.payload);
        },
        setZone: (state, action) => {
            state.activeZones.push(action.payload); // черновик
        },
        setLevel: (state, action) => {
            const [level] = state.levels.filter(({level}) => level === action.payload);
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