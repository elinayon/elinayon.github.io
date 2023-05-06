import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./Slides.css";

gsap.registerPlugin(ScrollTrigger);

export default function Slides() {
    const component = useRef();
    const slider = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            let slides = gsap.utils.toArray(".slide");
            gsap
                // .timeline({
                //     scrollTrigger: {
                //         trigger: slider.current,
                //         start: "40% 50%", // position of trigger meets the scroller position
                //     }
                // })
                // .from(self.selector('.col__content-title'), {
                //     ease: "power4",
                //     x: "+=5vh",
                //     duration: 2.5,
                // })
                // .from(self.selector('.col__content-txt'), {
                //     x: 100,
                //     y: 50,
                //     opacity: 0,
                //     duration: 2,
                //     ease: "power4"
                // }, 0.4)
                // .to(slide.querySelectorAll('.slide__scroll-line'), {
                //     scaleX: 0.6,
                //     transformOrigin: "bottom left",
                //     duration: 2.5,
                //     ease: "elastic(1,0.5)"
                // }, 1.4)
                .to(slides,
                    {
                        xPercent: -100 * (slides.length - 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: slider.current,
                            pin: true,
                            scrub: 1,
                            snap: 1 / (slides.length - 1),
                            end: () => "+=" + slider.current.offsetWidth
                        }
                    });
        }, component);
        return () => ctx.revert();
    });

    return (
        <div className="Slides" ref={component}>
            <div ref={slider} className="container">
                <div className="description blue slide">
                    <div>
                        SCROLL DOWN
                        <div className="scroll-down">
                            <div className="arrow"></div>
                        </div>
                    </div>
                </div>
                <div className="slide red">ONE</div>
                <div className="slide orange">TWO</div>
                <div className="slide purple">THREE</div>
            </div>
            <div className="lastContainer">Last Container</div>
        </div>
    );
}
