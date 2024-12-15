import Swiper from 'swiper/bundle';

const swiperProduct = new Swiper(".products-slider", {
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    slidesPerView: 6,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    breakpoints: {
        360: {
            slidesPerView: 1,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 4,
        },
        1024: {
            slidesPerView: 4
        },
        1440: {
            slidesPerView: 6,
        }
    }
})

export default swiperProduct;