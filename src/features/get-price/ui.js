import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../shared/ui/button/button";
import spinner from '../../3-dots-fade.svg';
import { fetchPrice } from '../../entities/step-process';

export const GetPrice = () => {
    const dispatch = useDispatch();
    const { level, activeZones, status } = useSelector(state => state.stepReducer);
    const getMaterials = () => {
        const doobleArray = level.zones.filter(({zone}) => activeZones.includes(zone)).map((item) => ({...item.materials})).map(obj =>  Object.values(obj)).flat();
        const unicArray = (function(){
            const resultObj = {};
            doobleArray.forEach(element => {
                const id = element.materialId;
                if(resultObj[id]){
                    resultObj[id] = {...resultObj[id], count: +resultObj[id].count + +element.count}
                } else {
                    resultObj[id] =  element;
                }
            });
            return Object.values(resultObj);
        })(doobleArray);

        return unicArray;
    }
    const onClickHandler = () => {
        dispatch( fetchPrice(  getMaterials() ) );
    }

    return (

        <Button clickHandler={onClickHandler}>
            { status === 'idle' ? <span>Рассчитать</span> : void 0 }
            { status === 'loading' ? <span><img src={spinner} alt="spinner" /></span> : void 0 }
            { status === 'error' ? <span>Произошла ошибка</span> : void 0 }
        </Button>
    )
}


