/* ==========================================
   GALAXYVERSE 2.0
   NASA GRADE BLACK HOLE LAB
   PART 1
   CONFIG + DOM + DATA LOADING
========================================== */

/* ==========================================
   GLOBAL STATE
========================================== */

let allBlackHoles = [];
let filteredBlackHoles = [];
let currentBlackHole = null;

/* ==========================================
   DOM ELEMENTS
========================================== */

const blackholeContainer =
    document.getElementById(
        "blackholeContainer"
    );

const blackholeSearch =
    document.getElementById(
        "blackholeSearch"
    );

const blackholeModal =
    document.getElementById(
        "blackholeModal"
    );

const blackholeModalBody =
    document.getElementById(
        "blackholeModalBody"
    );

const closeBlackholeModal =
    document.getElementById(
        "closeBlackholeModal"
    );

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeBlackHoleLab();
    }
);

/* ==========================================
   APP START
========================================== */

async function initializeBlackHoleLab(){

    await loadBlackHoles();

    initializeSearch();

    initializeKeyboardShortcuts();

    initializeAnimations();
}

/* ==========================================
   LOAD DATA
========================================== */

async function loadBlackHoles(){

    try{

        const response =
            await fetch(
                "../data/blackholes.json"
            );

        if(!response.ok){

            throw new Error(
                "Failed to fetch black hole data"
            );
        }

        const data =
            await response.json();

        allBlackHoles = data;

        filteredBlackHoles = [...data];

        renderBlackHoles(
            filteredBlackHoles
        );

        updateStatistics();

        console.log(
            `Loaded ${data.length} black holes`
        );
    }

    catch(error){

        console.error(
            "Black Hole Data Error:",
            error
        );

        showErrorState();
    }
}

/* ==========================================
   ERROR STATE
========================================== */

function showErrorState(){

    if(!blackholeContainer) return;

    blackholeContainer.innerHTML = `

        <div class="error-card">

            <h2>
                Data Transmission Error
            </h2>

            <p>

                Unable to establish connection
                with the Galactic Database.

            </p>

            <button
                class="blackhole-btn"
                onclick="location.reload()"
            >
                Retry Mission
            </button>

        </div>

    `;
}

/* ==========================================
   UPDATE STATS
========================================== */

function updateStatistics(){

    const cards =
        document.querySelectorAll(
            ".stats-section .stat-card h2"
        );

    if(cards.length === 0) return;

    animateCounter(
        cards[0],
        allBlackHoles.length
    );
}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(
    element,
    target
){

    let current = 0;

    const increment =
        target / 40;

    const timer =
        setInterval(() => {

            current += increment;

            if(current >= target){

                current = target;

                clearInterval(timer);
            }

            element.textContent =
                Math.floor(current);

        }, 30);
}

/* ==========================================
   SEARCH SYSTEM
========================================== */

function initializeSearch(){

    if(!blackholeSearch) return;

    blackholeSearch.addEventListener(
        "input",
        debounce(searchBlackHoles, 300)
    );
}

function searchBlackHoles(){

    const query =
        blackholeSearch.value
            .trim()
            .toLowerCase();

    if(!query){

        filteredBlackHoles =
            [...allBlackHoles];

        renderBlackHoles(
            filteredBlackHoles
        );

        return;
    }

    filteredBlackHoles =
        allBlackHoles.filter(
            blackhole =>

                blackhole.name
                    .toLowerCase()
                    .includes(query)

                ||

                blackhole.type
                    .toLowerCase()
                    .includes(query)

                ||

                blackhole.mass
                    .toLowerCase()
                    .includes(query)

                ||

                blackhole.distance
                    .toLowerCase()
                    .includes(query)
        );

    renderBlackHoles(
        filteredBlackHoles
    );
}

/* ==========================================
   DEBOUNCE
========================================== */

function debounce(
    callback,
    delay
){

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout =
            setTimeout(() => {

                callback(...args);

            }, delay);
    };
}
/* ==========================================
   NASA GRADE RENDER ENGINE
   PART 2
   CARD GENERATION + GRID SYSTEM
========================================== */

/* ==========================================
   RENDER BLACK HOLES
========================================== */

function renderBlackHoles(
    blackholes
){

    if(!blackholeContainer) return;

    if(
        !blackholes ||
        blackholes.length === 0
    ){

        renderEmptyState();

        return;
    }

    blackholeContainer.innerHTML =
        blackholes
            .map(
                blackhole =>
                    createBlackHoleCard(
                        blackhole
                    )
            )
            .join("");

    initializeCardAnimations();
}

/* ==========================================
   CARD TEMPLATE
========================================== */

function createBlackHoleCard(
    blackhole
){

    return `

    <article
        class="blackhole-card"
        data-id="${blackhole.id}"
    >

        <div class="blackhole-image">

            <img
                src="${blackhole.image}"
                alt="${blackhole.name}"
                loading="lazy"
            >

        </div>

        <div class="blackhole-content">

            <h3>

                ${blackhole.name}

            </h3>

            <p>

                ${blackhole.type}

            </p>

            <div
                class="blackhole-meta"
            >

                <span>

                    <strong>
                        Mass
                    </strong>

                    ${blackhole.mass}

                </span>

                <span>

                    <strong>
                        Distance
                    </strong>

                    ${blackhole.distance}

                </span>

            </div>

            <button
                class="blackhole-btn"
                onclick="openBlackHoleModal(${blackhole.id})"
            >

                Explore Black Hole

            </button>

        </div>

    </article>

    `;
}

/* ==========================================
   EMPTY SEARCH STATE
========================================== */

function renderEmptyState(){

    blackholeContainer.innerHTML = `

        <div
            class="empty-state"
            style="
                grid-column:1/-1;
                text-align:center;
                padding:5rem 2rem;
            "
        >

            <h2>

                No Black Holes Found

            </h2>

            <p>

                Try searching using
                another keyword.

            </p>

        </div>

    `;
}

/* ==========================================
   CARD ANIMATIONS
========================================== */

function initializeCardAnimations(){

    const cards =
        document.querySelectorAll(
            ".blackhole-card"
        );

    cards.forEach(
        (
            card,
            index
        ) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(40px)";

            setTimeout(() => {

                card.style.transition =
                    "all .6s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            }, index * 80);
        }
    );
}

/* ==========================================
   INTERSECTION REVEAL
========================================== */

function initializeAnimations(){

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "visible"
                            );
                        }
                    }
                );

            },

            {
                threshold:0.15
            }
        );

    document
        .querySelectorAll(
            ".stat-card, .fact-card"
        )
        .forEach(
            element => {

                observer.observe(
                    element
                );
            }
        );
}

/* ==========================================
   CARD CLICK SUPPORT
========================================== */

document.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                ".blackhole-card"
            );

        if(
            !card ||
            event.target.closest(
                ".blackhole-btn"
            )
        ){

            return;
        }

        const id =
            Number(
                card.dataset.id
            );

        openBlackHoleModal(id);
    }
);

/* ==========================================
   GET BLACK HOLE
========================================== */

function getBlackHoleById(
    id
){

    return allBlackHoles.find(
        blackhole =>
            blackhole.id === id
    );
}
/* ==========================================
   NASA GRADE MODAL SYSTEM
   PART 3
   MODAL + DETAILS VIEW
========================================== */

/* ==========================================
   OPEN MODAL
========================================== */

function openBlackHoleModal(
    id
){

    const blackhole =
        getBlackHoleById(id);

    if(!blackhole) return;

    currentBlackHole =
        blackhole;

    populateModal(
        blackhole
    );

    blackholeModal.style.display =
        "flex";

    requestAnimationFrame(() => {

        blackholeModal.style.opacity =
            "1";
    });

    document.body.style.overflow =
        "hidden";
}

/* ==========================================
   POPULATE MODAL
========================================== */

function populateModal(
    blackhole
){

    blackholeModalBody.innerHTML = `

    <div class="modal-grid">

        <img
            src="${blackhole.image}"
            alt="${blackhole.name}"
            class="modal-image"
        >

        <div class="modal-details">

            <h2>

                ${blackhole.name}

            </h2>

            <div class="modal-type">

                ${blackhole.type}

            </div>

            <p>

                ${blackhole.description}

            </p>

            <div class="info-grid">

                <div class="info-card">

                    <span>
                        Mass
                    </span>

                    <strong>
                        ${blackhole.mass}
                    </strong>

                </div>

                <div class="info-card">

                    <span>
                        Distance
                    </span>

                    <strong>
                        ${blackhole.distance}
                    </strong>

                </div>

                <div class="info-card">

                    <span>
                        Diameter
                    </span>

                    <strong>
                        ${blackhole.diameter}
                    </strong>

                </div>

                <div class="info-card">

                    <span>
                        Discovered
                    </span>

                    <strong>
                        ${blackhole.discovered}
                    </strong>

                </div>

            </div>

            <div class="description">

                <p>

                    ${blackhole.description}

                </p>

            </div>

            <div class="fact-highlight">

                <h4>

                    Scientific Highlight

                </h4>

                <p>

                    ${
                        blackhole.fact ||
                        "Black holes are among the most extreme objects known in the observable universe."
                    }

                </p>

            </div>

        </div>

    </div>

    `;

    animateModalContent();
}

/* ==========================================
   MODAL CONTENT ANIMATION
========================================== */

function animateModalContent(){

    const modalGrid =
        blackholeModalBody.querySelector(
            ".modal-grid"
        );

    if(!modalGrid) return;

    modalGrid.style.opacity = "0";

    modalGrid.style.transform =
        "translateY(20px)";

    requestAnimationFrame(() => {

        modalGrid.style.transition =
            "all .4s ease";

        modalGrid.style.opacity =
            "1";

        modalGrid.style.transform =
            "translateY(0)";
    });
}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal(){

    if(!blackholeModal) return;

    blackholeModal.style.opacity =
        "0";

    setTimeout(() => {

        blackholeModal.style.display =
            "none";

    }, 250);

    document.body.style.overflow =
        "";

    currentBlackHole = null;
}

/* ==========================================
   CLOSE BUTTON
========================================== */

if(closeBlackholeModal){

    closeBlackholeModal.addEventListener(
        "click",
        closeModal
    );
}

/* ==========================================
   OUTSIDE CLICK
========================================== */

window.addEventListener(
    "click",
    event => {

        if(
            event.target ===
            blackholeModal
        ){

            closeModal();
        }
    }
);

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

function initializeKeyboardShortcuts(){

    document.addEventListener(
        "keydown",
        event => {

            if(
                event.key ===
                "Escape"
            ){

                closeModal();
            }
        }
    );
}

/* ==========================================
   MODAL NAVIGATION DATA
========================================== */

function getCurrentIndex(){

    return allBlackHoles.findIndex(
        blackhole =>
            blackhole.id ===
            currentBlackHole?.id
    );
}

/* ==========================================
   NEXT BLACK HOLE
========================================== */

function openNextBlackHole(){

    if(!currentBlackHole) return;

    const index =
        getCurrentIndex();

    const nextIndex =
        (index + 1) %
        allBlackHoles.length;

    openBlackHoleModal(
        allBlackHoles[
            nextIndex
        ].id
    );
}

/* ==========================================
   PREVIOUS BLACK HOLE
========================================== */

function openPreviousBlackHole(){

    if(!currentBlackHole) return;

    const index =
        getCurrentIndex();

    const previousIndex =
        (
            index -
            1 +
            allBlackHoles.length
        ) %
        allBlackHoles.length;

    openBlackHoleModal(
        allBlackHoles[
            previousIndex
        ].id
    );
}
/* ==========================================
   NASA GRADE ENHANCEMENTS
   PART 4
   EFFECTS + TOASTS + FINAL SYSTEMS
========================================== */

/* ==========================================
   OBSERVATORY EFFECTS
========================================== */

function initializeObservatoryEffects(){

    createFloatingParticles();

    animateBlackHoleHero();
}

/* ==========================================
   FLOATING PARTICLES
========================================== */

function createFloatingParticles(){

    const hero =
        document.querySelector(
            ".blackhole-hero"
        );

    if(!hero) return;

    for(
        let i = 0;
        i < 25;
        i++
    ){

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "floating-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.animationDuration =
            10 +
            Math.random() * 20 +
            "s";

        hero.appendChild(
            particle
        );
    }
}

/* ==========================================
   HERO PARALLAX
========================================== */

function animateBlackHoleHero(){

    const hero =
        document.querySelector(
            ".blackhole-animation"
        );

    if(!hero) return;

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) - 0.5;

            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) - 0.5;

            hero.style.transform =

                `translate(
                    ${x * 15}px,
                    ${y * 15}px
                )`;
        }
    );
}

/* ==========================================
   SEARCH HIGHLIGHT
========================================== */

function highlightSearchResults(){

    const query =
        blackholeSearch?.value
            ?.trim()
            ?.toLowerCase();

    if(!query) return;

    const titles =
        document.querySelectorAll(
            ".blackhole-content h3"
        );

    titles.forEach(
        title => {

            const original =
                title.textContent;

            if(
                original
                    .toLowerCase()
                    .includes(query)
            ){

                const regex =
                    new RegExp(
                        `(${query})`,
                        "gi"
                    );

                title.innerHTML =
                    original.replace(
                        regex,
                        `<mark>$1</mark>`
                    );
            }
        }
    );
}

/* ==========================================
   TOAST SYSTEM
========================================== */

function showToast(
    message
){

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "gv-toast";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    requestAnimationFrame(() => {

        toast.classList.add(
            "show"
        );
    });

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3000);
}

/* ==========================================
   INFORMATION TOASTS
========================================== */

function showMissionReady(){

    showToast(
        "Black Hole Laboratory Ready"
    );
}

/* ==========================================
   PERFORMANCE OPTIMIZATION
========================================== */

function lazyLoadImages(){

    const images =
        document.querySelectorAll(
            "img[loading='lazy']"
        );

    if(
        !(
            "IntersectionObserver"
            in
            window
        )
    ) return;

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if(
                            entry.isIntersecting
                        ){

                            const img =
                                entry.target;

                            img.classList.add(
                                "loaded"
                            );

                            observer.unobserve(
                                img
                            );
                        }
                    }
                );

            }

        );

    images.forEach(
        image => {

            observer.observe(
                image
            );
        }
    );
}

/* ==========================================
   SCROLL REVEALS
========================================== */

function initializeScrollReveals(){

    const elements =
        document.querySelectorAll(

            ".blackhole-card,\
             .fact-card,\
             .simulation-card,\
             .stat-card"

        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "revealed"
                            );
                        }
                    }
                );

            },

            {
                threshold:0.1
            }
        );

    elements.forEach(
        element => {

            observer.observe(
                element
            );
        }
    );
}

/* ==========================================
   SEARCH EVENT ENHANCEMENT
========================================== */

if(blackholeSearch){

    blackholeSearch.addEventListener(
        "input",
        () => {

            setTimeout(() => {

                highlightSearchResults();

            }, 50);
        }
    );
}

/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener(
    "resize",
    debounce(
        () => {

            console.log(
                "Observatory recalibrated"
            );

        },
        250
    )
);

/* ==========================================
   FINAL BOOT SEQUENCE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeObservatoryEffects();

        initializeScrollReveals();

        lazyLoadImages();

        setTimeout(
            showMissionReady,
            1200
        );
    }
);

/* ==========================================
   GLOBAL ACCESS
========================================== */

window.openBlackHoleModal =
    openBlackHoleModal;

window.closeBlackholeModal =
    closeModal;


const starfield =
document.getElementById(
    "blackhole-starfield"
);

if(starfield){

    for(let i=0;i<1500;i++){

        const star =
        document.createElement("span");

        star.className =
        "blackhole-star";

        const size =
        Math.random()*2 + .5;

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
/* ==========================================
   END OF BLACKHOLE.JS
========================================== */