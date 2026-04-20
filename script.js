/* ═══════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Tushar Chaudhary
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. Animated dot-grid background canvas ─── */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function buildDots() {
        dots = [];
        const spacing = 38;
        const cols = Math.ceil(W / spacing) + 1;
        const rows = Math.ceil(H / spacing) + 1;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                dots.push({ x: x * spacing, y: y * spacing, r: 0, base: 0.8 + Math.random() * 0.6 });
            }
        }
    }

    let mouse = { x: -999, y: -999 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    function drawDots() {
        ctx.clearRect(0, 0, W, H);
        const scrollY = window.scrollY;
        dots.forEach(d => {
            const dx = d.x - mouse.x;
            const dy = (d.y - scrollY * 0.05) - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const glow = dist < 140 ? (1 - dist / 140) : 0;
            const opacity = Math.min(d.base + glow * 3, 1) * 0.18;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = glow > 0
                ? `rgba(167,139,250,${opacity})`
                : `rgba(148,163,184,${opacity * 0.6})`;
            ctx.fill();
        });
    }

    function bgLoop() {
        drawDots();
        requestAnimationFrame(bgLoop);
    }

    resize();
    buildDots();
    bgLoop();
    window.addEventListener('resize', () => { resize(); buildDots(); });


    /* ─── 2. Mobile hamburger menu ─── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ─── 3. Active nav link on scroll ─── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                const id = sec.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    /* ─── 4. Smooth scrolling ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ─── 5. Skill tabs ─── */
    const tabBtns    = document.querySelectorAll('.tab-btn');
    const skillPanels = document.querySelectorAll('.skills-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            skillPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            const panel = document.getElementById(`tab-${tab}`);
            if (panel) {
                panel.classList.add('active');
                // Re-trigger bar fill animations
                panel.querySelectorAll('.skill-bar-fill').forEach(f => {
                    f.style.animation = 'none';
                    f.offsetHeight; // reflow
                    f.style.animation = '';
                });
            }
        });
    });


    /* ─── 6. Scroll reveal ─── */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on sibling index
                const siblings = [...entry.target.parentElement.children];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.08}s`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ─── 7. Navbar shrink on scroll ─── */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.top = '0.75rem';
        } else {
            navbar.style.top = '1.5rem';
        }
    }, { passive: true });


    /* ─── 8. Hero identity card orbit animation ─── */
    const orbitIcons = document.querySelectorAll('.orbit-icon');
    const angles = [90, 210, 330];
    const radius = 70;

    function animateOrbits() {
        const now = Date.now() / 1000;
        orbitIcons.forEach((icon, i) => {
            const angle = ((angles[i] + now * 30) * Math.PI) / 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            icon.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            icon.style.top  = '50%';
            icon.style.left = '50%';
        });
        requestAnimationFrame(animateOrbits);
    }

    animateOrbits();


    /* ─── 9. Category Switcher + Dual Carousel ─── */

    /* ── 9a. Reusable carousel factory ── */
    function makeCarousel(carouselId, wrapperId, prevBtnId, nextBtnId, dotsContainerId, hintId) {
        const track   = document.getElementById(carouselId);
        const wrapper = document.getElementById(wrapperId);
        const btnPrev = document.getElementById(prevBtnId);
        const btnNext = document.getElementById(nextBtnId);
        const hint    = document.getElementById(hintId);
        const dotsEl  = document.getElementById(dotsContainerId);

        if (!track || !wrapper) return;

        const cards       = [...track.querySelectorAll('.project-card')];
        const dotBtns     = dotsEl ? [...dotsEl.querySelectorAll('.dot')] : [];
        let currentIndex  = 0;
        let isDragging    = false;
        let startX        = 0;
        let currentTX     = 0;
        let dragOffset    = 0;

        function getOffsetForIndex(idx) {
            const card     = cards[idx];
            const wrapRect = wrapper.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const matrix   = new DOMMatrix(getComputedStyle(track).transform);
            return matrix.m41 - (cardRect.left - wrapRect.left);
        }

        function applyTransform(x, animated = true) {
            track.style.transition = animated
                ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            track.style.transform = `translateX(${x}px)`;
        }

        function goTo(idx, animated = true) {
            currentIndex = Math.max(0, Math.min(idx, cards.length - 1));
            applyTransform(getOffsetForIndex(currentIndex), animated);
            updateUI();
        }

        function updateUI() {
            dotBtns.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            cards.forEach((c, i) => c.classList.toggle('active-card', i === currentIndex));
            if (btnPrev) btnPrev.disabled = currentIndex === 0;
            if (btnNext) btnNext.disabled = currentIndex === cards.length - 1;
        }

        /* Buttons */
        btnPrev && btnPrev.addEventListener('click', () => goTo(currentIndex - 1));
        btnNext && btnNext.addEventListener('click', () => goTo(currentIndex + 1));

        /* Dot clicks */
        dotBtns.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

        /* Mouse drag */
        wrapper.addEventListener('mousedown', e => {
            isDragging = true;
            startX     = e.clientX;
            currentTX  = new DOMMatrix(getComputedStyle(track).transform).m41;
            wrapper.classList.add('is-dragging');
            track.style.transition = 'none';
            if (hint) { hint.style.opacity = '0'; hint.style.pointerEvents = 'none'; }
        });

        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            dragOffset = e.clientX - startX;
            track.style.transform = `translateX(${currentTX + dragOffset}px)`;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.classList.remove('is-dragging');
            const threshold = 60;
            if      (dragOffset < -threshold && currentIndex < cards.length - 1) goTo(currentIndex + 1);
            else if (dragOffset >  threshold && currentIndex > 0)                goTo(currentIndex - 1);
            else                                                                  goTo(currentIndex);
            dragOffset = 0;
        });

        /* Touch drag */
        let touchStartX = 0, touchCurrentTX = 0;
        track.addEventListener('touchstart', e => {
            touchStartX   = e.touches[0].clientX;
            touchCurrentTX = new DOMMatrix(getComputedStyle(track).transform).m41;
            track.style.transition = 'none';
            if (hint) { hint.style.opacity = '0'; hint.style.pointerEvents = 'none'; }
        }, { passive: true });

        track.addEventListener('touchmove', e => {
            track.style.transform = `translateX(${touchCurrentTX + e.touches[0].clientX - touchStartX}px)`;
        }, { passive: true });

        track.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if      (diff < -50 && currentIndex < cards.length - 1) goTo(currentIndex + 1);
            else if (diff >  50 && currentIndex > 0)                 goTo(currentIndex - 1);
            else                                                      goTo(currentIndex);
        });

        /* Init (double rAF ensures layout is ready) */
        requestAnimationFrame(() => requestAnimationFrame(() => goTo(0, false)));

        /* Return goTo so category switch can reset */
        return () => goTo(0, false);
    }

    /* ── 9b. Init both carousels ── */
    const resetDash = makeCarousel('dash-carousel', 'dash-wrapper', 'dash-prev', 'dash-next', 'dash-dots', 'dash-drag-hint');
    const resetML   = makeCarousel('ml-carousel',   'ml-wrapper',   'ml-prev',   'ml-next',   'ml-dots',   'ml-drag-hint');

    /* ── 9c. Category Switcher (gliding pill) ── */
    const catBtns  = [...document.querySelectorAll('.cat-btn')];
    const glider   = document.getElementById('cat-glider');
    const catPanels = { dashboards: document.getElementById('panel-dashboards'), ml: document.getElementById('panel-ml') };

    function positionGlider(btn) {
        if (!glider || !btn) return;
        glider.style.width     = btn.offsetWidth + 'px';
        glider.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
    }

    function switchCategory(cat) {
        catBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
        Object.entries(catPanels).forEach(([key, panel]) => {
            if (!panel) return;
            panel.classList.toggle('active', key === cat);
        });
        positionGlider(document.getElementById('cat-btn-' + cat));
        /* Reset the newly visible carousel so it starts at card 0 */
        if (cat === 'dashboards' && resetDash) setTimeout(resetDash, 50);
        if (cat === 'ml'         && resetML)   setTimeout(resetML,   50);
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.dataset.cat));
    });

    /* Position glider on load */
    requestAnimationFrame(() => {
        const activeBtn = document.querySelector('.cat-btn.active');
        positionGlider(activeBtn);
    });

    /* Re-position glider on window resize */
    window.addEventListener('resize', () => {
        const activeBtn = document.querySelector('.cat-btn.active');
        positionGlider(activeBtn);
    }, { passive: true });

});
