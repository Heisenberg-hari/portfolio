document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach((n) =>
        n.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active') && hamburger) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        })
    );

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 3. Fade-in on Scroll using IntersectionObserver
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    // 4. Proximity + glass interactions
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    const interactiveItems = Array.from(
        document.querySelectorAll('.project-card, .detail-card, .skills-list li, .contact-links a, .btn')
    );

    if (!interactiveItems.length) return;

    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateEffects = () => {
        interactiveItems.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = mouseX - cx;
            const dy = mouseY - cy;
            const distance = Math.hypot(dx, dy);
            const activeRadius = Math.max(220, rect.width * 1.1);
            const influence = Math.max(0, 1 - distance / activeRadius);

            const localX = ((mouseX - rect.left) / rect.width) * 100;
            const localY = ((mouseY - rect.top) / rect.height) * 100;
            el.style.setProperty('--mx', `${Math.min(100, Math.max(0, localX))}%`);
            el.style.setProperty('--my', `${Math.min(100, Math.max(0, localY))}%`);
            el.style.setProperty('--glow', influence.toFixed(3));

            if (el.classList.contains('project-card') || el.classList.contains('detail-card')) {
                const tiltX = Math.max(-5, Math.min(5, (dy / activeRadius) * -8 * influence));
                const tiltY = Math.max(-5, Math.min(5, (dx / activeRadius) * 8 * influence));
                el.style.transform = `translateY(${-4 * influence}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }
        });

        rafId = null;
    };

    const queueUpdate = () => {
        if (!rafId) rafId = window.requestAnimationFrame(updateEffects);
    };

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        queueUpdate();
    });

    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);
    queueUpdate();
});
