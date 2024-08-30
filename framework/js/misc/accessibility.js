class MiscAccessibility {
    static getEnabledElementsSelector () {
        return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object', 'area'].map(selector => selector + ':not([disabled])');
    }

    static getTagsListAutoTabIndex() {
        return ['DIV', 'SPAN', 'MAIN', "HEADER", "FOOTER", "IMG"];
    }

    static getProtectedElementsSelector () {
        return ['i', 'sup', 'svg', 'hr'];
    }
    
    // Fonction qui détermine si un élément est affiché dans le DOM (display != none)
    static isDisplayed(element) {
        if (!element) {
            return false;
        }
        return !(window.getComputedStyle(element).display === "none");
    }

    // Fonction qui détermine si un élément est affiché dans le DOM (display != none)
    static isViewByDevice(element) {
        if (!element) {
            return false;
        }
        if(MiscUtils.isMobileSize())
        {
            return !element.closest(".ds44-hide-mobile");
        }
        else
        {
            return !element.closest(".ds44-hide-medium");
        }
    }

    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    static addFocusAutoclose (element) {
        MiscAccessibility.removeFocusLoop();

        if (!element) {
            return;
        }

        const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }

        // Add class to first and last focusable elements
        // For loops to make sure the first and last focusable elements are displayed
        for (let indexElem in Array.prototype.slice.call(focusableElements)) {
            let itElem = Array.prototype.slice.call(focusableElements)[indexElem];
            if (MiscAccessibility.isDisplayed(itElem) && MiscAccessibility.isViewByDevice(itElem)) {
                itElem.classList.add('ds44-tmpFirstFocus');
                break;
            }
        }
        // Starting from the end
        for (let indexElem in Array.prototype.slice.call(focusableElements).reverse()) {
            let itElem = Array.prototype.slice.call(focusableElements).reverse()[indexElem];
            if (MiscAccessibility.isDisplayed(itElem) && MiscAccessibility.isViewByDevice(itElem)) {
                itElem.classList.add('ds44-tmpLastFocus');
                break;
            }
        }

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
        MiscEvent.addListener('focus', ()=>{
            MiscEvent.dispatch("focus-first-loop", {}, element);
        }, fakeFirstElement);
        MiscEvent.addListener('focus', ()=>{
            MiscEvent.dispatch("focus-last-loop", {}, element);
        }, fakeLastElement);
    }

    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    static addFocusLoop (element) {
        MiscAccessibility.removeFocusLoop();

        if (!element) {
            return;
        }

        const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }

        // Add class to first and last focusable elements
        // For loops to make sure the first and last focusable elements are displayed
        for (let indexElem in Array.prototype.slice.call(focusableElements)) {
        	let itElem = Array.prototype.slice.call(focusableElements)[indexElem];
            if (MiscAccessibility.isDisplayed(itElem) && MiscAccessibility.isViewByDevice(itElem)) {
            	itElem.classList.add('ds44-tmpFirstFocus');
                break;
            }
        }
        // Starting from the end
        for (let indexElem in Array.prototype.slice.call(focusableElements).reverse()) {
        	let itElem = Array.prototype.slice.call(focusableElements).reverse()[indexElem];
            if (MiscAccessibility.isDisplayed(itElem) && MiscAccessibility.isViewByDevice(itElem)) {
            	itElem.classList.add('ds44-tmpLastFocus');
                break;
            }
        }

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
    static removeFocusLoop () {
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
    static setFocus (element, selector) {
        if (!element && selector) {
            element = document.querySelector(selector);
        }
        if (element !== undefined && element && element.innerHTML !== undefined ) {
            if(element.getAttribute('tabindex') !== null && element.getAttribute('tabindex') !== "") {
                element.setAttribute('data-old-tabindex', element.getAttribute('tabindex'));
            }
            else {
                element.setAttribute('data-old-tabindex', "");
            }
            if(MiscAccessibility.getTagsListAutoTabIndex().includes(element.tagName))
            {
                element.setAttribute('tabindex', -1);
            }
            element.focus();
            MiscEvent.addListener('blur', MiscAccessibility.restoreFocus, element);
        }
    }

    static restoreFocus (evt) {
        const element = evt.currentTarget;
        const oldTabindex = element.getAttribute('data-old-tabindex');
        if (oldTabindex === null) {
            return;
        }

        if (
            oldTabindex === '' ||
            oldTabindex === 'null'
        ) {
            element.removeAttribute('tabindex');
        } else {
            element.setAttribute('tabindex', oldTabindex);
        }
        element.removeAttribute('data-old-tabindex');
        MiscEvent.removeListener('blur', MiscAccessibility.restoreFocus, element);
    }

    static show (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }

        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }

        if (!isChild) {
            // Is parent element
            element.removeAttribute('aria-hidden');
        }
        if (element.closest(MiscAccessibility.getEnabledElementsSelector()) === element) {
            if (element.hasAttribute('data-bkp-tabindex')) {
                const bkpTabindex = element.getAttribute('data-bkp-tabindex');
                if (
                    bkpTabindex !== '' &&
                    bkpTabindex !== 'null' &&
                    bkpTabindex !== null
                ) {
                    element.setAttribute('tabindex', bkpTabindex);
                } else {
                    element.removeAttribute('tabindex');   
                }
            } else {
                element.removeAttribute('tabindex');
            }
            element.removeAttribute('data-bkp-tabindex');

            if (
                force &&
                element.getAttribute('tabindex') === '-1'
            ) {
                element.removeAttribute('tabindex');
            }
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.show(childElement, bubble, force, true);
            });
        }
    }

    static hide (element, bubble = true, force = true, isChild = false) {
        if (!element) {
            // No element
            return;
        }

        if (
            MiscAccessibility.getProtectedElementsSelector().indexOf(element.tagName.toLowerCase()) !== -1 ||
            element.getAttribute('data-a11y-exclude') === 'true'
        ) {
            // Protected element
            return;
        }

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
            element.setAttribute('tabindex', '-1');
            element.removeAttribute('data-old-tabindex');
        }

        if (bubble) {
            Array.from(element.children).map((childElement) => {
                MiscAccessibility.hide(childElement, bubble, force, true);
            });
        }
    }

    static flattenText (text) {
        return text.replace(/\n/gi, ' ').replace(/[ ]+/gi, ' ').trim();
    }
}
