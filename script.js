// toggle menu mobile
const menuBtn = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        mobileNav.setAttribute('aria-hidden', String(!open));
    });
}

// smooth logo click: kembali ke atas
const logoLink = document.querySelector('.logo a[href="#beranda"]') || document.querySelector('.logo a[href="#"]') || document.querySelector('a.logo[href^="#"]');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}

// smooth scroll untuk link internal #
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (mobileNav) {
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// prevent copying page text and dragging images
document.addEventListener('copy', (event) => {
    event.preventDefault();
});

document.addEventListener('cut', (event) => {
    event.preventDefault();
});

document.addEventListener('dragstart', (event) => {
    if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
    }
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealElements = document.querySelectorAll(
        '.section-head, .profile-grid, .card-container, .ppdb-form-card'
    );
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.documentElement.classList.add('motion-ready');
    revealElements.forEach((element) => {
        element.classList.add('reveal-on-scroll');
        revealObserver.observe(element);
    });
}