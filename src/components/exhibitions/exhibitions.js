import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

document.addEventListener('DOMContentLoaded', () => {

    if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    ScrollTrigger.batch(".exhibitions__cart", {
        onEnter: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.1}),
    });
})