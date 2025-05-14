const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Function to generate spiral arms for the galaxy
function generateGalaxy(starCount) {
  for (let i = 0; i < starCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 0.5) * 400; // Spread

    const armOffset = (Math.random() - 0.5) * 0.4;
    const spiralArm = Math.floor(Math.random() * 4);
    const armAngle = angle + spiralArm * (Math.PI / 2) + armOffset;

    const speed = 0.001 + Math.random() * 0.001;

    stars.push({
      x: Math.cos(armAngle) * radius,
      y: Math.sin(armAngle) * radius,
      radius: Math.random() * 1.5,
      angle: armAngle,
      dist: radius,
      speed,
      color: `hsla(${200 + Math.random() * 80}, 100%, 80%, ${Math.random()})`
    });
  }
}

generateGalaxy(1500);

// Function to animate the galaxy
function animateGalaxy() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(centerX, centerY);

  for (let star of stars) {
    star.angle += star.speed;
    const x = Math.cos(star.angle) * star.dist;
    const y = Math.sin(star.angle) * star.dist;

    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  }

  ctx.restore();

  requestAnimationFrame(animateGalaxy);
}

animateGalaxy();

// Function to create a shooting star with tail effect
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');

  // Random starting position and animation delay
  star.style.top = `${Math.random() * -20}px`; // Random top position (starting above the screen)
  star.style.left = `${Math.random() * window.innerWidth}px`; // Random left position

  // Random animation delay to create a more natural effect
  star.style.animationDelay = `${Math.random() * 5}s`;

  // Append the shooting star to the .shooting-stars container
  document.querySelector('.shooting-stars').appendChild(star);

  // Remove the star after the animation completes to avoid memory leaks
  setTimeout(() => {
    star.remove();
  }, 5000); // Matches the duration of the shooting star animation
}

// Create a shooting star every 1.5 seconds
setInterval(createShootingStar, 1500);
