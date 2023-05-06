import React, { useRef, useContext, useLayoutEffect, createContext, useState } from "react";
import gsap from "gsap";
import './ParallaxBody.css';
import { ScrollTrigger } from './libraries';

console.clear();

let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);

const stage = select('.stage');
const slides = selectAll(".slide");
const links = selectAll(".slide__scroll-link");
const titles = selectAll('.col__content-title');
// const introTitle = new SplitText('.intro__title', {type: "lines", linesClass: "intro-line"});
// const splitTitles = new SplitText(titles, {type: "lines, chars", linesClass: "line", charsClass: "char", position: "relative" });
let slideID = 0;

// const smoother = ScrollSmoother.create({
//     smooth: 2,
//     effects: true,
//     // normalizeScroll: true,
//     smoothTouch: 0.1,
// });

const InitHeader = () => {

    // animate the logo and fake burger button into place

    // React Hooks
    const tl = useRef();
    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            tl.current = gsap
                .timeline({ delay: 0.5 })
                .from('.logo', {
                    y: -40,
                    opacity: 0,
                    duration: 2,
                    ease: 'power4'
                })
                .from('.nav-btn__svg rect', {
                    scale: 0,
                    transformOrigin: "center right",
                    duration: 0.6,
                    ease: 'power4',
                    stagger: 0.1
                }, 0.6)
                .to('.nav-rect', {
                    scale: 0.8,
                    transformOrigin: "center left",
                    duration: 0.4,
                    ease: 'power2',
                    stagger: 0.1
                }, "-=0.6");

            // create mouse animations for the faux burger button
            let navBtn = select('.nav-btn');

            navBtn.addEventListener("mouseover", (e) => {
                gsap.to('.nav-rect', {
                    scaleX: 1,
                    transformOrigin: "top left",
                    duration: 0.4,
                    ease: "power4"
                });
            });

            navBtn.addEventListener("mouseout", (e) => {
                gsap.to('.nav-rect', {
                    scaleX: 0.8,
                    transformOrigin: "top left",
                    duration: 0.6,
                    ease: "power4"
                });
            });
        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <header className="header" ref={el}>
            <div className="logo">Elina Yon</div>
            <a href="#" className="nav-btn">
                <svg className="nav-btn__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 30">
                    <rect className="nav-rect" width="40" height="2" x="8" y="8" fill="#242423" />
                    <rect className="nav-rect" width="40" height="2" x="8" y="14" fill="#242423" />
                    <rect width="40" height="2" x="8" y="20" fill="#242423" />
                </svg>
            </a>
        </header>
    );
}

const InitIntro = () => {
    // React Hooks
    const tl = useRef();
    const stl = useRef();
    const el = useRef();
    const activeSlideRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // animate the intro elements into place
            tl.current = gsap
                .timeline({ delay: 1.2 })
                // .from('.intro-line', {
                //     x: 100,
                //     y: 400,
                //     ease: 'power4',
                //     duration: 3
                // })
                .from('.intro__txt', {
                    x: -100,
                    opacity: 0,
                    ease: 'power4',
                    duration: 3
                }, 0.7)
                .from('.intro__img--1', {
                    // x: -50,
                    y: 50,
                    opacity: 0,
                    ease: 'power2',
                    duration: 10
                }, 1);
            // .from('.intro__img--2', {
            //     // x: 50,
            //     y: -50,
            //     opacity: 0,
            //     ease: 'power2',
            //     duration: 10
            // }, 1);
            let intro = select('.intro');
            // set up scrollTrigger animation for the when the intro scrolls out
            console.log(intro);
            stl.current = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: intro,
                        scrub: 1,
                        start: "top bottom", // position of trigger meets the scroller position
                        end: "bottom top"
                    }
                })
                .to('.intro__title', {
                    y: 400,
                    ease: 'power4.in',
                    duration: 3,
                })
                .to('.intro__txt', {
                    y: 100,
                    ease: 'power4.in',
                    duration: 3,
                }, 0);
        }, el);
        console.log("intro returned");
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <section className="intro slide slide--0" id="slide-0" ref={el}>
            <div className="intro__content" >
                <h1 className="intro__title">Elina Yon</h1>
                <p className="intro__txt">Hi, welcome to my website! I am a software engineer based out of the San Francisco Bay Area. Scroll through to learn more!</p>
            </div>
            <img className="intro__img intro__img--1" src="elina_bear_clear.png" />
        </section>

    );
}

const InitLinks = () => {

    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // ScrollToPlugin links
            links.forEach((link, index, el) => {

                let linkST = link.querySelector('.slide__scroll-line');

                link.addEventListener("click", (el) => {
                    el.preventDefault();
                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            x: "#slide-" + (index + 2)
                        },
                        ease: "power2.inOut"
                    });
                    slideID++;
                });

                link.addEventListener("mouseover", (el) => {
                    gsap.to(linkST, {
                        x: 40,
                        transformOrigin: "bottom center",
                        duration: 0.6,
                        ease: "power4"
                    });
                });

                link.addEventListener("mouseout", (el) => {
                    gsap.to(linkST, {
                        x: 0,
                        transformOrigin: "bottom center",
                        duration: 0.6,
                        ease: "power4"
                    });
                });

            });

            // ScrollToPlugin link back to the top

            let top = select('.footer__link-top');

            top.addEventListener("click", (el) => {
                el.preventDefault();
                ScrollTop();
            });

            top.addEventListener("mouseover", (el) => {
                gsap.to('.footer__link-top-line', {
                    scaleX: 3,
                    transformOrigin: "bottom center",
                    duration: 0.6,
                    ease: "power4"
                });
            });

            top.addEventListener("mouseout", (el) => {
                gsap.to('.footer__link-top-line', {
                    scaleX: 1,
                    transformOrigin: "bottom center",
                    duration: 0.6,
                    ease: "power4"
                });
            });

            // Dummy slide links

            let slideLinks = selectAll('.slide-link');

            slideLinks.forEach((slideLink, index, el) => {

                let slideL = slideLink.querySelector('.slide-link__line');

                slideLink.addEventListener("mouseover", (el) => {
                    gsap.to(slideL, {
                        x: 20,
                        scaleX: 0.3,
                        transformOrigin: "right center",
                        duration: 0.8,
                        ease: "power4"
                    });
                });
                slideLink.addEventListener("mouseout", (el) => {
                    gsap.to(slideL, {
                        x: 0,
                        scaleX: 1,
                        transformOrigin: "right center",
                        duration: 0.8,
                        ease: "power4"
                    });
                });
            })
        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);
}

const InitSlides = () => {
    // React Hooks
    const tl = useRef();
    const el = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let slides = gsap.utils.toArray('.slide');

            // Animation of each slide scrolling into view

            slides.forEach((slide, i) => {
                tl.current = gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: slide,
                            start: "40% 50%", // position of trigger meets the scroller position
                        }
                    })
                    .from(slide.querySelectorAll('.col__content-title'), {
                        ease: "power4",
                        x: "+=5vh",
                        duration: 2.5,
                    })
                    .from(slide.querySelectorAll('.line__inner'), {
                        x: 200,
                        duration: 2,
                        ease: "power4",
                        stagger: 0.1
                    }, 0)
                    .from(slide.querySelectorAll('.col__content-txt'), {
                        x: 100,
                        y: 50,
                        opacity: 0,
                        duration: 2,
                        ease: "power4"
                    }, 0.4)
                    .from(slide.querySelectorAll('.slide-link'), {
                        x: -100,
                        y: 100,
                        opacity: 0,
                        duration: 2,
                        ease: "power4"
                    }, 0.3)
                    .from(slide.querySelectorAll('.slide__scroll-link'), {
                        x: 200,
                        duration: 3,
                        ease: "power4"
                    }, 0.4)
                    .to(slide.querySelectorAll('.slide__scroll-line'), {
                        scaleX: 0.6,
                        transformOrigin: "bottom left",
                        duration: 2.5,
                        ease: "elastic(1,0.5)"
                    }, 1.4)
            });

            // External footer link scroll animation

            gsap.from('.footer__link', {
                scrollTrigger: {
                    trigger: '.footer',
                    scrub: 2,
                    start: "50% 100%", // position of trigger meets the scroller position
                    end: "0% 0%",
                },
                y: "20vh",
                ease: 'sine'
            })

        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <div ref={el}>
            <section className="slide slide--1" id="slide-1">
                <div class="col col--1">
                    <div class="col__content col__content--1">
                        <h2 class="col__content-title"><span class="line__inner">Mono</span><br /><span class="line__inner">No. 1</span></h2>
                        <div class="col__content-wrap">
                            <p class="col__content-txt">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.</p>
                            <a href="#" class="slide-link">
                                <div class="slide-link__circ"></div>
                                <div class="slide-link__line"></div>
                            </a>
                        </div>
                    </div>
                    <a href="#slide-2" class="slide__scroll-link">
                        <div class="slide__scroll-line"></div>
                    </a>
                </div>
                <div class="col col--2">
                    <div class="col__image-wrap">
                        <img class="img img--1" src="sham-pain.jpg" />
                    </div>
                </div>
            </section>

            <section class="slide slide--2" id="slide-2">
                <div class="col col--1">
                    <div class="col__content col__content--2">
                        <h2 class="col__content-title"><span class="line__inner">Look</span><br /><span class="line__inner">No. 2</span></h2>
                        <div class="col__content-wrap">
                            <p class="col__content-txt">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.</p>
                            <a href="#" class="slide-link">
                                <div class="slide-link__circ"></div>
                                <div class="slide-link__line"></div>
                            </a>
                        </div>
                    </div>
                    <a href="#slide-3" class="slide__scroll-link">
                        <div class="slide__scroll-line"></div>
                    </a>
                </div>
                <div class="col col--2">
                    <div class="col__image-wrap">
                        <img class="img img--1" src="https://assets.codepen.io/61488/duda-2.jpg" />
                    </div>
                </div>
            </section>

            <section class="slide slide--3" id="slide-3">
                <div class="col col--1">
                    <div class="col__content col__content--3">
                        <h2 class="col__content-title"><span class="line__inner">Zombie</span><br /><span class="line__inner">No. 3</span></h2>
                        <div class="col__content-wrap">
                            <p class="col__content-txt">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.</p>
                            <a href="#" class="slide-link">
                                <div class="slide-link__circ"></div>
                                <div class="slide-link__line"></div>
                            </a>
                        </div>
                    </div>
                    <a href="#slide-4" class="slide__scroll-link">
                        <div class="slide__scroll-line"></div>
                    </a>
                </div>
                <div class="col col--2">
                    <div class="col__image-wrap">
                        <img class="img img--1" src="https://assets.codepen.io/61488/duda-3.jpg" />
                    </div>
                </div>
            </section>
        </div>
    );

}

const InitParallax = () => {
    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            slides.forEach((slide, i) => {
                let imageWrappers = slide.querySelectorAll('.col__image-wrap');

                gsap.fromTo(imageWrappers, {
                    x: "-30vw"
                }, {
                    x: "30vw",
                    scrollTrigger: {
                        trigger: el.current,
                        scrub: true,
                        start: "top bottom", // position of trigger meets the scroller position
                        snap: {
                            snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                            duration: 1,
                            ease: 'power4.inOut'
                        }
                    },
                    ease: 'none'
                })
            });
        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);
}

const ScrollTop = () => {
    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(window, {
                duration: 2,
                scrollTo: {
                    y: "#slide-0"
                },
                ease: "power2.inOut"
            });
            gsap.to('.footer__link-top-line', {
                scaleY: 1,
                transformOrigin: "bottom center",
                duration: 0.6,
                ease: "power4"
            });
        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);



    // <footer class="footer" id="slide-7" ref={el}>
    //     <a class="footer__link" href="http://www.duda.ie/" target="_blank">duda.ie</a>
    //     <a class="footer__link-top" href="#slide-0">Top<span class="footer__link-top-line"></span></a>
    //     <p class="footer__copyright">All images © 2020 Dave Uda</p>
    // </footer>
}

const InitKeys = () => {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === 40) { //down arrow to next slide
            if (slideID <= slides.length) {
                slideID++;
                gsap.to(window, {
                    duration: 2,
                    scrollTo: {
                        y: "#slide-" + slideID
                    },
                    ease: "power2.inOut"
                });
            }
        }
        else if (e.key === 38) { // up arrow to top
            slideID = 0;
            ScrollTop();
        }
    });
}

function init() {
    gsap.set(stage, { autoAlpha: 1 });
    InitHeader();
    InitIntro();
    InitLinks();
    InitSlides();
    InitParallax();
    InitKeys();
}

const TransitionContext = createContext({ completed: false });

export const TransitionProvider = ({ children }) => {
    const [completed, setCompleted] = useState(false);

    const toggleCompleted = (value) => {
        setCompleted(value);
    };

    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
};

export default function ParallaxBody() {
    // const main = useRef();
    // const scrollTween = useRef();
    // const [ctx] = useState(gsap.context(() => { }, main));
    // const { completed } = useContext(TransitionContext);

    // const goToSection = (i) => {
    //     console.log("go to section: ", i)
    //     // Remove the GSAP instance with the specific ID
    //     // to prevent memory leak
    //     ctx.data.forEach((e) => {
    //         if (e.vars && e.vars.id === 'scrollTween') {
    //             e.kill();
    //         }
    //     });
    //     ctx.add(() => {
    //         scrollTween.current =
    //             gsap
    //                 .to(
    //                     window, {
    //                     scrollTo: { y: i * window.innerHeight, autoKill: false },
    //                     duration: 1,
    //                     id: 'scrollTween',
    //                     onComplete: () => (scrollTween.current = null),
    //                     overwrite: true,
    //                 });
    //     });
    // };

    // useLayoutEffect(() => {
    //     if (!completed) return;
    //     ctx.add(() => {
    //         const slides = gsap.utils.toArray('.slide');
    //         slides.forEach((slide, i) => {
    //             ScrollTrigger.create({
    //                 trigger: slide,
    //                 start: 'top bottom',
    //                 end: '+=100%',
    //                 onToggle: (self) =>
    //                     self.isActive && !scrollTween.current && goToSection(i),
    //             });
    //         });
    //         ScrollTrigger.create({
    //             start: 0,
    //             end: 'max',
    //             snap: {
    //                 snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
    //                 duration: 1,
    //                 ease: 'power4.inOut'
    //             }
    //         });
    //         console.log("hello?");
    //     });
    //     console.log("goodbye");
    //     return () => ctx.revert();
    // }, [completed]);

    // React Hooks
    const slideScroll = useRef();
    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // let slides = gsap.utils.toArray('.slide');
            console.log("Slides: ", slides);

            // Animation of each slide scrolling into view

            slides.forEach((slide, i) => {
                console.log(i);
                slideScroll.current = gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: slideScroll.current,
                            start: "40% 50%", // position of trigger meets the scroller position
                        }
                    })
                    .from(slide.querySelectorAll('.col__content-title'), {
                        ease: "power4",
                        x: "+=5vh",
                        duration: 2.5,
                    })
                    .from(slide.querySelectorAll('.col__content-txt'), {
                        x: 100,
                        y: 50,
                        opacity: 0,
                        duration: 2,
                        ease: "power4"
                    }, 0.4)
                    .to(slide.querySelectorAll('.slide__scroll-line'), {
                        scaleX: 0.6,
                        transformOrigin: "bottom left",
                        duration: 2.5,
                        ease: "elastic(1,0.5)"
                    }, 1.4)
            });
            console.log("slides?");
        }, el);
        console.log("Returned slides ani");
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <div className="stage" ref={slideScroll}>
            {/* <section className="intro slide--0" id="slide-0">
                <div className="intro__content" >
                    <h1 className="intro__title">Elina Yon</h1>
                    <p className="intro__txt">Hi, welcome to my website! I am a software engineer based out of the San Francisco Bay Area. Scroll through to learn more!</p>
                </div>
                <img className="intro__img intro__img--1" src="elina_bear_clear.png" />
            </section> */}
            <section className="slide slide--1" id="slide-1" >
                <div className="col col--1">
                    <h2 className="col__content-title">Background</h2>
                    <p className="col__content-txt">Education: UC Berkeley</p>
                    <div className="slide__scroll-line"></div>
                </div>
                <div className="col col--2">
                    <div className="col__image-wrap">
                        <img className="intro__img intro__img--1" src="sham-pain.jpg" />
                    </div>
                </div>
            </section>
            <section className="slide slide--2" id="slide-2" >
                <div className="col col--1">
                    <h2 className="col__content-title">Experience</h2>
                    <p className="col__content-txt">Job: Microsoft</p>
                    <div className="slide__scroll-line"></div>
                </div>
                <div className="col col--2">
                    <div className="col__image-wrap">
                        <img className="intro__img intro__img--1" src="sham-pain.jpg" />
                    </div>
                </div>
            </section>
        </div>
    )
}

function Slides() {
    const component = useRef();
    const slider = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            let slides = gsap.utils.toArray(".slide");
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: slider.current,
                        start: "40% 50%", // position of trigger meets the scroller position
                    }
                })
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
        <div className="slides" ref={component}>
            <div ref={slider}>
                <InitIntro />
                <div className="slide slide--1" id="slide-1" >
                    <div className="col col--1">
                        <h2 className="col__content-title">Background</h2>
                        <p className="col__content-txt">Education: UC Berkeley</p>
                        <div className="slide__scroll-line"></div>
                    </div>
                    <div className="col col--2">
                        <div className="col__image-wrap">
                            <img className="intro__img intro__img--1" src="sham-pain.jpg" />
                        </div>
                    </div>
                </div>
                <div className="slide orange">TWO</div>
                <div className="slide purple">THREE</div>
            </div>
            <div className="lastContainer">Last Container</div>
        </div>
    );
}

export { InitHeader, InitIntro, Slides }

// window.onload = () => {
//     init();
// };