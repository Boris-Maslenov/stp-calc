import { Calculator } from "../../widgets/calculator";
import { Container } from '../../shared';


export const Home = () => {
    if(process.env.NODE_ENV === 'development') {
        return (
                <Container>
                    <Calculator/>
                </Container>
            )
    } else {
        return <Calculator/>
    }
}