class MiscAccessibility {
    static getEnabledElementsSelector () {
        return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object', 'area'].map(selector => selector + ':not([disabled])');
    }
​
    static getProtectedElementsSelector () {
        return ['i', 'sup', 'svg', 'hr'];
    }
​
    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    static addFocusLoop (element) {
        MiscAccessibility.removeFocusLoop();
​
        if (!element) {
            return;
        }
​
        const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }
​
        // Add class to first and last focusable elements
        focusableElements[0].classList.add('ds44-tmpFirstFocus');
        focusableElements[focusableElements.length - 1].classList.add('ds44-tmpLastFocus');
​
        // Create first hidden focus element
        const fakeFirstElement = document.createElement('span');
        fakeFirstElement.classList.add('ds44-tmpFocusHidden');
        fakeFirstElement.setAttribute('tabindex', '0');
        element.prepend(fakeFirstElement);
​
        // Create last hidden focus element
        const fakeLastElement = document.createElement('span');
        fakeLastElement.classList.add('ds44-tmpFocusHidden');
        fakeLastElement.setAttribute('tabindex', '0');
        element.appendChild(fakeLastElement);
​
        // Add events
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpLastFocus'), fakeFirstElement);
        MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.ds44-tmpFirstFocus'), fakeLastElement);
    }
​
    // Delete loop elements
    static removeFocusLoop () {
        document
            .querySelectorAll('.ds44-tmpFocusHidden')
            .forEach((element) => {
                element.remove();
            })
​
        const firstFocusableElement = document.querySelector('.ds44-tmpFirstFocus');
        if (firstFocusableElement) {
            firstFocusableElement.classList.remove('ds44-tmpFirstFocus');
        }
​
        const lastFocusableElement = document.querySelector('.ds44-tmpLastFocus');
        if (lastFocusableElement) {
            lastFocusableElement.classList.remove('ds44-tmpLastFocus');
        }
    }
​
    // Mettre le focus sur un élément précis
    static setFocus (element, selector) {
        if (!element && selector) {
            element = document.querySelector(selector);
        }
        if (element) {
            let hasTabIndex = element.hasAttribute('tabindex');
            // Ajouter un tabindex temporaire si l'élément n'en a pas
            if (!hasTabIndex) {
            	element.setAttribute('tabindex','-1');
            }
            element.focus();
            if (!hasTabIndex) {
            	element.removeAttribute('tabindex','-1');
            }
        }
    }
​
    static show (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }
​
        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }
​
        if (!isChild) {
            // Is parent element
            element.removeAttribute('aria-hidden');
        }
        if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
            if (element.hasAttribute('data-bkp-tabindex')) {
                if (element.getAttribute('data-bkp-tabindex') != '') {
                    element.setAttribute('tabindex', element.getAttribute('data-bkp-tabindex'));
                }
            } else {
                element.removeAttribute('tabindex');
            }
            element.removeAttribute('data-bkp-tabindex');
​
            if (
                force &&
                element.getAttribute('tabindex') === '-1'
            ) {
                element.removeAttribute('tabindex');
            }
        }
​
        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.show(childElement, bubble, force, true);
            });
        }
    }
​
    static hide (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }
​
        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }
​
        if (!isChild) {
            // Is parent element
            element.setAttribute('aria-hidden', true);
        }
        if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
            if (force) {
                element.setAttribute('data-bkp-tabindex', '-1');
            } else if (!element.hasAttribute('data-bkp-tabindex')) {
                if (element.hasAttribute('tabindex')) {
                    element.setAttribute('data-bkp-tabindex', element.getAttribute('tabindex'));
                } else {
                    element.setAttribute('data-bkp-tabindex', '');
                }
            }
​
            element.setAttribute('tabindex', '-1');
        }
​
        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.hide(childElement, bubble, force, true);
            });
        }
    }
​
    static flattenText (text) {
        return text.replace(/\n/gi, ' ').replace(/[ ]+/gi, ' ').trim();
    }
}
