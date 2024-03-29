import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../../../shared/api';
const initialState = {
    status: 'idle', // loading, error, idle // состояние загрузки моделей
    statusResult: 'idle', // loading, error, idle // состояние загрузки результата
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
    result: null,
};

export const fetchBrands = createAsyncThunk(
    'step/fetchBrands',
    async () => {
        const request = useHttp();
        return await request('http://localhost:3005/brands/');
        //return await request('https://stoiidlars.ru/brands/');
    }
);

export const fetchModels = createAsyncThunk(
    'step/fetchModels',
    async (payload) => {
        const request = useHttp();
        //return await request(`https://stoiidlars.ru/models/?id=${payload._id}`);
          return await request(`http://localhost:3005/models/?id=${payload._id}`);

    }
);

export const fetchPrice = createAsyncThunk(
    'step/fetchPrice',
    async ( data ) => {
        const request = useHttp();
        return await request('https://stoiidlars.ru/materials/', 'POST',  JSON.stringify({data}) );
    }
);

const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        selectBrand: (state, action) => {
            // Сбросим весь выбор после смены авто
            if(state.brands.length){
                state.models = [];
                state.model = null;
                state.bodys = [];
                state.body = null;
                state.zones = []
                state.activeZones = [];
                state.levels = []; 
                state.level = null;
                state.result = null;
            }
            state.brand = action.payload;
            state.models = action.payload?.models || [];
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
            state.result = null;
        },
        selectBody: (state, action) => {
            state.body = action.payload; // активный кузов
            state.levels = action.payload.levels; // уровни
            state.level = action.payload.levels[0]; // уровень Maximum по умолчанию
            state.zones = action.payload.levels[0].zones; // список зон обработки для первоначального рендеринга(для всех уровней одинаковые поэтому берем у первого)
            state.activeZones = action.payload.levels[0].zones.map((zone) => zone.zone) // по умолчанию все зоны активны, контролируемый список с state.zones
            state.result = null;
        },
        removeZone: (state, action) => {
            state.result = null;
            state.activeZones = state.activeZones.filter(zone => zone !== action.payload);
        },
        setZone: (state, action) => {
            state.result = null;
            state.activeZones.push(action.payload); // ok
        },
        setLevel: (state, action) => {
            const [level] = state.levels.filter(({level}) => level === action.payload);
            state.result = null;
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
            .addCase(fetchModels.pending, () => { 
                // FIX: Добавить loader
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                state.models = action.payload;
            })
            .addCase(fetchModels.rejected, () => {
                console.log('Ошибка загрузки данных');
            })

        builder
            .addCase(fetchPrice.pending, (state) => {
                state.statusResult = 'loading';
            })
            .addCase(fetchPrice.fulfilled, (state, action) => {
                state.statusResult = 'idle';
                state.result = JSON.parse(action.payload);
            })
            .addCase(fetchPrice.rejected, (state) => {
                state.statusResult = 'error';
            })

            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = stepSlice;

export const {selectBrand, selectModel, selectBody, removeZone, setZone, setLevel} = actions;

export default reducer;