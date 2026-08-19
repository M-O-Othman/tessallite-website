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

// Screenshot enlargement
const screenshotImages = Array.from(document.querySelectorAll(
    '.hero-screen img, .screen-tile img, .proof-card img, .screen-media img, .mini-screen-card img, .screen-frame img'
));

if (screenshotImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'screenshot-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded product screenshot');
    lightbox.innerHTML = `
        <div class="screenshot-lightbox__panel" role="document">
            <img class="screenshot-lightbox__image" alt="">
            <div class="screenshot-lightbox__caption"></div>
            <button class="screenshot-lightbox__close" type="button" aria-label="Close expanded screenshot">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.screenshot-lightbox__image');
    const lightboxCaption = lightbox.querySelector('.screenshot-lightbox__caption');
    const closeButton = lightbox.querySelector('.screenshot-lightbox__close');
    let activeTrigger = null;

    const getCaption = (image) => {
        const figure = image.closest('figure, article');
        const strong = figure?.querySelector('figcaption strong, .proof-body h3');
        return strong?.textContent?.trim() || image.alt || 'Product screenshot';
    };

    const openScreenshot = (image) => {
        activeTrigger = image.closest('figure, article') || image;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || '';
        lightboxCaption.textContent = getCaption(image);
        lightbox.classList.add('is-open');
        document.body.classList.add('screenshot-lightbox-open');
        closeButton.focus({ preventScroll: true });
    };

    const closeScreenshot = () => {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('screenshot-lightbox-open');
        lightboxImage.removeAttribute('src');
        if (activeTrigger instanceof HTMLElement) {
            activeTrigger.focus({ preventScroll: true });
        }
        activeTrigger = null;
    };

    screenshotImages.forEach((image) => {
        const trigger = image.closest('figure, article') || image;
        trigger.classList.add('screenshot-zoomable');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-label', `View larger: ${getCaption(image)}`);

        trigger.addEventListener('click', () => openScreenshot(image));
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openScreenshot(image);
            }
        });
    });

    closeButton.addEventListener('click', closeScreenshot);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeScreenshot();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeScreenshot();
        }
    });
}
