import React, { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from './libraries';
import './ParallaxBody.css';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(SplitText);
// gsap.registerPlugin(ScrollSmoother);

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

    useLayoutEffect( () => {
        let ctx = gsap.context ( () => {
            tl.current = gsap
            .timeline({delay: 0.5})
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
        <header class="header" ref={el}>
            <div class="logo">Elina Yon</div>
            <a href="#" class="nav-btn">
                <svg class="nav-btn__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 30">
                    <rect class="nav-rect" width="40" height="2" x="8" y="8" fill="#242423" />
                    <rect class="nav-rect" width="40" height="2" x="8" y="14" fill="#242423" />
                    <rect width="40" height="2" x="8" y="20" fill="#242423" />
                </svg>
            </a>
        </header>
    );
}

const InitIntro = () => {
    // React Hooks
    const tl = useRef();
    const el = useRef();
    const stl = useRef();

    useLayoutEffect( () => {
        const ctx = gsap.context ( () => {

            // animate the intro elements into place
            tl.current = gsap
            .timeline({delay: 1.2})
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

            // set up scrollTrigger animation for the when the intro scrolls out
            stl.current = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.intro',
                    scrub: 1,
                    start: "top bottom", // position of trigger meets the scroller position
                    end: "bottom top"
                }
            })
            .to('.intro__title', {
                x: 400,
                ease: 'power4.in',
                duration: 3,
                
            })
            .to('.intro__txt', {
                y: 100,
                ease: 'power4.in',
                duration: 3,
            }, 0);
        }, el);
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <div class="intro slide--0" id="slide-0" ref={el}>
            <div class="intro__content" >
                <h1 class="intro__title">Elina Yon</h1>
                <p class="intro__txt">Duda is going from strength to strength. Whether it’s in the prestigious gallery in the new World Trade Centre in New York or at an international art fair in Chicago or Hong Kong, people recognize the original response to life in Duda’s work, and go away feeling animated and energized by his vibrant creations.</p>
            </div>
            <img class="intro__img intro__img--1" src="elina_bear_clear.png" />
        </div>
    );
}

function initLinks() {
    
    // ScrollToPlugin links
    
    links.forEach((link, index, e) => {     
        
        let linkST = link.querySelector('.slide__scroll-line');
        
        link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 2, 
                scrollTo:{
                    y: "#slide-" + (index + 2)
                },
                ease: "power2.inOut"
            });
            slideID++;
        });
        
        link.addEventListener("mouseover", (e) => {
            gsap.to(linkST, {
                y:40,
                transformOrigin: "bottom center",
                duration: 0.6, 
                ease: "power4"
            });
        });
        
        link.addEventListener("mouseout", (e) => {
            gsap.to(linkST, {
                y: 0,
                transformOrigin: "bottom center",
                duration: 0.6, 
                ease: "power4"
            });
        });
        
    });
    
    // ScrollToPlugin link back to the top
    
    let top = select('.footer__link-top');
    
    top.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTop();
    });
    
    top.addEventListener("mouseover", (e) => {
        gsap.to('.footer__link-top-line', {
            scaleY: 3,
            transformOrigin: "bottom center",
            duration: 0.6, 
            ease: "power4"
        });
    });
    
    top.addEventListener("mouseout", (e) => {
        gsap.to('.footer__link-top-line', {
            scaleY: 1,
            transformOrigin: "bottom center",
            duration: 0.6, 
            ease: "power4"
        });
    });
    
    // Dummy slide links
    
    let slideLinks = selectAll('.slide-link');
    
    slideLinks.forEach((slideLink, index, e) => {
        
        let slideL = slideLink.querySelector('.slide-link__line');
        
        slideLink.addEventListener("mouseover", (e) => {
            gsap.to(slideL, {
                x: 20,
                scaleX: 0.3,
                transformOrigin: "right center",
                duration: 0.8, 
                ease: "power4"
            });
        });
        slideLink.addEventListener("mouseout", (e) => {
            gsap.to(slideL, {
                x: 0,
                scaleX: 1,
                transformOrigin: "right center",
                duration: 0.8, 
                ease: "power4"
            });
        });
    })
}

function initSlides() {
    
    // Animation of each slide scrolling into view
    
    slides.forEach((slide, i) => {   
        
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "40% 50%", // position of trigger meets the scroller position
            }
        });
 
        tl.from(slide.querySelectorAll('.col__content-title'), {
            ease: "power4",
            y: "+=5vh",
            duration: 2.5,
        })
        .from(slide.querySelectorAll('.line__inner'), {
            y: 200,
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
            y: 200,
            duration: 3,
            ease: "power4"
        }, 0.4)
        .to(slide.querySelectorAll('.slide__scroll-line'), {
            scaleY: 0.6,
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
}

function initParallax() {
    
    slides.forEach((slide, i) => {
        let imageWrappers = slide.querySelectorAll('.col__image-wrap');
        
        gsap.fromTo(imageWrappers, {
            y: "-30vh"
        },{
            y: "30vh",
            scrollTrigger: {
                trigger: slide,
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
}

function scrollTop() {
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
}

function initKeys() {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if(e.key === 40) { //down arrow to next slide
            if(slideID <= slides.length) {
                slideID++;
                gsap.to(window, {
                    duration: 2, 
                    scrollTo:{
                        y: "#slide-" + slideID 
                    },
                    ease: "power2.inOut"
                });
            }
        }
        else if(e.key === 38) { // up arrow to top
            slideID = 0;
            scrollTop();
        }
    });
}

function init() {
    gsap.set(stage, { autoAlpha: 1 });
    InitHeader();
    InitIntro();
	initLinks();
	initSlides();
	initParallax();
    initKeys();
}

window.onload = () => {
	init();
};

export default function ParallaxBody() {
    return (
        <div class="stage">
            <InitHeader/>
            <InitIntro/>
        </div>
    );
  }