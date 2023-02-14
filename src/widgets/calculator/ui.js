import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, selectBrand, selectModel, selectBody, removeZone, setZone, setLevel } from '../../entities/step-process/';

import { Autocomplete, Slider, ZoneLabel, Tab } from '../../shared';
import { Step } from "../../entities/step-process/";

import { SelectBrand } from '../../features/select-brand';
import { SelectModel } from '../../features/select-model';
import { SelectBody } from '../../features/select-body';
import { ChangeZones } from '../../features/change-zones';

import {bodysMap} from '../../shared/config';

// const bodysNormalis = (bodysArray) => {
//     if(!Array.isArray(bodysArray) ) return [];
//     return bodysArray.map( old => ({...old, name: old.body, img: bodysMap[old.body]}) );
// }

export const Calculator = () => {
    // console.log('render Calculator')
    const dispatch = useDispatch();
    const { brands, brand, models, model, bodys, body, zones, activeZones, levels , level } = useSelector(state => state.stepReducer);
    let fetchSubscribe = true;

    useEffect(() => {
        if(fetchSubscribe) dispatch(fetchBrands());
        return () => {
            fetchSubscribe = false;
        }
    }, []);

    // const changeBrand = (brand) => {
    //     dispatch(selectBrand(brand))
    // }
    // const changeModel = (model) => {
    //     dispatch(selectModel(model));
    // }
    // const changeBody = (body) => {
    //     dispatch(selectBody(body));
    // }



    return (
        <>
            <Step number="01" title="Выберите марку автомобиля">
                <SelectBrand />             
            </Step>
            <Step number="02" title="Выберите модель автомобиля">
               <SelectModel />
            </Step>
             <Step number="03" title="Выберите тип кузова">
               <SelectBody />
            </Step>
            <Step number="04" title="Зоны обработки">  
                <ChangeZones />
            </Step>

             {/*
            <Step number="05" title="Выберите степень эффективности:">
                <Tab level={level ? level.level : null} zones={ level ? level.zones.filter(({zone}) => activeZones.includes(zone)) : [] }  body={body.name} consts={ {BODYS_URL}  } onChange={(value) => {dispatch(setLevel(value))}} />
            </Step> */}

            {/* <button type="button" className="app-button">Рассчитать</button> */}

            {/* <div className="app-result">
                <div className="flex-table result-table">
                    <div className="flex-table__head">
                        <div className="flex-table__row">
                            <div className="flex-table__cell">Артикул</div>
                            <div className="flex-table__cell">Материал</div>
                            <div className="flex-table__cell">Цена*</div>
                            <div className="flex-table__cell">Кол-во</div>
                            <div className="flex-table__cell">Сумма</div>
                        </div>
                    </div>
                    <div className="flex-table__body">
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                        <div className="flex-table__row">
                            <div className="flex-table__cell result-table__article">00653-09-00</div>
                            <div className="flex-table__cell result-table__material">Вибродемпфирующий материал StP Aero</div>
                            <div className="flex-table__cell result-table__price">501 ₽</div>
                            <div className="flex-table__cell result-table__count">18 листов</div>
                            <div className="flex-table__cell result-table__price-total">9 018 ₽</div>
                        </div>
                    </div>

                </div>

            </div> */}
        </>
    )
}