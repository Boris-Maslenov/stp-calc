import { useDispatch, useSelector } from 'react-redux';
import { Slider } from "../../shared/";
import { selectBody } from '../../entities/step-process/';
import { bodysMap } from '../../shared/config';

export const SelectBody = () => {
    const dispatch = useDispatch();
    let { body, bodys } = useSelector(state => state.stepReducer);
    //исправить:
    if(!body) body = [];
    const bodysNormalis = (bodysArray) => {
        if(!Array.isArray(bodysArray) ) return [];
        return bodysArray.map( old => ({...old, name: old.body, img: bodysMap[old.body]}) );
    }
    const changeBody = (newBody) => {
        if(newBody.body === body.body) return;
        dispatch(selectBody(newBody));
    }
    return  <Slider activeItem={body.body}
                    elements={bodysNormalis(bodys)}
                    size="big" 
                    onChange={elem => changeBody(elem)}
                    breakpoints={
                                    {
                                        0: {
                                            slidesPerView: 2,
                                        
                                        },
                                        375: {
                                            slidesPerView: 3,
                                            spaceBetween: 5,
                                        },
                                        576: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 5,
                                            spaceBetween: 30,
                                        },
                                    }
                                }
            />
}