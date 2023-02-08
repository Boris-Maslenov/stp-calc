import { Swiper, SwiperSlide } from 'swiper/react';

const SliderItem = ({img, name}) => {

    return(
            <div className="quick-pick__label">
                <img src={img} alt={name} className="quick-pick__logo" />
                <span className="quick-pick__name">{name}</span>
            </div>  
    )
}

export const Slider = ({elements=[], size}) => {
    const clazz = size === 'big' ? 'quick-pick quick-pick_body' : 'quick-pick';
    const items = (function() {
        return elements.map((item, key) => <SwiperSlide key={key}>
                                                <SliderItem img={item.img} name={item.name} alt='' />
                                            </SwiperSlide>
        );
    })(elements);

    return (
        <Swiper className={clazz} slidesPerView={8} spaceBetween={30} >
            {items}
        </ Swiper>
    )

}