class Accessibility {
    constructor() {
        // Variables
        this.fakeFirstElement = null;
        this.fakeLastElement = null;

        // Listeners
        this.goToFirstListener = this.setFocus.bind(this, null, '.ds44-tmpFirstFocus');
        this.goToLastListener = this.setFocus.bind(this, null, '.ds44-tmpLastFocus');

        // Events
        MiscEvent.addListener('focus:set', this.setFocus.bind(this));
        MiscEvent.addListener('focus:addLoop', this.addFocusLoop.bind(this));
        MiscEvent.addListener('focus:removeLoop', this.removeFocusLoop.bind(this));
        MiscEvent.addListener('accessibility:show', this.show.bind(this));
        MiscEvent.addListener('accessibility:hide', this.hide.bind(this));
        MiscEvent.addListener('accessibility:reinstate', this.reinstate.bind(this));
    }

    static getEnabledElementsSelector() {
        return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object'].map(selector => selector + ':not([disabled])');
    }

    // Fonction qui va forcer le focus à faire une boucle sur un élément
    // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
    // et à la fin
    addFocusLoop(evt) {
        this.removeFocusLoop();

        if (
            !evt ||
            !evt.detail ||
            !evt.detail.element
        ) {
            return;
        }

        const element = evt.detail.element;
        const focusableElements = element.querySelectorAll(Accessibility.getEnabledElementsSelector());
        if (!focusableElements.length) {
            return;
        }

        // Add class to first and last focusable elements
        focusableElements[0].classList.add('ds44-tmpFirstFocus');
        focusableElements[focusableElements.length - 1].classList.add('ds44-tmpLastFocus');

        // Create first hidden focus element
        this.fakeFirstElement = document.createElement('span');
        this.fakeFirstElement.classList.add('ds44-tmpFocusHidden');
        this.fakeFirstElement.setAttribute('tabindex', '0');
        element.prepend(this.fakeFirstElement);

        // Create last hidden focus element
        this.fakeLastElement = document.createElement('span');
        this.fakeLastElement.classList.add('ds44-tmpFocusHidden');
        this.fakeLastElement.setAttribute('tabindex', '0');
        element.appendChild(this.fakeLastElement);

        // Add events
        MiscEvent.addListener('focus', this.goToLastListener, this.fakeFirstElement);
        MiscEvent.addListener('focus', this.goToFirstListener, this.fakeLastElement);
    }

    // Delete loop elements
    removeFocusLoop() {
        if (this.fakeFirstElement) {
            MiscEvent.removeListener('focus', this.goToLastListener, this.fakeFirstElement);
            this.fakeFirstElement.parentNode.removeChild(this.fakeFirstElement);
            this.fakeFirstElement = null;
        }

        if (this.fakeLastElement) {
            MiscEvent.removeListener('focus', this.goToFirstListener, this.fakeLastElement);
            this.fakeLastElement.parentNode.removeChild(this.fakeLastElement);
            this.fakeLastElement = null;
        }

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
    setFocus(evt, selector) {
        let element = null;
        if (
            evt &&
            evt.detail &&
            evt.detail.element
        ) {
            element = evt.detail.element
        }
        if (!element && selector) {
            element = document.querySelector(selector);
        }
        if (element) {
            element.focus();
        }
    }

    show(evt, element) {
        if (!element) {
            if (
                !evt ||
                !evt.detail ||
                !evt.detail.element
            ) {
                return;
            }

            element = evt.detail.element;
        }

        this.enable(element)
    }

    hide(evt, element) {
        if (!element) {
            if (
                !evt ||
                !evt.detail ||
                !evt.detail.element
            ) {
                return;
            }

            element = evt.detail.element;
        }

        this.disable(element);
    }

    enable(element) {
        if (!element) {
            return;
        }

        this.record(element);

        element.removeAttribute('aria-hidden');
        if (element.closest(Accessibility.getEnabledElementsSelector()) === element) {
            element.removeAttribute('tabindex');
        }

        Array.from(element.children).map((childElement) => {
            this.enable(childElement);
        });
    }

    disable(element) {
        if (!element) {
            return;
        }

        this.record(element);

        element.setAttribute('aria-hidden', true);
        if (element.closest(Accessibility.getEnabledElementsSelector()) === element) {
            element.setAttribute('tabindex', '-1');
        }

        Array.from(element.children).map((childElement) => {
            this.disable(childElement);
        });
    }

    record(element) {
        if (!element.hasAttribute('data-bkp-aria-hidden')) {
            element.setAttribute('data-bkp-aria-hidden', (element.getAttribute('aria-hidden') || ''));
        }
        if (!element.hasAttribute('data-bkp-tabindex')) {
            element.setAttribute('data-bkp-tabindex', (element.getAttribute('tabindex') || ''));
        }
    }

    reinstate(evt) {
        let rootElement = document;
        if (
            evt &&
            evt.detail &&
            evt.detail.element
        ) {
            rootElement = evt.detail.element;
        }

        rootElement
            .querySelectorAll('[data-bkp-aria-hidden]')
            .forEach((element) => {
                if (element.getAttribute('data-bkp-aria-hidden') === '') {
                    // Visible by default
                    element.removeAttribute('aria-hidden');
                } else {
                    // Hidden by default
                    element.setAttribute('aria-hidden', element.getAttribute('data-bkp-aria-hidden'));
                }

                element.removeAttribute('data-bkp-aria-hidden');
            });

        rootElement
            .querySelectorAll('[data-bkp-tabindex]')
            .forEach((element) => {
                if (element.getAttribute('data-bkp-tabindex') === '') {
                    // Tabable by default
                    element.removeAttribute('tabindex');
                } else {
                    // Not tabable by default
                    element.setAttribute('tabindex', element.getAttribute('data-bkp-tabindex'));
                }

                element.removeAttribute('data-bkp-tabindex');
            });
    }
}

// Singleton
new Accessibility();
