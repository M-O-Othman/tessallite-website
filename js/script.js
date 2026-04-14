const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// Interactive Tabs (Accessible)
const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));

if (tabButtons.length && tabPanes.length) {
    const activateTab = (button, options = {}) => {
        const tabId = button.getAttribute('data-tab');
        const { focusPanel = false } = options;

        tabButtons.forEach((btn) => {
            const isSelected = btn === button;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', String(isSelected));
            btn.setAttribute('tabindex', isSelected ? '0' : '-1');
        });

        tabPanes.forEach((pane) => {
            const isMatch = pane.id === tabId;
            pane.classList.toggle('active', isMatch);
            pane.hidden = !isMatch;
            if (isMatch && focusPanel) {
                pane.focus({ preventScroll: true });
            }
        });
    };

    const initialActiveButton = tabButtons.find((btn) => btn.classList.contains('active')) || tabButtons[0];
    activateTab(initialActiveButton);

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            activateTab(button);
        });

        button.addEventListener('keydown', (e) => {
            let targetIndex = null;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                targetIndex = (index + 1) % tabButtons.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            } else if (e.key === 'Home') {
                targetIndex = 0;
            } else if (e.key === 'End') {
                targetIndex = tabButtons.length - 1;
            }

            if (targetIndex !== null) {
                e.preventDefault();
                tabButtons[targetIndex].focus();
                activateTab(tabButtons[targetIndex]);
            }
        });
    });
}

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navList) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('nav-list--visible');
        navToggle.classList.toggle('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navList.classList.remove('nav-list--visible');
            navToggle.classList.remove('nav-toggle--active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            header.style.height = '100px';
        } else {
            header.style.boxShadow = 'none';
            header.style.height = '120px';
        }
    });
}
