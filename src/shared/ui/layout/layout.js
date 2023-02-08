import './layout.scss';
export const Layout = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    ) 
}