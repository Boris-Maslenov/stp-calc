import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from "../../shared/";
import { selectModel } from '../../entities/step-process/';

export const SelectModel = () => {
    const changeModel = model => dispatch( selectModel(model) );
    const dispatch = useDispatch();
    const { models } = useSelector(state => state.stepReducer);
    return <Autocomplete customKey={'model'} items={models} onChange={ (selection) => changeModel(selection) } itemToString={(item) => (item ? item.model : '')}/>
    
    
    //<Autocomplete onChange={model => changeModel(model)} options={ models || [] } label="Выберите модель:" getOptionLabel = { (option) => option.model } />  
}