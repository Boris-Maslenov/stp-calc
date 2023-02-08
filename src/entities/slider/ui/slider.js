import { Swiper, SwiperSlide } from 'swiper/react';

const SliderItem = ({img, name}) => {
    return(
            <div className="quick-pick__label">
                <img src={img} alt={name} class="quick-pick__logo" />
                <span className="quick-pick__name">{name}</span>
            </div>  
    )
}

export const Slider = ({elements=[], size}) => {
    const clazz = size === 'big' ? 'quick-pick quick-pick_body' : 'quick-pick';
    const items = (function() {
        return elements.map((item, key) => <SwiperSlide className="quick-pick__label" key={key}>
                                                <SliderItem img={item.img} name={item.name} alt='' />
                                            </SwiperSlide>
        );
    })(elements);

    return (
        <Swiper className='quick-pick' >
            {items}
        </ Swiper>
    )

}