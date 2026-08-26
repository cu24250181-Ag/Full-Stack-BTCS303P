/* particuls.js - ANIMEMERCH Interactive Anime Particle Canvas */
document.addEventListener('DOMContentLoaded', () => {
    // Create canvas element dynamically if not present
    let canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 65);

    // Particle types: Energy spark & Sakura petal
    const colors = [
        'rgba(255, 42, 116, ',   // Neon Pink
        'rgba(0, 240, 255, ',    // Cyan
        'rgba(157, 78, 221, ',   // Violet
        'rgba(255, 183, 178, '   // Sakura Pink
    ];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = Math.random() * 0.8 + 0.3; // Gentle downward or floating motion
            this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.6 + 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.isPetal = Math.random() > 0.6;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.x += this.speedX + Math.sin(this.angle) * 0.5;
            this.y += this.speedY;
            this.angle += this.spin;

            // Fade oscillation
            this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.005;
            if (this.alpha < 0.1) this.alpha = 0.1;
            if (this.alpha > 0.8) this.alpha = 0.8;

            // Respawn if off-screen
            if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                this.y = -10;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);

            if (this.isPetal) {
                ctx.rotate(this.angle);
                ctx.fillStyle = this.colorPrefix + this.alpha + ')';
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size * 2, this.size * 3.5, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = this.colorPrefix + this.alpha + ')';
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.colorPrefix + '0.8)';
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});

// Mobile Navbar Toggle Script
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }
});