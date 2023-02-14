import { useDispatch, useSelector } from 'react-redux';
import { setZone,  removeZone} from '../../entities/step-process/';
import { ZoneLabel } from '../../shared';

export const ChangeZones = () => {
    const dispatch = useDispatch();
    const {zones} = useSelector(store => store.stepReducer);
    const setActiveZones = (status, value) => { status ?  dispatch(setZone(value)) : dispatch( removeZone(value) ) }
    return(
            <ul className="zones-labels">           
                {zones.map((z, key) => <ZoneLabel key={key} zone={z} onChange={(check, value) => setActiveZones(check, value)} />)}
            </ul>
    )
}