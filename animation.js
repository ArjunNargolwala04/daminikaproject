// Get the canvas and context
const canvas = document.getElementById('flowersCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the container
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Heart shape function using polar coordinates
function heartShape(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

// Particle class representing each "1" or "0"
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        const heartPos = heartShape(Math.random() * Math.PI * 2);
        this.targetX = canvas.width / 2 + heartPos.x * 10; // Scale the heart size
        this.targetY = canvas.height / 2 - heartPos.y * 10; // Flip y-axis and scale
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 0.02 + 0.01;
        this.character = Math.random() > 0.5 ? '1' : '0';
        this.color = `rgb(255, ${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)})`;
    }

    update() {
        // Move towards the target position
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px 'Courier New', monospace`;
        ctx.fillText(this.character, this.x, this.y);
    }
}

// Create particles
const particlesArray = [];
const numberOfParticles = 200;

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();
