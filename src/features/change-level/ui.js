import { useSelector, useDispatch } from "react-redux"
import { setLevel } from "../../entities/step-process";
import { Tab } from "../../shared";
export const ChangeLevel = () => {
    const dispatch = useDispatch();
    const { level, body, activeZones } = useSelector(state => state.stepReducer);
    return (
        <Tab level={level ? level.level : null} 
                zones={ level ? level.zones.filter(({zone}) => activeZones.includes(zone)) : [] } 
                body={body.name}
                onChange={(value) => {dispatch(setLevel(value))}}
        /> 
    )
}