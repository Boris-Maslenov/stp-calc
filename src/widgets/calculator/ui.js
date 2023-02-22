import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../entities/step-process/';
import spinner from '../../3-dots-fade.svg';

import { Result } from '../../shared';
import { Step } from "../../entities/step-process/";

import { SelectBrand } from '../../features/select-brand';
import { SelectModel } from '../../features/select-model';
import { SelectBody } from '../../features/select-body';
import { ChangeZones } from '../../features/change-zones';
import { ChangeLevel } from '../../features/change-level';
import {  GetPrice  } from '../../features/get-price';

const Spinner = () => {
    return(
        <div className='spinner'>
            <img style={{'width': '50px'}} src={spinner} alt="spinner" />
        </div>
    )
}

export const Calculator = () => {
    console.log('Render widjet');
    const dispatch = useDispatch();
    const { brands, brand, model, body, activeZones, result, status } = useSelector(state => state.stepReducer);
    let fetchSubscribe = true;

    useEffect(() => {
        if(fetchSubscribe) dispatch(fetchBrands());
        return () => {fetchSubscribe = false;}
    }, []);

    const isSpinner = status === 'loading';
    const isError = status === 'error';
    const isStep1 = brands.length && !isSpinner;
    const isStep2 = brands.length && brand?.models?.length;
    const isStep3 = brands.length && brand && model;
    const isStepAll = brands.length && brand && model && body;
    const isGetPrice = isStepAll && activeZones.length && !result;
    const isResult = isStepAll && activeZones.length && (result && result.list.length);

    return (
        <>
            {
               isError ?   
                    <span>Не удалось загрузить данные</span>
               : void 0
            }
            {
               isSpinner ?   
                    <Spinner />
               : void 0
            }
            {
                isStep1 ?    
                <Step number="01" title="Выберите марку автомобиля">
                    <SelectBrand />             
                </Step> : void 0
            }
            {  isStep2 ?
                <Step number="02" title="Выберите модель автомобиля">
                    <SelectModel />
                </Step> : void 0
            } 
            {  isStep3 ?
                <Step number="03" title="Выберите тип кузова">
                    <SelectBody />
                </Step> : void 0
            }
            {  isStepAll ?
                <Step number="04" title="Зоны обработки">  
                     <ChangeZones />
                </Step> : void 0
            }
            {  isStepAll && activeZones.length ?
                <>
                    <Step number="05" title="Выберите степень эффективности:">
                        <ChangeLevel />
                    </Step>
                </>
                : void 0
            }
            { isGetPrice  ?
                    < GetPrice />
                : void 0
            }
            {  isResult ? 
                <>
                    <Step number="06" title="Результат рассчета:">
                        <Result list={result.list} total={result.summ} />
                    </Step>
                </>
                : void 0
            }
        </>
    )
}