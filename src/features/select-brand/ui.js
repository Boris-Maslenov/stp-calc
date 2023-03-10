import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Slider } from "../../shared/";
import { selectBrand, fetchModels } from '../../entities/step-process/';

import { popularBrands } from "../../shared/config";

export const SelectBrand = () => {
    const dispatch = useDispatch();
    let { brand, brands } = useSelector( state => state.stepReducer );
    const changeBrand = (brand) => {
        dispatch(selectBrand(brand))
        dispatch(fetchModels(brand));
    }
    // FIX: при повторном выборе не делать запрос к серверу. Сделать проверку
    const changeBrandFromSlider = (nameBrand) => {
        const brandArr = brands.filter(({brand}) => nameBrand === brand);
        if(brandArr.length > 0){
            const [brand] = brandArr;
            dispatch(selectBrand(brand));
            dispatch(fetchModels(brand));
        } else {
            throw new Error();
        }
    }
    // FIX:
    if(!brand) brand = '';

    return(
        <>
            <Autocomplete label="Выбрать марку:" 
                            customKey={'brand'}
                            items={brands} 
                            selectedItem={brand} 
                            onChange={ (selection) => changeBrand(selection) } 
                            itemToString={(item) => (item ? item.brand : '')}
             />
            <h4 className="stp-calc__bold-title">Популярные</h4>
            <Slider elements={popularBrands} 
                    activeItem={brand.brand} 
                    onChange={({name}) => changeBrandFromSlider(name)}
                    breakpoints={
                            {
                                0: {
                                    slidesPerView: 2, 
                                    spaceBetween: 10,
                                },
                                375: {
                                    slidesPerView: 3,
                                },
                                576: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 6,
                                },
                                992: {
                                    slidesPerView: 8,
                                    spaceBetween: 30,
                                }
                            }
                    }
            />
        </>
    )
}