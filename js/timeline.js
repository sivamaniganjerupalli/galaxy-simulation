/* ==========================================
   TIMELINE STARFIELD
========================================== */

const starfield =
document.getElementById(
    "timeline-starfield"
);

if(starfield){

    for(let i=0;i<2500;i++){

        const star =
        document.createElement("span");

        star.className =
        "timeline-star";

        const random =
        Math.random();

        let size;

        if(random < 0.75){

            size =
            Math.random() * 1.2 + 0.5;

        }else if(random < 0.95){

            size =
            Math.random() * 2 + 1.2;

        }else{

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

        starfield.appendChild(star);
    }
}

/* ==========================================
   TIMELINE DATA
========================================== */

let timelineData = [];

/* ==========================================
   LOAD TIMELINE
========================================== */

async function loadTimeline(){

    try{

        const response =
        await fetch(
            "../data/timeline.json"
        );

        timelineData =
        await response.json();

        renderTimeline(
            timelineData
        );

    }catch(error){

        console.error(
            "Timeline Load Error:",
            error
        );
    }
}

/* ==========================================
   RENDER TIMELINE
========================================== */

function renderTimeline(data){

    const container =
    document.getElementById(
        "timelineContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    data.forEach(
        (event,index)=>{

            const side =
            index % 2 === 0
            ? "left"
            : "right";

            const item =
            document.createElement("div");

            item.className =
            `timeline-item ${side}`;

            item.innerHTML = `

                <div class="timeline-dot"></div>

                <div
                    class="timeline-card"
                    data-id="${event.id}"
                >

                    <img
                        src="${event.image}"
                        alt="${event.title}"
                    >

                    <div class="timeline-content">

                        <div class="timeline-year">

                            ${event.year}

                        </div>

                        <h3>

                            ${event.title}

                        </h3>

                        <p>

                            ${event.description}

                        </p>

                    </div>

                </div>

            `;

            container.appendChild(
                item
            );
        }
    );

    attachCardEvents();
    revealTimeline();
}

/* ==========================================
   MODAL
========================================== */

function attachCardEvents(){

    const cards =
    document.querySelectorAll(
        ".timeline-card"
    );

    cards.forEach(card=>{

        card.addEventListener(
            "click",
            ()=>{

                const id =
                Number(
                    card.dataset.id
                );

                const event =
                timelineData.find(
                    item =>
                    item.id === id
                );

                openModal(event);
            }
        );
    });
}

function openModal(event){

    const modal =
    document.getElementById(
        "timelineModal"
    );

    const body =
    document.getElementById(
        "timelineModalBody"
    );

    body.innerHTML = `

        <img
            src="${event.image}"
            alt="${event.title}"
            style="
                width:100%;
                border-radius:20px;
                margin-bottom:25px;
            "
        >

        <div
            style="
                color:#60a5fa;
                margin-bottom:10px;
                font-weight:700;
            "
        >

            ${event.year}

        </div>

        <h2
            style="
                color:white;
                margin-bottom:20px;
            "
        >

            ${event.title}

        </h2>

        <p
            style="
                color:#cbd5e1;
                line-height:1.9;
            "
        >

            ${event.description}

        </p>

    `;

    modal.style.display =
    "flex";
}

/* ==========================================
   CLOSE MODAL
========================================== */

const closeModal =
document.getElementById(
    "closeTimelineModal"
);

if(closeModal){

    closeModal.addEventListener(
        "click",
        ()=>{

            document.getElementById(
                "timelineModal"
            ).style.display =
            "none";
        }
    );
}

window.addEventListener(
    "click",
    e=>{

        const modal =
        document.getElementById(
            "timelineModal"
        );

        if(e.target === modal){

            modal.style.display =
            "none";
        }
    }
);

/* ==========================================
   SCROLL REVEAL
========================================== */

function revealTimeline(){

    const items =
    document.querySelectorAll(
        ".timeline-item"
    );

    const observer =
    new IntersectionObserver(

        entries=>{

            entries.forEach(
                entry=>{

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.style.opacity =
                        "1";

                        entry.target.style.transform =
                        "translateY(0)";
                    }
                }
            );
        },

        {
            threshold:0.15
        }
    );

    items.forEach(item=>{

        item.style.opacity =
        "0";

        item.style.transform =
        "translateY(80px)";

        item.style.transition =
        ".8s ease";

        observer.observe(item);
    });
}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document
.querySelectorAll(
    'a[href^="#"]'
)
.forEach(anchor=>{

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

                    behavior:"smooth"
                });
            }
        }
    );
});

/* ==========================================
   INIT
========================================== */

loadTimeline();