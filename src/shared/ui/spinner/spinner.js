import './spinner.scss';
import spinner from '../../../3-dots-fade.svg';

export const Spinner = ({width='auto', position="fixed"}) => {
    return(
        <div className='spinner' style={ {'position' : `${position}`} }>
            <img style={ {'width': `${width}px`} } src={spinner} alt="spinner" />
        </div>
    )
}