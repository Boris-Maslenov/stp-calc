import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, selectBrand, selectModel, selectBody, removeZone, setZone, setLevel } from '../../entities/step-process/';

import { Result } from '../../shared';
import { Step } from "../../entities/step-process/";

import { SelectBrand } from '../../features/select-brand';
import { SelectModel } from '../../features/select-model';
import { SelectBody } from '../../features/select-body';
import { ChangeZones } from '../../features/change-zones';
import { ChangeLevel } from '../../features/change-level';
import {  GetPrice  } from '../../features/get-price';

export const Calculator = () => {
    console.log('Render widjet');
    const dispatch = useDispatch();
    const { brands, brand, models, model, bodys, body, zones, activeZones, levels , level } = useSelector(state => state.stepReducer);
    let fetchSubscribe = true;

    useEffect(() => {
        if(fetchSubscribe) dispatch(fetchBrands());
        return () => {fetchSubscribe = false;}
    }, []);

    const isStep1 = brands.length;
    const isStep2 = brands.length && brand;
    const isStep3 = brands.length && brand && model;
    const isStepAll = brands.length && brand && model && body;


    return (
        <>
            {
                isStep1 ?    
                <Step number="01" title="Выберите марку автомобиля">
                    <SelectBrand />             
                </Step> : 'loading...'
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
                    < GetPrice />
                </>
                : void 0
            }

            {/* <Result />  */}

              
        </>
    )
}