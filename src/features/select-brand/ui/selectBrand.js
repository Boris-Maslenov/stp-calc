import { useDispatch, useSelector } from 'react-redux';
import {Autocomplete} from '../../../shared';
import { setBrand } from '../model/selectBrandSlice';

export const SelectBrand = ({brands}) => {
    const dispatch = useDispatch();

    return(
        <Autocomplete options={brands} onChange={(value) => dispatch( setBrand(value) )}  getOptionLabel = {option => option.brand} label="Выбрать марку:"/>
    )
}