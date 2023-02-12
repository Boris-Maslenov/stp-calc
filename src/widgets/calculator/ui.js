import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, selectBrand, selectModel, selectBody, removeZone, setZone } from '../../entities/step/';


import { Autocomplete, Slider, ZoneLabel } from '../../shared';
import { Step } from "../../entities/step/";

const IMG_URL = 'https://stpshopnn.ru/wp-content/brands/';
const BODYS_URL = 'https://stpshopnn.ru/wp-content/bodys/';
const popularBrands = [
    {
        name: 'Chevrolet',
        img: `${IMG_URL}chevrolet.png`,
    },
    {
        name: 'Ford',
        img: `${IMG_URL}ford.png`,
    },
    {
        name: 'Hyundai',
        img: `${IMG_URL}hyundai.png`,
    },
    {
        name: 'Kia',
        img: `${IMG_URL}kia.png`,
    },
    {
        name: 'Nissan',
        img: `${IMG_URL}nissan.png`,
    },
    {
        name: 'Renault',
        img: `${IMG_URL}renault.png`,
    },
    {
        name: 'Toyota',
        img: `${IMG_URL}toyota.png`,
    },
    {
        name: 'ВАЗ',
        img: `${IMG_URL}lada.png`,
    },

];

const bodysMap = {
    'Хэтчбэк' : `${BODYS_URL}hatchback/hatchback.svg`,
    'Универсал': `${BODYS_URL}wagon/wagon.svg`,
    'Седан': `${BODYS_URL}sedan/sedan.svg`,
    'Минивэн': `${BODYS_URL}minivan/minivan.svg`,
    'Внедорожник': `${BODYS_URL}suv/suv.svg`,
    'Пикап': `${BODYS_URL}pickup/pickup.svg`,
    'Кроссовер': `${BODYS_URL}crossover/crossover.svg`,
}

const bodysNormalis = (bodysArray) => {
    if(!Array.isArray(bodysArray) ) return [];
    return bodysArray.map( old => ({...old, name: old.body, img: bodysMap[old.body]}) );
}

export const Calculator = () => {
    console.log('render Calculator')
    const dispatch = useDispatch();
    const { brands, brand, models, model, bodys, body, zones, activeZones } = useSelector(state => state.stepReducer);
    let fetchSubscribe = true;

    useEffect(() => {
        if(fetchSubscribe) dispatch(fetchBrands());
        return () => {
            fetchSubscribe = false;
        }
    }, []);

    const changeBrand = (brand) => {
        dispatch(selectBrand(brand))
    }
    const changeModel = (model) => {
        dispatch(selectModel(model));
    }
    const changeBody = (body) => {
        dispatch(selectBody(body));
    }

    const setActiveZones = (status, value) => { status ?  dispatch(setZone(value)) : dispatch( removeZone(value) ) }

    return (
        <>
            <Step number="01" title="Выберите марку автомобиля">
                    <Autocomplete onChange={brand => changeBrand(brand)} options={brands} label="Выберите марку:" getOptionLabel = { (option) => option.brand } />
                    <h4 className="stp-calc__bold-title">Популярные</h4>
                    <Slider elements={popularBrands} activeItem={brand.brand} onChange={elem => console.log(elem)} />
            </Step>

            <Step number="02" title="Выберите модель автомобиля">
                <Autocomplete onChange={model => changeModel(model)} options={models} label="Выберите модель:" getOptionLabel = { (option) => option.model } />
            </Step>

            <Step number="03" title="Выберите тип кузова">
                <Slider activeItem={body.body} elements={bodysNormalis(bodys)} size="big" onChange={elem => changeBody(elem)} />
            </Step>

            <Step number="04" title="Зоны обработки">   
                <ul className="zones-labels">           
                    {zones.map((z, key) => <ZoneLabel key={key} zone={z} onChange={(check, value) => setActiveZones(check, value)} />)}
                </ul>
            </Step>

            {/* <Step number="05" title="Уровень">
                
            </Step> */}
        </>
    )
}