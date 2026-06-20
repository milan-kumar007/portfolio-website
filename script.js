// Navigation Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Reveal Animations on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements dynamically
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .skill-box, .section-header, .contact-card').forEach((el) => {
        el.classList.add('reveal');
    });
    
    // Trigger once on load
    setTimeout(reveal, 100);
});

window.addEventListener('scroll', reveal);

// Quantum Particle Network Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    // Adjust density based on screen size
    const density = window.innerWidth < 768 ? 20000 : 12000;
    const particleCount = Math.floor((width * height) / density);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        // Cyan and Indigo mix
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(99, 102, 241, 0.5)';
        this.baseX = this.x;
        this.baseY = this.y;
    }

    update(mouseX, mouseY) {
        // Subtle mouse interaction
        if (mouseX && mouseY) {
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = 150;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * 0.5;
            let directionY = forceDirectionY * force * 0.5;

            if (distance < maxDistance) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Return to wandering if mouse leaves area
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 50;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 50;
                }
            }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) {
            this.vx = -this.vx;
            this.baseX = this.x;
        }
        if (this.y < 0 || this.y > height) {
            this.vy = -this.vy;
            this.baseY = this.y;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Connect if close enough
            if (distance < 100) {
                ctx.beginPath();
                // Create a gradient line between the two particles based on distance
                const opacity = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.15})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

let mouseX = null;
let mouseY = null;

window.addEventListener('mousemove', (e) => {
    mouseX = e.x;
    mouseY = e.y;
});

window.addEventListener('mouseout', () => {
    mouseX = null;
    mouseY = null;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    initCanvas();
});

// Initialize canvas effect
initCanvas();
animate();

// Glitch effect on title hover
const glitchTitle = document.querySelector('.glitch');
if(glitchTitle) {
    glitchTitle.addEventListener('mouseover', () => {
        glitchTitle.style.transform = 'translate(2px, 2px)';
        setTimeout(() => glitchTitle.style.transform = 'translate(-2px, -2px)', 50);
        setTimeout(() => glitchTitle.style.transform = 'translate(0, 0)', 100);
    });
}
