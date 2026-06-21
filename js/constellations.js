/* ==========================================
   GALAXYVERSE
   CONSTELLATIONS EXPLORER
   NASA GRADE VERSION
========================================== */

/* ==========================================
   GLOBAL DATA
========================================== */

let allConstellations = [];
let filteredConstellations = [];

/* ==========================================
   DOM ELEMENTS
========================================== */

const constellationContainer =
    document.getElementById(
        "constellationContainer"
    );

const constellationSearch =
    document.getElementById(
        "constellationSearch"
    );

const constellationModal =
    document.getElementById(
        "constellationModal"
    );

const constellationModalBody =
    document.getElementById(
        "constellationModalBody"
    );

const closeConstellationModal =
    document.getElementById(
        "closeConstellationModal"
    );

const starMap =
    document.querySelector(
        ".star-map"
    );

/* ==========================================
   APPLICATION STATE
========================================== */

const state = {

    loaded : false,

    activeConstellation : null,

    searchTerm : "",

    totalLoaded : 0
};

/* ==========================================
   LOAD CONSTELLATIONS
========================================== */

async function loadConstellations(){

    try{

        const response =
            await fetch(
                "../data/constellations.json"
            );

        if(!response.ok){

            throw new Error(
                "Failed To Load Data"
            );
        }

        const data =
            await response.json();

        allConstellations = data;

        filteredConstellations =
            [...data];

        state.totalLoaded =
            data.length;

        renderConstellations(
            filteredConstellations
        );

        updateStatistics();


        state.loaded = true;

        console.log(
            `Loaded ${data.length} constellations`
        );

    }

    catch(error){

        console.error(
            "Constellation Load Error:",
            error
        );

        showLoadError();
    }
}

/* ==========================================
   LOAD ERROR
========================================== */

function showLoadError(){

    if(!constellationContainer)
        return;

    constellationContainer.innerHTML = `

        <div class="error-card">

            <h3>
                Failed To Load Data
            </h3>

            <p>

                Unable to load constellation
                information.

            </p>

        </div>

    `;
}

/* ==========================================
   STATISTICS
========================================== */

function updateStatistics(){

    animateCounter(
        ".sky-facts .fact-card:nth-child(1) h2",
        88
    );

    animateCounter(
        ".sky-facts .fact-card:nth-child(2) h2",
        48
    );
}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(
    selector,
    target
){

    const element =
        document.querySelector(
            selector
        );

    if(!element)
        return;

    let current = 0;

    const increment =
        Math.ceil(
            target / 40
        );

    const timer =
        setInterval(() => {

            current += increment;

            if(current >= target){

                current = target;

                clearInterval(
                    timer
                );
            }

            element.textContent =
                current;

        },30);
}


/* ==========================================
   UTILITIES
========================================== */

function getConstellationById(id){

    return allConstellations.find(
        constellation =>
            constellation.id === id
    );
}

function debounce(
    callback,
    delay = 300
){

    let timeout;

    return (...args) => {

        clearTimeout(
            timeout
        );

        timeout =
            setTimeout(() => {

                callback(...args);

            },delay);
    };
}
/* ==========================================
   RENDER CONSTELLATIONS
========================================== */

function renderConstellations(data){

    if(!constellationContainer)
        return;

    if(!data.length){

        renderEmptyState();

        return;
    }

    constellationContainer.innerHTML = "";

    const fragment =
        document.createDocumentFragment();

    data.forEach(constellation => {

        const card =
            createConstellationCard(
                constellation
            );

        fragment.appendChild(card);

    });

    constellationContainer.appendChild(
        fragment
    );

    animateCards();
}

/* ==========================================
   CREATE CARD
========================================== */

function createConstellationCard(
    constellation
){

    const card =
        document.createElement("div");

    card.className =
        "constellation-card";

    card.setAttribute(
        "data-id",
        constellation.id
    );

    card.innerHTML = `

        <img
            src="${constellation.image}"
            alt="${constellation.name}"
            loading="lazy"
        >

        <div class="constellation-content">

            <h3>
                ${constellation.name}
            </h3>

            <div class="constellation-meta">

                <span>
                    ${constellation.type}
                </span>

                <span>
                    ${constellation.season}
                </span>

            </div>

            <p>

                ${truncateText(
                    constellation.description,
                    120
                )}

            </p>

            <button
                class="constellation-btn"
                data-id="${constellation.id}"
            >

                Explore Constellation

            </button>

        </div>

    `;

    const button =
        card.querySelector(
            ".constellation-btn"
        );

    button.addEventListener(
        "click",
        () => {

            openConstellationModal(
                constellation.id
            );
        }
    );

    return card;
}

/* ==========================================
   TEXT TRUNCATION
========================================== */

function truncateText(
    text,
    length
){

    if(!text)
        return "";

    if(text.length <= length)
        return text;

    return (
        text.substring(
            0,
            length
        ) + "..."
    );
}

/* ==========================================
   EMPTY STATE
========================================== */

function renderEmptyState(){

    constellationContainer.innerHTML = `

        <div class="empty-state">

            <h2>

                No Constellations Found

            </h2>

            <p>

                Try searching for another
                constellation name.

            </p>

        </div>

    `;
}

/* ==========================================
   SEARCH SYSTEM
========================================== */

function searchConstellations(){

    if(!constellationSearch)
        return;

    const searchTerm =
        constellationSearch.value
            .trim()
            .toLowerCase();

    state.searchTerm =
        searchTerm;

    filteredConstellations =
        allConstellations.filter(
            constellation =>

                constellation.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                constellation.type
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                constellation.season
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                constellation.description
                    .toLowerCase()
                    .includes(searchTerm)
        );

    renderConstellations(
        filteredConstellations
    );
}

/* ==========================================
   SEARCH LISTENER
========================================== */

if(constellationSearch){

    constellationSearch.addEventListener(

        "input",

        debounce(
            searchConstellations,
            250
        )

    );
}

/* ==========================================
   CARD ANIMATION
========================================== */

function animateCards(){

    const cards =
        document.querySelectorAll(
            ".constellation-card"
        );

    cards.forEach(
        (
            card,
            index
        ) => {

            card.style.opacity =
                "0";

            card.style.transform =
                "translateY(40px)";

            setTimeout(() => {

                card.style.transition =
                    "all .5s ease";

                card.style.opacity =
                    "1";

                card.style.transform =
                    "translateY(0)";

            }, index * 80);
        }
    );
}

/* ==========================================
   FILTER RESET
========================================== */

function resetFilters(){

    filteredConstellations =
        [...allConstellations];

    if(constellationSearch){

        constellationSearch.value =
            "";
    }

    renderConstellations(
        filteredConstellations
    );
}
/* ==========================================
   MODAL SYSTEM
========================================== */

function openConstellationModal(id){

    const constellation =
        getConstellationById(id);

    if(!constellation)
        return;

    state.activeConstellation =
        constellation;

    if(!constellationModal)
        return;

    constellationModal.style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

    constellationModalBody.innerHTML = `

        <div class="modal-grid">

            <img
                src="${constellation.image}"
                alt="${constellation.name}"
                class="modal-image"
            >

            <div class="modal-info">

                <h2>

                    ${constellation.name}

                </h2>

                <div class="modal-type">

                    ${constellation.type}

                </div>

                <div class="info-grid">

                    <div class="info-card">

                        <span class="info-label">

                            Brightest Star

                        </span>

                        <div class="info-value">

                            ${constellation.brightestStar}

                        </div>

                    </div>

                    <div class="info-card">

                        <span class="info-label">

                            Best Season

                        </span>

                        <div class="info-value">

                            ${constellation.season}

                        </div>

                    </div>

                    <div class="info-card">

                        <span class="info-label">

                            Hemisphere

                        </span>

                        <div class="info-value">

                            ${constellation.hemisphere || "Northern"}

                        </div>

                    </div>

                    <div class="info-card">

                        <span class="info-label">

                            Visibility

                        </span>

                        <div class="info-value">

                            ${constellation.visibility || "Excellent"}

                        </div>

                    </div>

                </div>

                <div class="description">

                    <p>

                        ${constellation.description}

                    </p>

                </div>

                <div class="fact-highlight">

                    <h4>

                        Mythology & Astronomy

                    </h4>

                    <p>

                        ${constellation.fact || constellation.description}

                    </p>

                </div>

            </div>

        </div>

    `;

    requestAnimationFrame(() => {

        const content =
            constellationModal.querySelector(
                ".modal-content"
            );

        if(content){

            content.style.opacity =
                "1";

            content.style.transform =
                "translateY(0)";
        }
    });
}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal(){

    if(!constellationModal)
        return;

    constellationModal.style.display =
        "none";

    document.body.style.overflow =
        "";

    state.activeConstellation =
        null;
}

/* ==========================================
   CLOSE BUTTON
========================================== */

if(closeConstellationModal){

    closeConstellationModal.addEventListener(
        "click",
        closeModal
    );
}

/* ==========================================
   CLICK OUTSIDE
========================================== */

window.addEventListener(
    "click",
    event => {

        if(
            event.target ===
            constellationModal
        ){

            closeModal();
        }
    }
);

/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if(
            event.key === "Escape"
        ){

            closeModal();
        }
    }
);

/* ==========================================
   ARROW NAVIGATION
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if(
            !state.activeConstellation
        ){
            return;
        }

        const currentIndex =
            allConstellations.findIndex(
                item =>
                    item.id ===
                    state.activeConstellation.id
            );

        if(
            event.key ===
            "ArrowRight"
        ){

            const nextIndex =
                (currentIndex + 1) %
                allConstellations.length;

            openConstellationModal(
                allConstellations[
                    nextIndex
                ].id
            );
        }

        if(
            event.key ===
            "ArrowLeft"
        ){

            const prevIndex =
                (
                    currentIndex -
                    1 +
                    allConstellations.length
                ) %
                allConstellations.length;

            openConstellationModal(
                allConstellations[
                    prevIndex
                ].id
            );
        }
    }
);

/* ==========================================
   MODAL ACCESSIBILITY
========================================== */

function trapModalFocus(){

    const focusable =
        constellationModal.querySelectorAll(
            "button, [href], input"
        );

    if(!focusable.length)
        return;

    focusable[0].focus();
}
/* ==========================================
   NASA STARFIELD
========================================== */

function initializeStarfield(){

    const starfield =
        document.getElementById(
            "starfield"
        );

    if(!starfield)
        return;

    const fragment =
        document.createDocumentFragment();

    for(let i = 0; i < 2500; i++){

        const star =
            document.createElement(
                "span"
            );

        star.className =
            "space-star";

        const random =
            Math.random();

        let size;

        if(random < 0.75){

            size =
                Math.random() * 1.2 + 0.5;

        }

        else if(random < 0.95){

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
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.opacity =
            Math.random();

        star.style.animationDuration =
            `${3 + Math.random() * 8}s`;

        fragment.appendChild(
            star
        );
    }

    starfield.appendChild(
        fragment
    );
}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initializeScrollReveal(){

    const elements =
        document.querySelectorAll(

            ".fact-card,\
            .constellation-card,\
            .myth-card,\
            .section-title"

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

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },

            {
                threshold:0.15
            }
        );

    elements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(
                element
            );
        }
    );
}


/* ==========================================
   FLOATING PARTICLES
========================================== */

function initializeParticles(){

    const particles =
        document.querySelectorAll(
            ".particle"
        );

    particles.forEach(
        (
            particle,
            index
        ) => {

            particle.style.animationDelay =
                `${index}s`;
        }
    );
}

/* ==========================================
   PERFORMANCE OPTIMIZATION
========================================== */

function optimizeImages(){

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(
        image => {

            image.loading =
                "lazy";

            image.decoding =
                "async";
        }
    );
}

function createHeroStars(){

    const starfield =
        document.getElementById(
            "starfield"
        );

    if(!starfield) return;

    starfield.innerHTML = "";

    for(let i=0;i<3000;i++){

        const star =
            document.createElement(
                "div"
            );

        star.className =
            "space-star";

        const size =
    Math.random() < 0.8
        ? Math.random() * 2 + 1
        : Math.random() * 4 + 2;

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

        star.style.animationDelay =
            `${Math.random()*5}s`;

        starfield.appendChild(
            star
        );
    }
}

/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener(

    "resize",

    debounce(() => {

        if(
            window.innerWidth < 768
        ){

            document
                .querySelectorAll(
                    ".space-star"
                )
                .forEach(
                    (
                        star,
                        index
                    ) => {

                        if(
                            index > 1200
                        ){

                            star.remove();
                        }
                    }
                );
        }

    },300)

);

/* ==========================================
   PAGE LOADED
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeStarfield();

        initializeParticles();

        createHeroStars();


        initializeScrollReveal();

        optimizeImages();

        loadConstellations();

    }

);

/* ==========================================
   PAGE READY LOG
========================================== */

console.log(

    "GalaxyVerse Constellations Explorer Loaded"

);

const heroStarfield =
document.getElementById(
    "constellation-starfield"
);

if(heroStarfield){

    for(let i=0;i<1800;i++){

        const star =
        document.createElement("span");

        star.className =
        "constellation-bg-star";

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

        heroStarfield.appendChild(
            star
        );
    }
}