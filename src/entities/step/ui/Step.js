export const Step = ({number, title, children}) => {
    return(
        <div class="step stp-calc__step">
            <h2 class="step__title step__title_padding"><span>{number}</span>/ {title}</h2>
                {children}
        </div>
    )
};