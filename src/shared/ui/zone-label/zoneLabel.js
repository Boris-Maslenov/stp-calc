import './zone-label.scss';
import { Checkbox } from '../checkbox/checkbox';
export const ZoneLabel = ({zone, status, onChange}) => {
    return(
        <li className="zones-labels__item">
            <Checkbox status={status} value={zone.zone} onChange={onChange} />
            <span className="zones-labels__name">{zone.zone}</span>
        </li>
    )
}