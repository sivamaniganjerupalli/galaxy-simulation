/* ==========================================
   GALAXYVERSE 2.0
   NASA GRADE SOLAR SYSTEM
========================================== */

/* ==========================================
   GLOBAL DATA
========================================== */

let allPlanets = [];

/* ==========================================
   DOM ELEMENTS
========================================== */

const planetContainer =
    document.getElementById(
        "planetContainer"
    );

const planetSearch =
    document.getElementById(
        "planetSearch"
    );

const planetModal =
    document.getElementById(
        "planetModal"
    );

const planetModalBody =
    document.getElementById(
        "planetModalBody"
    );

const closePlanetModal =
    document.getElementById(
        "closePlanetModal"
    );

/* ==========================================
   LOADING STATE
========================================== */

function showLoadingState() {

    if (!planetContainer) return;

    planetContainer.innerHTML = "";

    for (let i = 0; i < 8; i++) {

        planetContainer.innerHTML += `

            <div class="planet-card skeleton-card">

                <div
                    style="
                        height:260px;
                        background:rgba(255,255,255,.05);
                    "
                ></div>

                <div
                    style="
                        padding:2rem;
                    "
                >

                    <div
                        style="
                            height:25px;
                            background:rgba(255,255,255,.05);
                            border-radius:10px;
                            margin-bottom:1rem;
                        "
                    ></div>

                    <div
                        style="
                            height:15px;
                            background:rgba(255,255,255,.04);
                            border-radius:10px;
                            margin-bottom:.8rem;
                        "
                    ></div>

                    <div
                        style="
                            height:15px;
                            width:70%;
                            background:rgba(255,255,255,.04);
                            border-radius:10px;
                        "
                    ></div>

                </div>

            </div>

        `;
    }

}

/* ==========================================
   LOAD PLANETS
========================================== */

async function loadPlanets() {

    try {

        showLoadingState();

        const response =
            await fetch(
                "../data/planets.json"
            );

        if (!response.ok) {

            throw new Error(
                "Planet data not found"
            );

        }

        const data =
            await response.json();

        allPlanets = data;

        renderPlanets(
            allPlanets
        );

        showToast(
            "Planet Database Connected"
        );

    }

    catch(error) {

        console.error(error);

        showErrorState();

    }

}

/* ==========================================
   ERROR STATE
========================================== */

function showErrorState() {

    if (!planetContainer) return;

    planetContainer.innerHTML = `

        <div
            class="planet-card"
            style="
                grid-column:1/-1;
                text-align:center;
                padding:4rem;
            "
        >

            <h2>

                Unable To Load Planets

            </h2>

            <p>

                Planet database connection failed.

            </p>

        </div>

    `;

}

/* ==========================================
   RENDER PLANETS
========================================== */

function renderPlanets(planets) {

    if (!planetContainer) return;

    planetContainer.innerHTML = "";

    planets.forEach(planet => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "planet-card";

        card.innerHTML = `

            <img
                src="${planet.image}"
                alt="${planet.name}"
                loading="lazy"
            >

            <div class="planet-content">

                <h3>

                    ${planet.name}

                </h3>

                <div class="planet-info">

                    <span>

                        <strong>
                            Type
                        </strong>

                        ${planet.type}

                    </span>

                    <span>

                        <strong>
                            Distance
                        </strong>

                        ${planet.distance}

                    </span>

                    <span>

                        <strong>
                            Moons
                        </strong>

                        ${planet.moons}

                    </span>

                </div>

                <button
                    class="planet-btn"
                    data-id="${planet.id}"
                >

                    Explore Planet

                </button>

            </div>

        `;

        planetContainer.appendChild(
            card
        );

    });

    initializeButtons();

}

/* ==========================================
   BUTTON EVENTS
========================================== */

function initializeButtons() {

    document
        .querySelectorAll(
            ".planet-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    openPlanetModal(
                        id
                    );

                }
            );

        });

}

/* ==========================================
   SEARCH SYSTEM
========================================== */

function searchPlanets() {

    const searchTerm =
        planetSearch.value
            .toLowerCase()
            .trim();

    const filtered =
        allPlanets.filter(

            planet =>

                planet.name
                .toLowerCase()
                .includes(
                    searchTerm
                )

                ||

                planet.type
                .toLowerCase()
                .includes(
                    searchTerm
                )

        );

    renderPlanets(
        filtered
    );

}

if (planetSearch) {

    planetSearch.addEventListener(

        "input",

        searchPlanets

    );

}

/* ==========================================
   OPEN MODAL
========================================== */

function openPlanetModal(id) {

    const planet =
        allPlanets.find(

            item =>
                item.id === id

        );

    if (!planet) return;

    planetModal.style.display =
        "flex";

    setTimeout(() => {

        planetModal.style.opacity =
            "1";

    }, 10);

    document.body.style.overflow =
        "hidden";

    planetModalBody.innerHTML = `

        <div class="modal-grid">

            <img
                src="${planet.image}"
                alt="${planet.name}"
                class="modal-image"
            >

            <div class="modal-info">

                <h2>

                    ${planet.name}

                </h2>

                <div
                    class="modal-subtitle"
                >

                    ${planet.type}

                </div>

                <div class="info-grid">

                    <div class="info-card">

                        <strong>

                            Distance

                        </strong>

                        <span>

                            ${planet.distance}

                        </span>

                    </div>

                    <div class="info-card">

                        <strong>

                            Diameter

                        </strong>

                        <span>

                            ${planet.diameter}

                        </span>

                    </div>

                    <div class="info-card">

                        <strong>

                            Moons

                        </strong>

                        <span>

                            ${planet.moons}

                        </span>

                    </div>

                    <div class="info-card">

                        <strong>

                            Day Length

                        </strong>

                        <span>

                            ${planet.dayLength}

                        </span>

                    </div>

                </div>

                <p>

                    ${planet.description}

                </p>

                <div class="fact-highlight">

                    <h4>

                        Interesting Fact

                    </h4>

                    <p>

                        ${planet.fact}

                    </p>

                </div>

            </div>

        </div>

    `;

}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal() {

    planetModal.style.opacity =
        "0";

    setTimeout(() => {

        planetModal.style.display =
            "none";

        document.body.style.overflow =
            "";

    }, 250);

}

if (closePlanetModal) {

    closePlanetModal.addEventListener(

        "click",

        closeModal

    );

}

/* ==========================================
   OUTSIDE CLICK CLOSE
========================================== */

window.addEventListener(

    "click",

    event => {

        if (

            event.target ===
            planetModal

        ) {

            closeModal();

        }

    }

);

/* ==========================================
   ESC CLOSE
========================================== */

document.addEventListener(

    "keydown",

    event => {

        if (

            event.key ===
            "Escape"

        ) {

            closeModal();

        }

    }

);

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "planet-toast";

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

.planet-toast{

    position:fixed;

    right:25px;
    bottom:25px;

    padding:
        1rem 1.5rem;

    border-radius:16px;

    background:

        linear-gradient(
            135deg,
            #38bdf8,
            #8b5cf6
        );

    color:white;

    font-weight:600;

    opacity:0;

    transform:
        translateY(80px);

    transition:.4s ease;

    z-index:999999;
}

.planet-toast.show{

    opacity:1;

    transform:
        translateY(0);
}

`;

document.head.appendChild(
    toastStyle
);

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadPlanets();

    }

);