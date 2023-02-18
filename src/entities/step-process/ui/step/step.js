import './step.scss';
export const Step = ({number, title, children}) => {
    //animate__animated animate__fadeIn
    return(
        <div className="step stp-calc__step animate__animated animate__fadeIn">
            <h2 className="step__title step__title_padding"><span>{number}</span>/ {title}</h2>
                {children}
        </div>
    )
};