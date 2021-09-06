class MenuHeader {
    constructor () {
        this.triggerMenuElement = null;
        this.triggerSubMenuElement = null;
        this.menuSelector = null;
        this.menu = null;

        this.hideMenuListener = this.hideMenu.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        MiscEvent.addListener('keyUp:escape', this.hideMenuListener);

        document
            .querySelectorAll('header #open-menu')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showNavigation.bind(this), element);
            });
        document
            .querySelectorAll('header #open-search')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSearch.bind(this), element);
            });
        document
            .querySelectorAll('header #open-search-observatoire')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSearchObservatoire.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btnOverlay--closeOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideMenuListener, element);
            });
        document
            .querySelectorAll('#ds44-btn-applis, header .ds44-navList .ds44-menuBtn')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSubNavigationMenu.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btn-backOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideSubNavigationMenu.bind(this), element);
            });

        MiscAccessibility.hide(document.querySelector('header .ds44-blocMenu'));
    }

    showMenu (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        if (this.menu) {
            this.hideMenu();
        }

        // Get corresponding menu
        const menu = document.querySelector('header .ds44-blocMenu');
        if (!menu) {
            return;
        }

        // Get menu main section
        const mainMenu = menu.querySelector(this.menuSelector)
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = mainMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        // Record the element that triggered the overlay
        this.triggerMenuElement = evt.currentTarget;
        this.menu = menu;

        // Show menu
        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.add('show');
        MiscAccessibility.show(this.menu);
        MiscAccessibility.show(mainMenu);
        this.menu
            .querySelectorAll('section.ds44-overlay')
            .forEach((subMainMenu) => {
                MiscAccessibility.hide(subMainMenu);
            });

        // Set focus in menu
        window.setTimeout(MiscAccessibility.setFocus.bind(this, closeButton), 500);
        MiscAccessibility.addFocusLoop(mainMenu);
        MiscEvent.dispatch('menu:show', { 'element': mainMenu });

        MiscEvent.addListener('click', this.hideMenuListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    showNavigation (evt) {
        this.menuSelector = '.ds44-overlay--navNiv1';
        this.showMenu(evt);
    }

    showSearch (evt) {
        this.menuSelector = '#menuRech .ds44-overlay';
        this.showMenu(evt);
    }

    showSearchObservatoire (evt) {
        this.menuSelector = '#menuRechObservatoire .ds44-overlay';
        this.showMenu(evt);
    }

    // Ferme tous les menus, et ajoute un focus sur le bouton qui a ouvert le dernier menu affiché
    hideMenu (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu main section
        const mainMenu = this.menu.querySelector(this.menuSelector)
        this.menuSelector = null;
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = mainMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        MiscEvent.removeListener('click', this.hideMenuListener, closeButton);
        MiscEvent.removeListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.removeListener('click', this.clickOutListener, document.body);

        MiscAccessibility.removeFocusLoop();

        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.remove('show');
        document
            .querySelectorAll('header .ds44-blocMenu .ds44-overlay')
            .forEach((subMainMenu) => {
                subMainMenu.classList.remove('show');
            });
        MiscAccessibility.hide(mainMenu);
        MiscAccessibility.hide(this.menu);

        if (this.triggerMenuElement) {
            MiscAccessibility.show(this.triggerMenuElement); // nécessaire pour empêcher l'apparition d'un tabindex -1 sur l'élément déclencheur 
            MiscAccessibility.setFocus(this.triggerMenuElement);
        }

        this.triggerMenuElement = null;
        this.menu = null;

        MiscEvent.dispatch('menu:hide');
    }

    showSubNavigationMenu (evt) {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Don't do anything if it is a link
        if (evt.currentTarget.getAttribute('href')) {
            return;
        }

        // Get menu navigation section
        const navigationMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!navigationMenu) {
            return;
        }

        let subNavigationMenu = null;
        if (evt.currentTarget.getAttribute('data-ssmenu')) {
            subNavigationMenu = document.querySelector('#' + evt.currentTarget.getAttribute('data-ssmenu'));
        } else {
            subNavigationMenu = document.querySelector('#navApplis');
        }
        if (!subNavigationMenu) {
            return;
        }

        // Get corresponding close button
        const backButton = subNavigationMenu.querySelector('.ds44-btn-backOverlay');
        if (!backButton) {
            return;
        }

        this.triggerSubMenuElement = evt.currentTarget;

        MiscAccessibility.hide(navigationMenu);
        MiscAccessibility.removeFocusLoop();

        subNavigationMenu.classList.add('show');
        MiscAccessibility.show(subNavigationMenu);
        MiscAccessibility.setFocus(backButton);
        MiscAccessibility.addFocusLoop(subNavigationMenu);
    }

    hideSubNavigationMenu () {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu navigation section
        const navigationMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!navigationMenu) {
            return;
        }

        const subNavigationMenu = this.menu.querySelector('.ds44-overlay.show:not(.ds44-overlay--navNiv1)');
        if (!subNavigationMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = navigationMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        subNavigationMenu.classList.remove('show');
        MiscAccessibility.hide(subNavigationMenu);
        MiscAccessibility.removeFocusLoop();

        MiscAccessibility.show(navigationMenu);

        if (this.triggerSubMenuElement) {
            MiscAccessibility.setFocus(this.triggerSubMenuElement)
            this.triggerSubMenuElement = null;
        } else {
            MiscAccessibility.setFocus(closeButton);
        }
        MiscAccessibility.addFocusLoop(navigationMenu);
    }

    focusOut (evt) {
        if (evt.target && this.menu.contains(evt.target)) {
            return;
        }

        MiscAccessibility.setFocus(this.menu);
    }

    clickOut (evt) {
        if (evt.target && this.menu.contains(evt.target)) {
            return;
        }

        this.hideMenu();
    }
}

// Singleton
new MenuHeader();
