import Swiper from 'swiper/bundle';

const swiperMain = new Swiper(' .main-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: '.main-slider__pagination',
        clickable: true,
    }
});

export default swiperMain;