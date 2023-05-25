import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import './Slides.css';
import {
    MDBFooter,
    MDBIcon,
    Menu, MenuItem
} from './libraries';

console.clear();

let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);

const Header = () => {

    // animate the logo and fake burger button into place

    // React Hooks
    const tl = useRef();
    const el = useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openLink = (url) => {
        window.open(url, "_blank");
        setAnchorEl(null);
    }

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
            <a href="#"
                className="nav-btn"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <svg className="nav-btn__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 30">
                    <rect className="nav-rect" width="40" height="2" x="8" y="8" fill="#242423" />
                    <rect className="nav-rect" width="40" height="2" x="8" y="14" fill="#242423" />
                    <rect width="40" height="2" x="8" y="20" fill="#242423" />
                </svg>
            </a>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    style={{fontFamily: "serif"}}
                    onClick={() =>
                        openLink("https://drive.google.com/file/d/1Y0FGDooIDGQsstyGfsRzhqMZfzeZBwJ3/view?usp=share_link")}>
                    Cover Letter
                </MenuItem>
                <MenuItem
                    style={{fontFamily: "serif"}}
                    onClick={() =>
                        openLink("https://drive.google.com/file/d/1TCHsAmfyuVZAyfc4LBAueKk72AhzBPju/view?usp=share_link")}>
                    Resume
                </MenuItem>
            </Menu>
        </header>
    );
}

const IntroSlide = () => {
    // React Hooks
    const tl = useRef();
    const el = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // animate the intro elements into place
            gsap
                .timeline({ delay: 1.2 })
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
                    duration: 6
                }, 1);
            let intro = select('.intro');
            // set up scrollTrigger animation for the when the intro scrolls out
            gsap
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
        return () => ctx.revert(); // <- Cleanup!
    }, []);

    return (
        <section className="intro slide slide--0" id="slide-0" ref={el}>
            <div className="intro__content" >
                <h1 className="intro__title">Elina Yon</h1>
                <div className="intro__txt">
                    <h1 className="intro__heading"><span className="emphasize">hi!</span></h1>
                    <p>
                        My name is <span className="emphasize">Elina</span> and  <br />
                        I am a <span className="emphasize">software engineer</span> based out of the <br />
                        <span className="emphasize"> San Francisco Bay Area</span>. <br />
                        Scroll through to learn more!
                    </p>
                </div>
            </div>
            <img className="intro__img intro__img--1" src="elina_bear_clear.png"/>
        </section>

    );
}

function Slides() {
    const component = useRef();
    const tl = useRef();
    const stl = useRef();
    const slider = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            let slides = gsap.utils.toArray(".slide");
            let imageWrappers = gsap.utils.toArray('.col__image-wrap');

            slides.forEach((slide, i) => {
                // console.log(slider.current);
                tl.current = gsap.timeline({
                    duration: 3,
                    scrollTrigger: {
                        trigger: slide,
                        scrub: 1,
                        start: "left 10%", // position of trigger meets the scroller position
                        end: slide.offsetWidth
                    }
                })
                    .fromTo(slide.querySelectorAll('.col__content-title'), {
                        x: 0
                    }, {
                        x: "-5vw",
                        duration: 3,
                        ease: "power4.in"
                    })
                    .to(slide.querySelectorAll('.col__content-title-centered'), {
                        x: "30vw",
                        duration: 3,
                        ease: "power4.in"
                    })
                    .fromTo(slide.querySelectorAll('.col__content-txt'), {
                        y: 0
                    }, {
                        y: "5vh",
                        duration: 3,
                        ease: "power4.in"
                    })
                    .fromTo(slide.querySelectorAll('.col__content-txt-med'), {
                        y: 0
                    }, {
                        y: "5vh",
                        duration: 3,
                        ease: "power4.in"
                    })
                    .fromTo(slide.querySelectorAll('.col__image-wrap'), {
                        x: "-30vw"
                    }, {
                        x: "-10vw",
                        duration: 5,
                        ease: "power4.in"
                    });
            });


            tl.current = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: slider.current,
                        start: "top 75%", // position of trigger meets the scroller position
                    }
                })
                .to(slides,
                    {
                        xPercent: -100 * (slides.length - 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: slider.current,
                            pin: true,
                            // scrub: 0.8,
                            scrub: true,
                            snap: 1 / (slides.length - 1),
                            end: () => "+=" + slider.current.offsetWidth
                        }
                    }
                );
        }, component);
        return () => ctx.revert();
    });

    return (
        <div ref={component}>
            <div className="slides" ref={slider}>
                <IntroSlide />
                <div className="slide slide--1" id="slide-1">
                    <div className="col col--1">
                        <div className="col__content col__content--1">
                            <h2 className="col__content-title">Background</h2>
                            <div className="col__content-wrap">
                                <p className="col__content-txt">
                                    I've been in the Silicon Valley my entire life, and I graduated from <span className="emphasize">UC Berkeley</span> with a major
                                    in <span className="emphasize">Computer Science </span>
                                    and a minor in <span className="emphasize">Statistics</span> in the Spring of 2021.
                                    I got the opportunity to work with lots of amazing faculty and peers, while in leadership of a ML club
                                    called <span className="emphasize">Launchpad</span> and while performing research with the <span className="emphasize">School of Public Health</span>.
                                    <br /> <br />
                                    My interests in the field remain vast, eager to apply my statistics and data science background
                                    in backend but also excited to develop my full stack skillset in my career.
                                </p>
                            </div>

                            {/* <div className="slide__scroll-line"></div> */}
                        </div>
                    </div>
                    <div className="col col--2">
                        <div className="col--2__content-wrap">
                            <p className="col__content-txt">
                                Outside of work, I love spending time with my friends and family (four legged emphasized) with coffee, and playing volleyball ◡̈
                            </p>
                        </div>
                        <div className="col__image-wrap">
                            <img className="img" src="sham-pain.jpg" />
                        </div>
                    </div>
                </div>
                <div className="slide slide--2" id="slide-2">
                    <div className="col col--1">
                        <div className="col__content col__content--2">
                            <h2 className="col__content-title-centered">Experience</h2>
                            <div className="col__content-wrap">
                                <p className="col__content-txt-med">
                                    <span className="emphasize sub">Microsoft</span>  <br />
                                    <span className="emphasize">Software Engineer </span>  <br />
                                    June 2021 - Oct 2022 <br />
                                    At Microsoft, I gained experience working on a multiservice product within the Modern Life Experiences
                                    (MLX) organization in the Family Safety team. I largely worked as a backend engineer supporting and creating new APIs
                                    for our client teams to use while maintaining the health and load of our data centers.  <br />
                                    I was also given the responsibility to clean and analyze our backend services data in order to streamline
                                    our problem solving and engineering efforts in the right problem areas. I used Cosmos SCOPE and Azure Synapse
                                    to stream and clean the data, and ran analyses in Python. <br /> <br />
                                    <span className="emphasize">Software Engineer Intern</span>  <br />
                                    May 2020 - Aug 2020 <br />
                                    Worked with the Intelligent Communication and Conversation Cloud team as a fullstack engineer building a
                                    automatic call service design system using C#. Implemented and finished a drag and drop UI to set up a call redirection
                                    flow.
                                </p>
                            </div>

                            {/* <div className="slide__scroll-line"></div> */}
                        </div>
                    </div>
                    <div className="col col--2">
                        <div className="col__image-wrap">
                            <img className="img" src="elina-coffee.jpeg" />
                        </div>
                    </div>
                </div>
                <div className="slide slide--3" id="slide-3">
                    <div className="col col--1">
                        <div className="col__content col__content--3">
                            {/* <h2 className="col__content-title">Experience</h2> */}
                            <div className="col__content-wrap">
                                <p className="col__content-txt-med">
                                    <span className="emphasize sub">UC Berkeley School of Public Health</span>  <br /> <br />
                                    <span className="emphasize">Data Analyst, Software Engineer</span>  <br />
                                    Dec 2017 - May 2019 <br />
                                    Utilizing Google search data to analyze correlations between Google search behavior and
                                    women's reproductive rights laws between US states.
                                    Published <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7241764/">research papers </a>
                                    describing the methodology used to produce the research and the analyses. <br />
                                    <a href="https://orcid.org/0000-0002-0811-0664">Orcid link here</a>.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col col--2">
                        <p className="content__end-txt">
                            Check out my LinkedIn and GitHub profiles!
                        </p>
                        <div className="col__image-wrap transform_up">
                            <img className="img" src="teddy_bye.jpeg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <MDBFooter>
            <section style={{
                position: "fixed",
                right: 0,
                bottom: 0
            }}>
                <div className="icon__bar">
                    <a href='https://www.linkedin.com/in/elinayon/' className='me-4 text-reset'>
                        <MDBIcon fab icon="linkedin" style={{ margin: "5px" }} />
                    </a>
                    <a href='https://github.com/elinayon' className='me-4 text-reset'>
                        <MDBIcon fab icon="github" style={{ margin: "5px" }} />
                    </a>
                </div>
            </section>
        </MDBFooter>
    );
}

function Slide({ i, title, txt, imgSrc }) {
    const el = useRef();
    const tl = useRef();
    // const stl = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            let imageWrappers = gsap.utils.toArray('.col__image-wrap');

            // set up scrollTrigger animation for the when the intro scrolls out
            tl.current = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: el.current,
                        start: "bottom bottom"
                    }
                })
                .from(('.col__content-title'), {
                    ease: "power4",
                    y: "+=5vh",
                    duration: 2.5,
                })
                .from(('.col__content-txt'), {
                    x: "+=2vw",
                    duration: 2,
                    ease: "power4"
                }, 0.4);
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div className={`slide slide--${i}`} id={`slide-${i}`} ref={el}>
            <div className="col col--1">
                <div className={`col__content col__content--${i}`}>
                    <h2 className="col__content-title">{title}</h2>
                    <div className="col__content-wrap">
                        <p className="col__content-txt">
                            {txt}
                        </p>
                    </div>

                    {/* <div className="slide__scroll-line"></div> */}
                </div>
            </div>
            <div className="col col--2">
                <div className="col__image-wrap">
                    <img className="img img--1" src={imgSrc} />
                </div>
            </div>
        </div>
    );
}

export { Header, Slides, Footer };