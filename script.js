/* ------------------------------------------------------------------
   KINGNOTHIN — Landing page interactions
   ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------
    // Current year in footer
    // ------------------------------------------------------------------

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    // ------------------------------------------------------------------
    // Hero constellation canvas
    // ------------------------------------------------------------------

    const canvas = document.getElementById('constellation');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let mouse = { x: null, y: null };
    let animationId = null;
    let isVisible = true;

    const STAR_COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
    const CONNECTION_DISTANCE = 120;
    const MOUSE_CONNECTION_DISTANCE = 140;
    const STAR_RADIUS = { min: 0.6, max: 1.6 };

    function resize() {
        const hero = canvas.parentElement;
        if (!hero) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = hero.clientWidth;
        height = hero.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        buildStars();
    }

    function buildStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * (STAR_RADIUS.max - STAR_RADIUS.min) + STAR_RADIUS.min,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                opacity: Math.random() * 0.4 + 0.3
            });
        }
    }

    function draw() {
        if (!isVisible) return;

        ctx.clearRect(0, 0, width, height);

        // Update and draw stars
        stars.forEach((star) => {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0 || star.x > width) star.vx *= -1;
            if (star.y < 0 || star.y > height) star.vy *= -1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 240, 232, ${star.opacity})`;
            ctx.fill();
        });

        // Draw connections between nearby stars
        ctx.lineWidth = 0.5;
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
                    ctx.stroke();
                }
            }

            // Connect to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = stars[i].x - mouse.x;
                const dy = stars[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / MOUSE_CONNECTION_DISTANCE) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    function handleTouchMove(e) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
    }

    function handleTouchEnd() {
        mouse.x = null;
        mouse.y = null;
    }

    // Pause when canvas is not visible to save resources
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationId) {
                draw();
            }
        });
    }, { threshold: 0 });

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        animationId = null;
        resize();
        if (isVisible) draw();
    }, { passive: true });

    resize();
    visibilityObserver.observe(canvas);
    draw();
});
