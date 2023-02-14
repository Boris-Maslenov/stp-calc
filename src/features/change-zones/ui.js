import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setZone,  removeZone} from '../../entities/step-process/';
import { ZoneLabel } from '../../shared';

export const ChangeZones = memo(() => {
    const dispatch = useDispatch();
    const {zones, activeZones} = useSelector(store => store.stepReducer);
    const setActiveZones = (status, value) => { status ?  dispatch(setZone(value)) : dispatch( removeZone(value) ) }
    return(
            <ul className="zones-labels">           
                {zones.map((z, key) => <ZoneLabel key={key} status={activeZones.includes(z.zone)} zone={z} onChange={(check, value) => setActiveZones(check, value)} />)}
            </ul>
    )
});