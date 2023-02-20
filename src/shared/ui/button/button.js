import './button.scss';
//app-button_default
export const Button = ({clazz='app-button', clickHandler, setDisabled=false, children}) => {
    return (
        <button onClick={clickHandler} disabled={setDisabled} className={clazz} >
            {children}
        </button>
    )
}