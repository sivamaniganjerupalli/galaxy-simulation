/* ==========================================
   GALAXYVERSE 2.0
   PREMIUM GALAXY EXPLORER
   PART 1
========================================== */

/* ==========================================
   COSMIC BACKGROUND ENGINE
========================================== */

class GalaxyBackground {

    constructor() {

        this.canvas =
            document.getElementById(
                "galaxyCanvas"
            );

        if (!this.canvas) return;

        this.ctx =
            this.canvas.getContext("2d");

        this.stars = [];
        this.nebulas = [];

        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        this.resize();

        this.createStars();
        this.createNebulas();

        this.events();

        this.animate();

    }

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;

        this.width =
            this.canvas.width;

        this.height =
            this.canvas.height;

    }

    events() {

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        window.addEventListener(
            "mousemove",
            e => {

                this.mouse.x =
                    e.clientX;

                this.mouse.y =
                    e.clientY;

            }
        );

    }

    createStars() {

        this.stars = [];

        for (
            let i = 0;
            i < 2500;
            i++
        ) {

            this.stars.push({

                x:
                    Math.random() *
                    this.width,

                y:
                    Math.random() *
                    this.height,

                radius:
                    Math.random() * 2,

                speed:
                    0.05 +
                    Math.random() * 0.2,

                opacity:
                    Math.random(),

                twinkle:
                    Math.random() * 0.02

            });

        }

    }

    createNebulas() {

        this.nebulas = [];

        for (
            let i = 0;
            i < 6;
            i++
        ) {

            this.nebulas.push({

                x:
                    Math.random() *
                    this.width,

                y:
                    Math.random() *
                    this.height,

                radius:
                    250 +
                    Math.random() * 400,

                hue:
                    Math.random() > 0.5
                        ? 200
                        : 270

            });

        }

    }

    drawNebulas() {

        this.nebulas.forEach(
            nebula => {

                const gradient =
                    this.ctx.createRadialGradient(

                        nebula.x,
                        nebula.y,
                        0,

                        nebula.x,
                        nebula.y,
                        nebula.radius

                    );

                gradient.addColorStop(
                    0,
                    `hsla(
                        ${nebula.hue},
                        100%,
                        60%,
                        .08
                    )`
                );

                gradient.addColorStop(
                    1,
                    "transparent"
                );

                this.ctx.fillStyle =
                    gradient;

                this.ctx.beginPath();

                this.ctx.arc(

                    nebula.x,
                    nebula.y,

                    nebula.radius,

                    0,
                    Math.PI * 2

                );

                this.ctx.fill();

            }
        );

    }

    drawStars() {

        this.stars.forEach(
            star => {

                star.opacity +=
                    (Math.random() - .5) *
                    star.twinkle;

                star.opacity =
                    Math.max(
                        .1,
                        Math.min(
                            1,
                            star.opacity
                        )
                    );

                this.ctx.beginPath();

                this.ctx.arc(

                    star.x,
                    star.y,

                    star.radius,

                    0,
                    Math.PI * 2

                );

                this.ctx.fillStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${star.opacity}
                    )`;

                this.ctx.fill();

                star.y +=
                    star.speed;

                if (
                    star.y >
                    this.height + 10
                ) {

                    star.y = -10;

                    star.x =
                        Math.random() *
                        this.width;

                }

            }
        );

    }

    drawMouseGlow() {

        const glow =
            this.ctx.createRadialGradient(

                this.mouse.x,
                this.mouse.y,
                0,

                this.mouse.x,
                this.mouse.y,
                220

            );

        glow.addColorStop(
            0,
            "rgba(56,189,248,.08)"
        );

        glow.addColorStop(
            1,
            "transparent"
        );

        this.ctx.fillStyle =
            glow;

        this.ctx.fillRect(

            0,
            0,
            this.width,
            this.height

        );

    }

    animate() {

        this.ctx.clearRect(

            0,
            0,
            this.width,
            this.height

        );

        this.drawNebulas();
        this.drawStars();
        this.drawMouseGlow();

        requestAnimationFrame(
            () => this.animate()
        );

    }

}

/* ==========================================
   SHOOTING STARS
========================================== */

class ShootingStars {

    constructor() {

        this.container =
            document.querySelector(
                ".shooting-stars"
            );

        if (!this.container)
            return;

        this.start();

    }

    create() {

        const star =
            document.createElement(
                "div"
            );

        star.className =
            "shooting-star";

        star.style.top =
            Math.random() * 30 +
            "%";

        star.style.left =
            Math.random() * 100 +
            "%";

        star.style.animationDuration =
            3 +
            Math.random() * 3 +
            "s";

        this.container.appendChild(
            star
        );

        setTimeout(
            () => {

                star.remove();

            },
            6000
        );

    }

    start() {

        setInterval(
            () => this.create(),
            1800
        );

    }

}

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let allGalaxies = [];

const galaxyContainer =
    document.getElementById(
        "galaxyContainer"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const typeFilter =
    document.getElementById(
        "typeFilter"
    );

const galaxyCount =
    document.getElementById(
        "galaxyCount"
    );

const modal =
    document.getElementById(
        "galaxyModal"
    );

const modalBody =
    document.getElementById(
        "modalBody"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(
    element,
    target
) {

    if (!element) return;

    let current = 0;

    const increment =
        Math.ceil(
            target / 40
        );

    const timer =
        setInterval(() => {

            current +=
                increment;

            if (
                current >= target
            ) {

                current = target;

                clearInterval(
                    timer
                );

            }

            element.textContent =
                current;

        }, 40);

}
/* ==========================================
   DATA LOADER
========================================== */

async function loadGalaxies() {

    try {

        showLoadingState();

        const response =
            await fetch(
                "../data/galaxies.json"
            );

        if (!response.ok) {

            throw new Error(
                "Failed to load galaxy data"
            );

        }

        allGalaxies =
            await response.json();

        renderGalaxies(
            allGalaxies
        );

        animateCounter(
            galaxyCount,
            allGalaxies.length
        );

        hideLoadingState();

    }

    catch(error) {

        console.error(error);

        showErrorState();

    }

}

/* ==========================================
   LOADING STATE
========================================== */

function showLoadingState() {

    if (!galaxyContainer)
        return;

    galaxyContainer.innerHTML = "";

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        galaxyContainer.innerHTML += `

        <div class="galaxy-card skeleton-card">

            <div
                class="skeleton-image"
            ></div>

            <div
                class="skeleton-content"
            >

                <div
                    class="skeleton-line"
                ></div>

                <div
                    class="skeleton-line short"
                ></div>

                <div
                    class="skeleton-line"
                ></div>

            </div>

        </div>

        `;

    }

}

function hideLoadingState() {

    const skeletons =
        document.querySelectorAll(
            ".skeleton-card"
        );

    skeletons.forEach(
        card => card.remove()
    );

}

function showErrorState() {

    galaxyContainer.innerHTML = `

        <div
            class="error-card"
        >

            <h2>

                Galaxy Data Unavailable

            </h2>

            <p>

                Unable to connect to the
                cosmic database.

            </p>

        </div>

    `;

}

/* ==========================================
   RENDER GALAXIES
========================================== */

function renderGalaxies(
    galaxies
) {

    if (
        !galaxyContainer
    )
        return;

    galaxyContainer.innerHTML =
        "";

    galaxies.forEach(
        galaxy => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "galaxy-card";

            card.innerHTML = `

                <img
                    src="${galaxy.image}"
                    alt="${galaxy.name}"
                    loading="lazy"
                >

                <div
                    class="galaxy-content"
                >

                    <h3>

                        ${galaxy.name}

                    </h3>

                    <p>

                        <strong>
                            Type:
                        </strong>

                        ${galaxy.type}

                    </p>

                    <p>

                        <strong>
                            Distance:
                        </strong>

                        ${galaxy.distance}

                    </p>

                    <p>

                        <strong>
                            Stars:
                        </strong>

                        ${galaxy.stars}

                    </p>

                    <button
                        class="view-btn"
                        data-id="${galaxy.id}"
                    >

                        View Details

                    </button>

                </div>

            `;

            galaxyContainer.appendChild(
                card
            );

        }
    );

    initializeCardButtons();

}

/* ==========================================
   CARD EVENTS
========================================== */

function initializeCardButtons() {

    document
        .querySelectorAll(
            ".view-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    openGalaxyModal(
                        id
                    );

                }
            );

        });

}

/* ==========================================
   SEARCH SYSTEM
========================================== */

function initializeSearch() {

    if (
        !searchInput
    )
        return;

    searchInput.addEventListener(
        "input",
        () => {

            applyFilters();

        }
    );

}

/* ==========================================
   FILTER SYSTEM
========================================== */

function initializeFilters() {

    if (
        !typeFilter
    )
        return;

    typeFilter.addEventListener(
        "change",
        () => {

            applyFilters();

        }
    );

}

/* ==========================================
   APPLY FILTERS
========================================== */

function applyFilters() {

    const searchTerm =
        searchInput.value
        .toLowerCase()
        .trim();

    const selectedType =
        typeFilter.value;

    const filtered =
        allGalaxies.filter(
            galaxy => {

                const matchesSearch =

                    galaxy.name
                    .toLowerCase()
                    .includes(
                        searchTerm
                    )

                    ||

                    galaxy.type
                    .toLowerCase()
                    .includes(
                        searchTerm
                    );

                const matchesType =

                    selectedType ===
                    "all"

                    ||

                    galaxy.type
                    .includes(
                        selectedType
                    );

                return (

                    matchesSearch
                    &&

                    matchesType

                );

            }
        );

    renderGalaxies(
        filtered
    );

}

/* ==========================================
   SORTING UTILITIES
========================================== */

function sortByName() {

    const sorted =
        [...allGalaxies]
        .sort(

            (a,b) =>

            a.name.localeCompare(
                b.name
            )

        );

    renderGalaxies(
        sorted
    );

}

function sortByStars() {

    const sorted =
        [...allGalaxies];

    sorted.sort(
        () =>
            Math.random() - .5
    );

    renderGalaxies(
        sorted
    );

}

/* ==========================================
   STATISTICS
========================================== */

function calculateStatistics() {

    if (
        !allGalaxies.length
    )
        return;

    const total =
        allGalaxies.length;

    if (
        galaxyCount
    ) {

        animateCounter(
            galaxyCount,
            total
        );

    }

}

/* ==========================================
   LIVE SEARCH HIGHLIGHT
========================================== */

function highlightSearchResults() {

    const cards =
        document.querySelectorAll(
            ".galaxy-card h3"
        );

    const term =
        searchInput.value
        .trim()
        .toLowerCase();

    cards.forEach(
        title => {

            const text =
                title.textContent;

            if (
                !term
            ) {

                title.innerHTML =
                    text;

                return;

            }

            const regex =
                new RegExp(
                    `(${term})`,
                    "gi"
                );

            title.innerHTML =
                text.replace(
                    regex,
                    "<mark>$1</mark>"
                );

        }
    );

}

if (
    searchInput
) {

    searchInput.addEventListener(
        "input",
        highlightSearchResults
    );

}
/* ==========================================
   PREMIUM MODAL SYSTEM
========================================== */

function openGalaxyModal(id) {

    const galaxy =
        allGalaxies.find(

            item =>

            item.id === id

        );

    if (!galaxy) return;

    modalBody.innerHTML = `

        <div class="modal-grid">

            <div>

                <img
                    src="${galaxy.image}"
                    alt="${galaxy.name}"
                    class="modal-image"
                >

            </div>

            <div class="modal-info">

                <h2>

                    ${galaxy.name}

                </h2>

                <div class="modal-type">

                    ${galaxy.type}

                </div>

                <div class="info-grid">

                    <div class="info-card">

                        <span
                            class="info-label"
                        >

                            Diameter

                        </span>

                        <span
                            class="info-value"
                        >

                            ${galaxy.diameter}

                        </span>

                    </div>

                    <div class="info-card">

                        <span
                            class="info-label"
                        >

                            Distance

                        </span>

                        <span
                            class="info-value"
                        >

                            ${galaxy.distance}

                        </span>

                    </div>

                    <div class="info-card">

                        <span
                            class="info-label"
                        >

                            Stars

                        </span>

                        <span
                            class="info-value"
                        >

                            ${galaxy.stars}

                        </span>

                    </div>

                    <div class="info-card">

                        <span
                            class="info-label"
                        >

                            Age

                        </span>

                        <span
                            class="info-value"
                        >

                            ${galaxy.age}

                        </span>

                    </div>

                </div>

                <div class="description">

                    <p>

                        ${galaxy.description}

                    </p>

                </div>

                <div class="fact-highlight">

                    <h4>

                        Cosmic Insight

                    </h4>

                    <p>

                        ${galaxy.name}
                        remains one of the most
                        fascinating structures
                        known in the observable
                        universe and continues
                        to provide valuable
                        insights into galaxy
                        formation and evolution.

                    </p>

                </div>

            </div>

        </div>

    `;

    modal.style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

    setTimeout(() => {

        modal.style.opacity = "1";

    }, 10);

}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeGalaxyModal() {

    modal.style.opacity =
        "0";

    setTimeout(() => {

        modal.style.display =
            "none";

        document.body.style.overflow =
            "";

    }, 250);

}

if (
    closeModal
) {

    closeModal.addEventListener(

        "click",

        closeGalaxyModal

    );

}

/* ==========================================
   OUTSIDE CLICK CLOSE
========================================== */

if (
    modal
) {

    modal.addEventListener(

        "click",

        event => {

            if (

                event.target ===
                modal

            ) {

                closeGalaxyModal();

            }

        }

    );

}

/* ==========================================
   ESC KEY SUPPORT
========================================== */

document.addEventListener(

    "keydown",

    event => {

        if (

            event.key ===
            "Escape"

        ) {

            closeGalaxyModal();

        }

    }

);

/* ==========================================
   TOAST SYSTEM
========================================== */

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "galaxy-toast";

    toast.innerText =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 100);

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
   TOAST STYLE
========================================== */

const toastStyle =
document.createElement(
    "style"
);

toastStyle.textContent = `

.galaxy-toast{

    position:fixed;

    right:25px;
    bottom:25px;

    background:
        linear-gradient(
            135deg,
            #38bdf8,
            #8b5cf6
        );

    color:white;

    padding:
        1rem 1.5rem;

    border-radius:16px;

    font-weight:600;

    transform:
        translateY(80px);

    opacity:0;

    transition:.4s ease;

    z-index:999999;
}

.galaxy-toast.show{

    opacity:1;

    transform:
        translateY(0);
}

mark{

    background:
        rgba(
            56,
            189,
            248,
            .25
        );

    color:white;

    padding:
        0 .2rem;

    border-radius:4px;
}

`;

document.head.appendChild(
    toastStyle
);

/* ==========================================
   PAGE INTRO MESSAGE
========================================== */

function welcomeMessage() {

    setTimeout(() => {

        showToast(

            "Galaxy Database Connected"

        );

    }, 1200);

}

/* ==========================================
   INITIALIZE APP
========================================== */

function initializeGalaxyExplorer() {

    initializeSearch();

    initializeFilters();

    loadGalaxies();

    welcomeMessage();

}

/* ==========================================
   START BACKGROUND
========================================== */

window.addEventListener(

    "load",

    () => {

        new GalaxyBackground();

        new ShootingStars();

    }

);

/* ==========================================
   DOM READY
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeGalaxyExplorer();

    }

);

/* ==========================================
   END OF FILE
========================================== */