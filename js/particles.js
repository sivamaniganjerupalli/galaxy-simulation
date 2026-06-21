/* ==========================================
   GALAXYVERSE 2.0
   NASA SPACE PARTICLE ENGINE
========================================== */

class CosmicParticleEngine {

    constructor() {

        this.canvas = document.createElement("canvas");

        this.canvas.id = "cosmicParticles";

        document.body.prepend(
            this.canvas
        );

        this.ctx =
            this.canvas.getContext("2d");

        this.stars = [];
        this.nebulas = [];
        this.dust = [];

        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        this.resize();
        this.createStars();
        this.createDust();
        this.createNebulas();
        this.events();
        this.animate();

    }

    /* ==========================================
       RESIZE
    ========================================== */

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

    /* ==========================================
       EVENTS
    ========================================== */

    events() {

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        window.addEventListener(
            "mousemove",
            (e) => {

                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;

            }
        );

    }

    /* ==========================================
       STARS
    ========================================== */

    createStars() {

        const count = 1500;

        for (let i = 0; i < count; i++) {

            this.stars.push({

                x:
                    Math.random() *
                    this.width,

                y:
                    Math.random() *
                    this.height,

                radius:
                    Math.random() * 2.2,

                speed:
                    Math.random() * 0.15,

                opacity:
                    Math.random(),

                twinkle:
                    Math.random() * 0.02

            });

        }

    }

    /* ==========================================
       COSMIC DUST
    ========================================== */

    createDust() {

        for (let i = 0; i < 400; i++) {

            this.dust.push({

                x:
                    Math.random() *
                    this.width,

                y:
                    Math.random() *
                    this.height,

                size:
                    Math.random() * 1.2,

                speed:
                    Math.random() * 0.05

            });

        }

    }

    /* ==========================================
       NEBULAS
    ========================================== */

    createNebulas() {

        for (let i = 0; i < 6; i++) {

            this.nebulas.push({

                x:
                    Math.random() *
                    this.width,

                y:
                    Math.random() *
                    this.height,

                radius:
                    250 +
                    Math.random() * 300,

                opacity:
                    0.04 +
                    Math.random() * 0.06,

                hue:
                    Math.random() > 0.5
                        ? 200
                        : 270

            });

        }

    }

    /* ==========================================
       DRAW STARS
    ========================================== */

    drawStars() {

        this.stars.forEach(star => {

            star.opacity +=
                (Math.random() - 0.5) *
                star.twinkle;

            star.opacity =
                Math.max(
                    0.1,
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
                `rgba(255,255,255,${star.opacity})`;

            this.ctx.fill();

            star.y += star.speed;

            if (
                star.y >
                this.height + 10
            ) {

                star.y = -10;

                star.x =
                    Math.random() *
                    this.width;

            }

        });

    }

    /* ==========================================
       DRAW DUST
    ========================================== */

    drawDust() {

        this.dust.forEach(particle => {

            this.ctx.beginPath();

            this.ctx.arc(

                particle.x,
                particle.y,

                particle.size,

                0,
                Math.PI * 2

            );

            this.ctx.fillStyle =
                "rgba(120,180,255,.15)";

            this.ctx.fill();

            particle.y +=
                particle.speed;

            if (
                particle.y >
                this.height
            ) {

                particle.y = -10;

            }

        });

    }

    /* ==========================================
       DRAW NEBULAS
    ========================================== */

    drawNebulas() {

        this.nebulas.forEach(nebula => {

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
                `hsla(${nebula.hue},100%,60%,${nebula.opacity})`
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

        });

    }

    /* ==========================================
       MILKY WAY BAND
    ========================================== */

    drawMilkyWay() {

        const gradient =
            this.ctx.createLinearGradient(

                0,
                this.height * 0.2,

                this.width,
                this.height * 0.8

            );

        gradient.addColorStop(
            0,
            "rgba(255,255,255,0)"
        );

        gradient.addColorStop(
            0.5,
            "rgba(255,255,255,0.03)"
        );

        gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );

        this.ctx.save();

        this.ctx.rotate(
            -0.3
        );

        this.ctx.fillStyle =
            gradient;

        this.ctx.fillRect(

            -400,
            this.height * 0.25,

            this.width + 1000,
            220

        );

        this.ctx.restore();

    }

    /* ==========================================
       MOUSE GLOW
    ========================================== */

    drawMouseGlow() {

        const glow =
            this.ctx.createRadialGradient(

                this.mouse.x,
                this.mouse.y,
                0,

                this.mouse.x,
                this.mouse.y,
                250

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

    /* ==========================================
       ANIMATE
    ========================================== */

    animate() {

        this.ctx.clearRect(

            0,
            0,
            this.width,
            this.height

        );

        this.drawNebulas();
        this.drawMilkyWay();
        this.drawDust();
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

function createShootingStar() {

    const star =
        document.createElement("div");

    star.className =
        "shooting-star";

    star.style.top =
        Math.random() * 40 + "%";

    star.style.left =
        Math.random() * 100 + "%";

    document.body.appendChild(
        star
    );

    setTimeout(() => {

        star.remove();

    }, 4000);

}

setInterval(
    createShootingStar,
    5000
);

/* ==========================================
   START ENGINE
========================================== */

window.addEventListener(
    "load",
    () => {

        new CosmicParticleEngine();

    }
);

/* ==========================================
   PARTICLE CSS
========================================== */

const particleStyle =
document.createElement("style");

particleStyle.textContent = `

#cosmicParticles{

    position:fixed;

    inset:0;

    width:100%;
    height:100%;

    pointer-events:none;

    z-index:-2;
}

.shooting-star{

    position:fixed;

    width:180px;
    height:2px;

    background:
        linear-gradient(
            90deg,
            white,
            transparent
        );

    border-radius:999px;

    pointer-events:none;

    z-index:-1;

    animation:
        shootingStar 4s linear forwards;
}

@keyframes shootingStar{

    from{

        transform:
            translate(0,0)
            rotate(25deg);

        opacity:1;
    }

    to{

        transform:
            translate(-1000px,700px)
            rotate(25deg);

        opacity:0;
    }

}

`;

document.head.appendChild(
    particleStyle
);