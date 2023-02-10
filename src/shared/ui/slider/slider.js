import './slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';


export const Slider = ({elements=[], size, onChange}) => {
    const clazz = size === 'big' ? 'quick-pick quick-pick_body' : 'quick-pick';

    const SliderItem = ({item}) => {
        return(
                <div onClick={() => onChange(item)} className="quick-pick__label">
                    <img src={item.img} alt={item.name} className="quick-pick__logo" />
                    <span className="quick-pick__name">{item.name}</span>
                </div>  
        )
    }

    const items = (function() {
        return elements.map((item, key) => <SwiperSlide key={key}>
                                                <SliderItem  item={item} alt='' />
                                            </SwiperSlide>
        );
    })(elements);

    return (
        <Swiper className={clazz} slidesPerView={8} spaceBetween={30} >
            {items}
        </ Swiper>
    )

}