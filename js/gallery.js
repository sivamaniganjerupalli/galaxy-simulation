/* ==========================================
   GLOBAL DATA
========================================== */

let galleryData = [];

let filteredData = [];

let currentCategory = "All";

let currentIndex = 0;

/* ==========================================
   DOM ELEMENTS
========================================== */

const galleryContainer =
    document.getElementById(
        "galleryContainer"
    );

const searchInput =
    document.getElementById(
        "gallerySearch"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const galleryModal =
    document.getElementById(
        "galleryModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const downloadImageBtn =
    document.getElementById(
        "downloadImageBtn"
    );

const closeModal =
    document.getElementById(
        "closeGalleryModal"
    );

/* ==========================================
   LOAD GALLERY
========================================== */

async function loadGallery(){

    try{

        const response =
            await fetch(
                "../data/gallery.json"
            );

        galleryData =
            await response.json();

        filteredData =
            [...galleryData];

        renderGallery(
            filteredData
        );

    }

    catch(error){

        console.error(
            "Gallery Load Error:",
            error
        );
    }

}

/* ==========================================
   RENDER GALLERY
========================================== */

function renderGallery(data){

    if(!galleryContainer) return;

    galleryContainer.innerHTML = "";

    data.forEach(

        (item,index)=>{

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                item.featured
                ? "gallery-card featured"
                : "gallery-card";

            card.innerHTML = `

                <div class="gallery-image">

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        loading="lazy"
                    >

                    <div class="gallery-category">

                        ${item.category}

                    </div>

                    <div class="gallery-overlay">

                        <h3>

                            ${item.title}

                        </h3>

                        <p>

                            ${item.description}

                        </p>

                        <div
                            class="gallery-view-btn"
                        >

                            🔭

                        </div>

                    </div>

                </div>

                <div class="gallery-info-bar">

                    <span>

                        GalaxyVerse

                    </span>

                    <span>

                        ${item.category}

                    </span>

                </div>

            `;

            card.addEventListener(

                "click",

                ()=>{

                    openModal(
                        index,
                        data
                    );

                }

            );

            galleryContainer.appendChild(
                card
            );

        }

    );

}

/* ==========================================
   START
========================================== */

loadGallery();
/* ==========================================
   SEARCH
========================================== */

if(searchInput){

    searchInput.addEventListener(

        "input",

        filterGallery

    );

}

function filterGallery(){

    const searchTerm =

        searchInput.value
        .toLowerCase()
        .trim();

    filteredData =

        galleryData.filter(

            item=>{

                const categoryMatch =

                    currentCategory ===
                    "All"

                    ||

                    item.category ===
                    currentCategory;

                const searchMatch =

                    item.title
                    .toLowerCase()
                    .includes(
                        searchTerm
                    )

                    ||

                    item.description
                    .toLowerCase()
                    .includes(
                        searchTerm
                    )

                    ||

                    item.category
                    .toLowerCase()
                    .includes(
                        searchTerm
                    );

                return (

                    categoryMatch
                    &&
                    searchMatch

                );

            }

        );

    renderGallery(
        filteredData
    );

}

/* ==========================================
   CATEGORY FILTERS
========================================== */

filterButtons.forEach(

    button=>{

        button.addEventListener(

            "click",

            ()=>{

                filterButtons.forEach(

                    btn=>{

                        btn.classList.remove(
                            "active"
                        );

                    }

                );

                button.classList.add(
                    "active"
                );

                currentCategory =

                    button.dataset.category;

                filterGallery();

            }

        );

    }

);

/* ==========================================
   MODAL
========================================== */

function openModal(
    index,
    data
){

    currentIndex = index;

    const item =
        data[index];

    if(
        !modalImage ||
        !modalTitle ||
        !modalCategory ||
        !modalDescription
    ) return;

    modalImage.src =
        item.image;

    modalTitle.textContent =
        item.title;

    modalCategory.textContent =
        item.category;

    modalDescription.textContent =
        item.description;

    if(downloadImageBtn){

    downloadImageBtn.href =
        item.image;

    downloadImageBtn.download =
        item.title;
}

    galleryModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}

function closeGalleryModal(){

    galleryModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}

if(closeModal){

    closeModal.addEventListener(

        "click",

        closeGalleryModal

    );

}

if(galleryModal){

    galleryModal.addEventListener(

        "click",

        (e)=>{

            if(
                e.target ===
                galleryModal
            ){

                closeGalleryModal();

            }

        }

    );

}

/* ==========================================
   PREVIOUS / NEXT
========================================== */

function showNextImage(){

    if(
        filteredData.length === 0
    ) return;

    currentIndex++;

    if(
        currentIndex >=
        filteredData.length
    ){

        currentIndex = 0;

    }

    openModal(
        currentIndex,
        filteredData
    );

}

function showPreviousImage(){

    if(
        filteredData.length === 0
    ) return;

    currentIndex--;

    if(
        currentIndex < 0
    ){

        currentIndex =
            filteredData.length - 1;

    }

    openModal(
        currentIndex,
        filteredData
    );

}

/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener(

    "keydown",

    (e)=>{

        if(
            !galleryModal
            .classList
            .contains(
                "active"
            )
        ) return;

        if(
            e.key ===
            "Escape"
        ){

            closeGalleryModal();

        }

        if(
            e.key ===
            "ArrowRight"
        ){

            showNextImage();

        }

        if(
            e.key ===
            "ArrowLeft"
        ){

            showPreviousImage();

        }

    }

);

/* ==========================================
   NASA STARFIELD
========================================== */

function createStarfield(){

    const starfield =

        document.getElementById(
            "gallery-starfield"
        );

    if(!starfield) return;

    for(
        let i = 0;
        i < 1200;
        i++
    ){

        const star =

            document.createElement(
                "span"
            );

        star.className =
            "gallery-star";

        const size =

            Math.random() * 2.5 + .5;

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
   SCROLL REVEAL
========================================== */

function initializeReveal(){

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
                                        "translateY(50px)"
                                    },

                                    {
                                        opacity:1,
                                        transform:
                                        "translateY(0)"
                                    }

                                ],

                                {
                                    duration:700,
                                    fill:"forwards"
                                }

                            );

                        }

                    }

                );

            },

            {
                threshold:.1
            }

        );

    setTimeout(()=>{

        document

            .querySelectorAll(

                ".gallery-card,.gallery-stat,.showcase-card"

            )

            .forEach(

                el=>{

                    observer.observe(
                        el
                    );

                }

            );

    },1000);

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        createStarfield();

        initializeReveal();

    }

);