import {useState} from 'react';
import './checkbox.scss';

export const Checkbox = ({value, onChange}) => {
    const [check, setCheck] = useState(true);
    const change = (e) => {
        setCheck(e.target.checked);
        onChange(e.target.checked, value);
    }
    return (
        <label className="check">
            <input checked={check} onChange={change} type="checkbox" />
            <span></span>
        </label>
    )
}