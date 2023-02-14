import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Slider } from "../../shared/";
import { selectBrand } from '../../entities/step-process/';

import { popularBrands } from "../../shared/config";

export const SelectBrand = () => {
    const dispatch = useDispatch();
    const { brand, brands } = useSelector( state => state.stepReducer );
    const changeBrand = (brand) => {
        dispatch(selectBrand(brand))
    }
    const changeBrandFromSlider = (nameBrand) => {
        const brandArr = brands.filter(({brand}) => nameBrand === brand);
        if(brandArr.length > 0){
            const [brand] = brandArr;
            dispatch(selectBrand(brand));
        } else {
            throw new Error();
        }
    }

    return(
        <>
            <Autocomplete onChange={brand => changeBrand(brand)}
                            options={brands} label="Выберите марку:"
                            getOptionLabel = { (option) => option.brand }
                            selectValue={brand}
            />
            <h4 className="stp-calc__bold-title">Популярные</h4>
            <Slider elements={popularBrands} 
                    activeItem={brand.brand} 
                    onChange={({name}) => changeBrandFromSlider(name)}
            />
        </>
    )
}