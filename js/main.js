/* ==========================================
   GALAXYVERSE 2.0
   GLOBAL APPLICATION CONTROLLER
========================================== */

class GalaxyVerseApp {

    constructor() {

        this.initialize();

    }

    initialize() {

        this.createScrollProgress();
        this.createBackToTopButton();

        this.navbarEffects();
        this.activeNavigation();
        this.smoothAnchors();
        this.backToTop();
        this.sectionAnimations();
        this.pageTransitions();

    }

    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    navbarEffects() {

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) return;

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 50) {

                    navbar.classList.add(
                        "scrolled"
                    );

                } else {

                    navbar.classList.remove(
                        "scrolled"
                    );

                }

            }
        );

    }

    /* ==========================================
       ACTIVE PAGE
    ========================================== */

    activeNavigation() {

        const links =
            document.querySelectorAll(
                ".nav-links a"
            );

        const currentPath =
            window.location.pathname;

        links.forEach(link => {

            const href =
                link.getAttribute("href");

            if (
                href &&
                currentPath.includes(
                    href.replace("../", "")
                )
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }

    /* ==========================================
       SCROLL PROGRESS
    ========================================== */

    createScrollProgress() {

        const progress =
            document.createElement("div");

        progress.className =
            "scroll-progress";

        document.body.appendChild(
            progress
        );

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    window.scrollY;

                const docHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;

                const percentage =
                    (scrollTop /
                        docHeight) *
                    100;

                progress.style.width =
                    percentage + "%";

            }
        );

    }

    /* ==========================================
       BACK TO TOP
    ========================================== */

    createBackToTopButton() {

        const button =
            document.createElement("button");

        button.className =
            "back-to-top";

        button.innerHTML =
            "↑";

        document.body.appendChild(
            button
        );

    }

    backToTop() {

        const button =
            document.querySelector(
                ".back-to-top"
            );

        if (!button) return;

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    button.classList.add(
                        "visible"
                    );

                } else {

                    button.classList.remove(
                        "visible"
                    );

                }

            }
        );

        button.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }

    /* ==========================================
       SMOOTH ANCHORS
    ========================================== */

    smoothAnchors() {

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(anchor => {

                anchor.addEventListener(
                    "click",
                    e => {

                        e.preventDefault();

                        const target =
                            document.querySelector(
                                anchor.getAttribute(
                                    "href"
                                )
                            );

                        if (!target) return;

                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }
                );

            });

    }

    /* ==========================================
       SECTION REVEAL
    ========================================== */

    sectionAnimations() {

        const sections =
            document.querySelectorAll(
                "section"
            );

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "section-visible"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.1
                }

            );

        sections.forEach(section => {

            section.classList.add(
                "section-hidden"
            );

            observer.observe(
                section
            );

        });

    }

    /* ==========================================
       PAGE TRANSITIONS
    ========================================== */

    pageTransitions() {

        document.body.classList.add(
            "page-ready"
        );

    }

}

/* ==========================================
   START APP
========================================== */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        new GalaxyVerseApp();

    }
);

/* ==========================================
   GLOBAL UI STYLES
========================================== */

const uiStyles =
document.createElement("style");

uiStyles.textContent = `

/* Scroll Progress */

.scroll-progress{

    position:fixed;

    top:0;
    left:0;

    height:3px;

    width:0%;

    background:
        linear-gradient(
            90deg,
            #38bdf8,
            #8b5cf6
        );

    z-index:99999;
}

/* Back To Top */

.back-to-top{

    position:fixed;

    right:25px;
    bottom:25px;

    width:55px;
    height:55px;

    border:none;

    border-radius:50%;

    background:
        linear-gradient(
            135deg,
            #38bdf8,
            #8b5cf6
        );

    color:white;

    font-size:1.4rem;

    cursor:pointer;

    opacity:0;
    visibility:hidden;

    transform:
        translateY(20px);

    transition:.35s;

    z-index:2000;
}

.back-to-top.visible{

    opacity:1;

    visibility:visible;

    transform:
        translateY(0);
}

.back-to-top:hover{

    transform:
        translateY(-5px);
}

/* Section Reveal */

.section-hidden{

    opacity:0;

    transform:
        translateY(60px);

    transition:
        .9s ease;
}

.section-visible{

    opacity:1;

    transform:
        translateY(0);
}

/* Page Fade */

body{

    opacity:0;

    transition:
        opacity .5s ease;
}

body.page-ready{

    opacity:1;
}

`;

document.head.appendChild(
    uiStyles
);