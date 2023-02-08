import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from './calculatorSlice';

import { Step } from '../entities/step';
import { Slider } from '../entities/slider';
import { SelectBrand } from '../features';

const IMG_URL = 'https://stpshopnn.ru/wp-content/brands/';

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
        name: 'Lada',
        img: `${IMG_URL}lada.png`,
    },

];

export const Calculator = () => {

    const dispatch = useDispatch();
    const {brands} = useSelector(state => state.calculatorReducer);
    const {activeBrand} = useSelector(state => state.brandReducer);
    let fetchSubscribe = true;

    useEffect(() => {
        if(fetchSubscribe) dispatch(fetchBrands());
        return () => {
            fetchSubscribe = false;
        }
    }, []);

    return (
                <Step number="01" title="Выберите марку автомобиля:"> 
                    <SelectBrand brands={brands} />
                        <h4 className="stp-calc__bold-title">Популярные</h4>
                    <Slider elements={popularBrands} />
                </Step>

                // {
                //     activeBrand ? 
                //     <Step number="02" title="Выберите модель автомобиля:">
                //     </Step> : void 0
                // }

    )
}