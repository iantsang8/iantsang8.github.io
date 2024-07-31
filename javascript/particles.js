// Particle effect
const particleOverlay = document.getElementById('particle-overlay');
const ctx = particleOverlay.getContext('2d');

let particlesArray;

// Set canvas size
function resizeCanvas() {
    particleOverlay.width = particleOverlay.offsetWidth;
    particleOverlay.height = particleOverlay.offsetHeight;
}

// Call resizeCanvas initially and on window resize
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});

// Create particle
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Avoid middle section
        const middleX = particleOverlay.width / 2;
        const middleY = particleOverlay.height / 2;
        const avoidRadius = 250; // Adjust this value to change the size of the avoided area

        const dx = this.x - middleX;
        const dy = this.y - middleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < avoidRadius) {
            const angle = Math.atan2(dy, dx);
            this.x = middleX + Math.cos(angle) * avoidRadius;
            this.y = middleY + Math.sin(angle) * avoidRadius;
        }

        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (particleOverlay.height * particleOverlay.width) / 14000;
    for (let i = 0; i < numberOfParticles; i++) {
        let x, y;
        do {
            x = Math.random() * particleOverlay.width;
            y = Math.random() * particleOverlay.height;
        } while (isInMiddleSection(x, y));
        particlesArray.push(new Particle(x, y));
    }
}

function isInMiddleSection(x, y) {
    const middleX = particleOverlay.width / 2;
    const middleY = particleOverlay.height / 2;
    const avoidRadius = 200; // Same as in the Particle class

    const dx = x - middleX;
    const dy = y - middleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < avoidRadius;
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, particleOverlay.width, particleOverlay.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            let x, y;
            do {
                x = Math.random() * particleOverlay.width;
                y = Math.random() * particleOverlay.height;
            } while (isInMiddleSection(x, y));
            particlesArray.push(new Particle(x, y));
        }
    }
    requestAnimationFrame(animateParticles);
}

// Initialize particles
init();
animateParticles();