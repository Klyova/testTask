import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import swiperProduct from "../products/products.js";
import swiperMain from "../slider/slider.js";

document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector(".main__section")) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(".main__section", { y: 0, opacity: 0 });

        ScrollTrigger.batch(".main__section", {
            interval: 0.1,
            batchMax: 3,
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 5] }, overwrite: true }),
            onLeave: batch => gsap.set(batch, { opacity: 0, y: 0, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
            onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 0, overwrite: true })
        });

        ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".main__section", { y: 0 }));
    }
})