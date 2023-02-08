import {Layout} from '../../shared';
import { Step } from '../../entities/step';
import { Slider } from '../../entities/slider';
import {SelectBrand} from '../../features';

const IMG_URL = 'https://stpshopnn.ru/wp-content/brands/';

const popularBrands = [
    {
        name: 'Chevrolet',
        img: `${IMG_URL}chevrolet.png`,
    },
    {
        name: 'Ford',
        img: `${IMG_URL}ford.png`,
    },
    {
        name: 'Hyundai',
        img: `${IMG_URL}hyundai.png`,
    },
    {
        name: 'Kia',
        img: `${IMG_URL}kia.png`,
    },
    {
        name: 'Nissan',
        img: `${IMG_URL}nissan.png`,
    },
    {
        name: 'Renault',
        img: `${IMG_URL}renault.png`,
    },
    {
        name: 'Toyota',
        img: `${IMG_URL}toyota.png`,
    },
    {
        name: 'Lada',
        img: `${IMG_URL}lada.png`,
    },

]


export const Home = () => {
    return (
        <Layout>
            <Step number="01" title="Выберите марку автомобиля:"> 
                <SelectBrand />
                <h4 class="stp-calc__bold-title">Популярные</h4>
                <Slider elements={popularBrands} />
            </Step>
        </Layout>
    )
}