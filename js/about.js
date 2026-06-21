/* ==========================================
   NASA STARFIELD
========================================== */

function createStarfield(){

    const starfield =
        document.getElementById(
            "about-starfield"
        );

    if(!starfield) return;

    for(let i=0;i<1500;i++){

        const star =
            document.createElement(
                "span"
            );

        star.className =
            "about-star";

        const random =
            Math.random();

        let size;

        if(random < 0.75){

            size =
                Math.random() * 1.2 + .5;

        }

        else if(random < .95){

            size =
                Math.random() * 2 + 1.2;

        }

        else{

            size =
                Math.random() * 3 + 2.5;
        }

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.left =
            `${Math.random()*100}%`;

        star.style.top =
            `${Math.random()*100}%`;

        star.style.opacity =
            Math.random();

        star.style.setProperty(

            "--twinkle",

            `${3 + Math.random()*8}s`

        );

        starfield.appendChild(
            star
        );

    }

}

createStarfield();

/* ==========================================
   SCROLL REVEAL
========================================== */

function initializeReveal(){

    const revealElements =

        document.querySelectorAll(

            ".stat-card," +

            ".feature-card," +

            ".tech-grid span," +

            ".creator-card," +

            ".roadmap-card," +

            ".mission-card"

        );

    const observer =

        new IntersectionObserver(

            entries=>{

                entries.forEach(

                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.animate(

                                [

                                    {
                                        opacity:0,
                                        transform:
                                        "translateY(60px)"
                                    },

                                    {
                                        opacity:1,
                                        transform:
                                        "translateY(0)"
                                    }

                                ],

                                {
                                    duration:800,
                                    easing:"ease-out",
                                    fill:"forwards"
                                }

                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }

                );

            },

            {
                threshold:.15
            }

        );

    revealElements.forEach(

        element=>{

            element.style.opacity =
                "0";

            observer.observe(
                element
            );

        }

    );

}

initializeReveal();
/* ==========================================
   ANIMATED COUNTERS
========================================== */

function initializeCounters(){

    const statNumbers =

        document.querySelectorAll(
            ".stat-card h2"
        );

    const observer =

        new IntersectionObserver(

            entries=>{

                entries.forEach(

                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            const element =
                                entry.target;

                            const originalText =
                                element.textContent;

                            const numericValue =
                                parseInt(
                                    originalText
                                );

                            if(
                                !isNaN(
                                    numericValue
                                )
                            ){

                                let count = 0;

                                const increment =

                                    Math.ceil(
                                        numericValue / 50
                                    );

                                const counter =

                                    setInterval(()=>{

                                        count +=
                                            increment;

                                        if(
                                            count >=
                                            numericValue
                                        ){

                                            element.textContent =
                                                originalText;

                                            clearInterval(
                                                counter
                                            );

                                        }

                                        else{

                                            if(
                                                originalText.includes("+")
                                            ){

                                                element.textContent =
                                                    count + "+";
                                            }

                                            else{

                                                element.textContent =
                                                    count;
                                            }

                                        }

                                    },30);

                            }

                            observer.unobserve(
                                element
                            );

                        }

                    }

                );

            },

            {
                threshold:.5
            }

        );

    statNumbers.forEach(

        stat=>{

            observer.observe(
                stat
            );

        }

    );

}

initializeCounters();

/* ==========================================
   HERO PARALLAX
========================================== */

const heroVisual =

    document.querySelector(
        ".hero-visual"
    );

document.addEventListener(

    "mousemove",

    e=>{

        if(!heroVisual) return;

        const x =

            (
                window.innerWidth / 2
                -
                e.clientX
            ) / 40;

        const y =

            (
                window.innerHeight / 2
                -
                e.clientY
            ) / 40;

        heroVisual.style.transform =

            `translate(${x}px,${y}px)`;

    }

);

/* ==========================================
   SMOOTH SCROLL
========================================== */

document

.querySelectorAll(
    'a[href^="#"]'
)

.forEach(

    anchor=>{

        anchor.addEventListener(

            "click",

            function(e){

                e.preventDefault();

                const target =

                    document.querySelector(

                        this.getAttribute(
                            "href"
                        )

                    );

                if(target){

                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }

            }

        );

    }

);

/* ==========================================
   FLOATING ROADMAP
========================================== */

const roadmapCards =

    document.querySelectorAll(
        ".roadmap-card"
    );

roadmapCards.forEach(

    (card,index)=>{

        card.style.animation =

            `floatCard ${
                4 + index * .5
            }s ease-in-out infinite`;

    }

);

/* ==========================================
   FLOATING KEYFRAME
========================================== */

const floatingStyle =

    document.createElement(
        "style"
    );

floatingStyle.innerHTML =

`
@keyframes floatCard{

    0%,100%{

        transform:
            translateY(0);
    }

    50%{

        transform:
            translateY(-10px);
    }
}
`;

document.head.appendChild(
    floatingStyle
);

/* ==========================================
   MOUSE GLOW EFFECT
========================================== */

const glow =

    document.createElement(
        "div"
    );

glow.style.position =
    "fixed";

glow.style.width =
    "300px";

glow.style.height =
    "300px";

glow.style.borderRadius =
    "50%";

glow.style.pointerEvents =
    "none";

glow.style.zIndex =
    "-1";

glow.style.filter =
    "blur(100px)";

glow.style.background =

    "rgba(96,165,250,.12)";

document.body.appendChild(
    glow
);

document.addEventListener(

    "mousemove",

    e=>{

        glow.style.left =
            `${e.clientX - 150}px`;

        glow.style.top =
            `${e.clientY - 150}px`;

    }

);

/* ==========================================
   PAGE READY
========================================== */

window.addEventListener(

    "load",

    ()=>{

        document.body.classList.add(
            "loaded"
        );

        console.log(
            "GalaxyVerse About Page Loaded"
        );

    }

);