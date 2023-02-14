import {useState, useEffect} from 'react';
import './checkbox.scss';

export const Checkbox = ({status, value, onChange}) => {
    const [check, setCheck] = useState(true);
    const change = (e) => {
        setCheck(e.target.checked);
        onChange(e.target.checked, value);
    }
// Можем менять статус при обновлении Props
    useEffect(()=>{
        setCheck(status);
    },[status]);

    return (
        <label className="check">
            <input checked={check} onChange={change} type="checkbox" />
            <span></span>
        </label>
    )
}