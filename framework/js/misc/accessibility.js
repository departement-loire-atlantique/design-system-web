class MiscAccessibility {
    static getEnabledElementsSelector() {
        return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object', 'area'].map(selector => selector + ':not([disabled])');
    }

    static getProtectedElementsSelector() {
        return ['i', 'sup'];
    }

    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    static addFocusLoop(element) {
        MiscAccessibility.removeFocusLoop();

        if (!element) {
            return;
        }

        const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }

        // Add class to first and last focusable elements
        focusableElements[0].classList.add('ds44-tmpFirstFocus');
        focusableElements[focusableElements.length - 1].classList.add('ds44-tmpLastFocus');

        // Create first hidden focus element
        const fakeFirstElement = document.createElement('span');
        fakeFirstElement.classList.add('ds44-tmpFocusHidden');
        fakeFirstElement.setAttribute('tabindex', '0');
        element.prepend(fakeFirstElement);

        // Create last hidden focus element
        const fakeLastElement = document.createElement('span');
        fakeLastElement.classList.add('ds44-tmpFocusHidden');
        fakeLastElement.setAttribute('tabindex', '0');
        element.appendChild(fakeLastElement);

        // Add events
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpLastFocus'), fakeFirstElement);
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpFirstFocus'), fakeLastElement);
    }

    // Delete loop elements
    static removeFocusLoop() {
        document
            .querySelectorAll('.ds44-tmpFocusHidden')
            .forEach((element) => {
                element.remove();
            })

        const firstFocusableElement = document.querySelector('.ds44-tmpFirstFocus');
        if (firstFocusableElement) {
            firstFocusableElement.classList.remove('ds44-tmpFirstFocus');
        }

        const lastFocusableElement = document.querySelector('.ds44-tmpLastFocus');
        if (lastFocusableElement) {
            lastFocusableElement.classList.remove('ds44-tmpLastFocus');
        }
    }

    // Mettre le focus sur un élément précis
    static setFocus(element, selector) {
        if (!element && selector) {
            element = document.querySelector(selector);
        }
        if (element) {
            element.focus();
        }
    }

    static show(element, force = false, bubble = true) {
        if (!element) {
            return;
        }

        if (MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) === -1) {
            if (force !== true) {
                MiscAccessibility.record(element);
            } else {
                MiscAccessibility.reinstate(element);
            }

            element.removeAttribute('aria-hidden');
            if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
                element.removeAttribute('tabindex');
            }
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.show(childElement, force, bubble);
            });
        }
    }

    static hide(element, force = false, bubble = true) {
        if (!element) {
            return;
        }

        if (MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) === -1) {
            if (force !== true) {
                MiscAccessibility.record(element);
            } else {
                MiscAccessibility.reinstate(element);
            }

            element.setAttribute('aria-hidden', true);
            if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
                element.setAttribute('tabindex', '-1');
            }
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.hide(childElement, force, bubble);
            });
        }
    }

    static record(element) {
        if (!element) {
            return;
        }

        if (!element.hasAttribute('data-bkp-aria-hidden')) {
            element.setAttribute('data-bkp-aria-hidden', (element.getAttribute('aria-hidden') || ''));
        }
        if (!element.hasAttribute('data-bkp-tabindex')) {
            element.setAttribute('data-bkp-tabindex', (element.getAttribute('tabindex') || ''));
        }
    }

    static reinstate(element) {
        if (!element) {
            return;
        }

        if (element.hasAttribute('data-bkp-aria-hidden')) {
            element.removeAttribute('data-bkp-aria-hidden');
        }
        if (element.hasAttribute('data-bkp-tabindex')) {
            element.removeAttribute('data-bkp-tabindex');
        }
    }
}
