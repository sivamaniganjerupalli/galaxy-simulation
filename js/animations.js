/* ==========================================
   GALAXYVERSE 2.0
   GLOBAL ANIMATION ENGINE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeScrollReveal();
    initializeCounters();
    initializeParallax();
    initializeNavbarEffects();

});

/* ==========================================
   SCROLL REVEAL
========================================== */

function initializeScrollReveal() {

    const elements = document.querySelectorAll(
        `
        .card,
        .feature-card,
        .fact-card,
        .stat-card,
        .galaxy-card,
        .planet-card,
        .blackhole-card,
        .constellation-card,
        .timeline-card,
        .gallery-card,
        .future-card,
        .myth-card,
        .compare-card
        `
    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    elements.forEach(element => {

        element.classList.add(
            "reveal-hidden"
        );

        observer.observe(
            element
        );

    });

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(
        ".stat-card h2"
    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const originalText =
                    counter.textContent.trim();

                const value =
                    parseInt(
                        originalText.replace(/\D/g, "")
                    );

                if (
                    isNaN(value) ||
                    value === 0
                ) {
                    return;
                }

                animateCounter(
                    counter,
                    value,
                    originalText
                );

                observer.unobserve(counter);

            });

        },

        {
            threshold: 0.4
        }

    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(
    element,
    target,
    originalText
) {

    let current = 0;

    const increment =
        Math.max(
            1,
            Math.floor(target / 80)
        );

    const interval = setInterval(() => {

        current += increment;

        if (current >= target) {

            element.textContent =
                originalText;

            clearInterval(interval);

            return;

        }

        element.textContent =
            current.toLocaleString();

    }, 20);

}

/* ==========================================
   PARALLAX EFFECT
========================================== */

function initializeParallax() {

    const hero =
        document.querySelector(
            ".hero"
        ) ||
        document.querySelector(
            ".solar-hero"
        ) ||
        document.querySelector(
            ".explorer-hero"
        ) ||
        document.querySelector(
            ".blackhole-hero"
        ) ||
        document.querySelector(
            ".constellation-hero"
        ) ||
        document.querySelector(
            ".timeline-hero"
        );

    if (!hero) return;

    window.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (e.clientX /
                    window.innerWidth -
                    0.5) *
                30;

            const y =
                (e.clientY /
                    window.innerHeight -
                    0.5) *
                30;

            hero.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}

/* ==========================================
   NAVBAR EFFECTS
========================================== */

function initializeNavbarEffects() {

    const navbar =
        document.querySelector(
            ".navbar"
        );

    if (!navbar) return;

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 80
            ) {

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
   PAGE FADE IN
========================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

/* ==========================================
   CSS HELPER INJECTION
========================================== */

const animationStyles =
`
.reveal-hidden{
    opacity:0;
    transform:translateY(60px);
    transition:
        opacity .8s ease,
        transform .8s ease;
}

.reveal-visible{
    opacity:1;
    transform:translateY(0);
}

body{
    opacity:0;
    transition:opacity .6s ease;
}

body.page-loaded{
    opacity:1;
}
`;

const style =
document.createElement("style");

style.textContent =
animationStyles;

document.head.appendChild(
    style
);