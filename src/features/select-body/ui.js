import { useDispatch, useSelector } from 'react-redux';
import { Slider } from "../../shared/";
import { selectBody } from '../../entities/step-process/';
import { bodysMap } from '../../shared/config';

export const SelectBody = () => {
    const dispatch = useDispatch();
    const { body, bodys } = useSelector(state => state.stepReducer);
    const bodysNormalis = (bodysArray) => {
        if(!Array.isArray(bodysArray) ) return [];
        return bodysArray.map( old => ({...old, name: old.body, img: bodysMap[old.body]}) );
    }
    const changeBody = (body) => {
        dispatch(selectBody(body));
    }
    return  <Slider activeItem={body.body} elements={bodysNormalis(bodys)} size="big" onChange={elem => changeBody(elem)} />
}