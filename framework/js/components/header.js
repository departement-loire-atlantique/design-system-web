'use strict';

class Header {
    lastScroll = 0;
    isTabEnabled = true;

    constructor() {
        if (document.querySelector('.ds44-blocBandeau') !== null) {
            // Bind events
            window.addEventListener('scroll', () => {
                window.setTimeout(this.scroll, 100)
            });
            document.addEventListener('modal:show', () => {this.isTabEnabled = false;});
            document.addEventListener('modal:hide', () => {this.isTabEnabled = true;});

            // Initialization
            this.checkFocusPosition();
        }
    }

    // Sur le focus au clavier d'un élément caché sous le header, effectuer un scroll vers le haut pour que l'élément soit affiché
    checkFocusPosition() {
        const header = document.querySelector('.ds44-header');
        if (header === null) {
            return;
        }

        document.addEventListener(
            'keyup',
            (event) => {
                if (
                    this.isTabEnabled === true &&
                    (event.key || '').toLowerCase() === 'tab'
                ) {
                    const activeElement = document.activeElement;
                    if (header.contains(activeElement)) {
                        return;
                    }

                    const threshold = header.classList.contains('hidden') ? header.getBoundingClientRect().bottom + 100 : header.getBoundingClientRect().bottom;
                    if (activeElement.getBoundingClientRect().top < threshold) {
                        window.scrollBy(0, -(150 - activeElement.getBoundingClientRect().top));
                    }
                }
            }
        );
    }

    // Gérer le comportement du header en fonction des scrolls
    // Source : https://codepen.io/tutsplus/pen/WNerWWp
    scroll() {
        const header = document.querySelector('.ds44-header');
        if (header === null) {
            return;
        }

        const currentScroll = window.pageYOffset;
        if (currentScroll === 0) {
            header.classList.remove('hidden');
            header.removeAttribute('aria-hidden');
            if (document.activeElement === document.querySelector('html')) {
                setTimeout(
                    () => {
                        document.querySelector('.ds44-btn--menu').focus();
                    },
                    100
                );
            }
            return;
        }

        if (
            currentScroll > this.lastScroll &&
            !header.classList.contains('hidden') &&
            currentScroll > header.offsetHeight
        ) {
            // Scroll vers le bas, uniquement si le haut de page est
            // en dessous de la hauteur du header
            header.classList.add('hidden');
            header.setAttribute('aria-hidden', 'true');
        } else if (
            currentScroll < this.lastScroll &&
            header.classList.contains('hidden')
        ) {
            // up
            header.classList.remove('hidden');
            header.removeAttribute('aria-hidden');
        }

        this.lastScroll = currentScroll;
    }
}

// Singleton
new Header();
