class HeaderStandardClass {
    constructor () {
        this.lastScroll = 0;
        this.headerVisibilityCounter = 0;
        this.menuVisibilityCounter = 0;
        this.isInitialized = false;

        // Bind events
        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('overlay:show', this.overlayShow.bind(this));
        MiscEvent.addListener('overlay:hide', this.overlayHide.bind(this));
        MiscEvent.addListener('menu:show', this.menuShow.bind(this));
        MiscEvent.addListener('menu:hide', this.menuHide.bind(this));
        MiscEvent.addListener('loader:show', this.overlayShow.bind(this));
        MiscEvent.addListener('loader:hide', this.overlayHide.bind(this));
        MiscEvent.addListener('keyUp:tab', this.checkFocusPosition.bind(this));
    }

    // Sur le focus au clavier d'un élément caché sous le header, effectuer un scroll vers le haut pour que l'élément soit affiché
    checkFocusPosition () {
        if (
            this.headerVisibilityCounter === 0 &&
            this.menuVisibilityCounter === 0
        ) {
            const headerElement = document.querySelector('header .ds44-header');
            const activeElement = document.activeElement;
            if (
                !headerElement ||
                headerElement.contains(activeElement)
            ) {
                return;
            }

            let headerBottom = headerElement.getBoundingClientRect().bottom;
            if (headerElement.classList.contains('collapsed')) {
                headerBottom += 100;
            }

            const activeElementBoundingClientRect = activeElement.getBoundingClientRect();
            if (activeElementBoundingClientRect.top < headerBottom) {
                window.scrollBy(0, -(150 - activeElementBoundingClientRect.top));
            }
        }
    }

    // Gérer le comportement du header en fonction des scrolls
    scroll () {
        if (
            this.headerVisibilityCounter === 0 &&
            this.menuVisibilityCounter === 0
        ) {
            const headerElement = document.querySelector('header .ds44-header');
            if (!headerElement) {
                return;
            }

            const currentScroll = window.pageYOffset;
            if (currentScroll === 0) {
                headerElement.classList.remove('collapsed');
                MiscAccessibility.show(document.querySelector('header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'));
                if (document.activeElement === document.querySelector('html')) {
                    MiscAccessibility.setFocus(document.querySelector('header .ds44-btn--menu'));
                }
                return;
            }

            if (
                currentScroll > this.lastScroll &&
                !headerElement.classList.contains('collapsed') &&
                currentScroll > headerElement.offsetHeight
            ) {
                // Scroll vers le bas, uniquement si le haut de page est
                // en dessous de la hauteur du header
                headerElement.classList.add('collapsed');
                MiscAccessibility.hide(document.querySelector('header .ds44-header .ds44-container-large'));
                MiscAccessibility.hide(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.hide(document.querySelector('header'), false);
            } else if (
                currentScroll < this.lastScroll &&
                headerElement.classList.contains('collapsed')
            ) {
                // up
                headerElement.classList.remove('collapsed');
                MiscAccessibility.show(document.querySelector('header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header'), false);
                MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'));
            }

            this.lastScroll = currentScroll;
        }
    }

    overlayShow () {
        if (this.headerVisibilityCounter === 0) {
            MiscAccessibility.hide(document.querySelector('header'), false, false);
        }
        this.headerVisibilityCounter--;
    }

    overlayHide () {
        this.headerVisibilityCounter = Math.min(0, (this.headerVisibilityCounter + 1));
        if (this.headerVisibilityCounter === 0) {
            MiscAccessibility.show(document.querySelector('header'), false, false);
        }
    }

    menuShow () {
        if (this.menuVisibilityCounter === 0) {
            MiscAccessibility.hide(document.querySelector('header .ds44-header .ds44-container-large'), true, false);
        }
        this.menuVisibilityCounter--;
    }

    menuHide () {
        this.menuVisibilityCounter = Math.min(0, (this.menuVisibilityCounter + 1));
        if (this.menuVisibilityCounter === 0) {
            MiscAccessibility.show(document.querySelector('header .ds44-header .ds44-container-large'), true, false);
        }
    }
}
// Singleton
var HeaderStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new HeaderStandardClass();
        }
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new HeaderStandard();
