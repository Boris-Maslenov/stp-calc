export const Step = ({number, title, children}) => {
    return(
        <div className="step stp-calc__step">
            <h2 className="step__title step__title_padding"><span>{number}</span>/ {title}</h2>
                {children}
        </div>
    )
};