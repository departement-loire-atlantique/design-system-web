class MenuStandard {
    constructor () {
        this.triggerMainMenuElement = null;
        this.triggerSubMenuElement = null;
        this.menu = null;

        this.hideMainListener = this.hideMain.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        MiscEvent.addListener('keyUp:escape', this.hideMainListener);

        document
            .querySelectorAll('header .ds44-btn--menu')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showMain.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btnOverlay--closeOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideMainListener, element);
            });
        document
            .querySelectorAll('#ds44-btn-applis, header .ds44-navList .ds44-menuBtn')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showSubMenu.bind(this), element);
            });
        document
            .querySelectorAll('header .ds44-btn-backOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideSubMenu.bind(this), element);
            });

        MiscAccessibility.hide(document.querySelector('header .ds44-blocMenu'));
    }

    showMain (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        if (this.menu) {
            this.hideMain();
        }

        // Get corresponding menu
        const menu = document.querySelector('header .ds44-blocMenu');
        if (!menu) {
            return;
        }

        // Get menu main section
        const mainMenu = menu.querySelector('.ds44-overlay--navNiv1')
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = menu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        // Record the element that triggered the overlay
        this.triggerMainMenuElement = evt.currentTarget;
        this.menu = menu;

        // Show menu
        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.add('show');
        MiscAccessibility.show(this.menu);
        this.menu
            .querySelectorAll('section.ds44-overlay')
            .forEach((subMenu) => {
                MiscAccessibility.hide(subMenu);
            });

        // Set focus in menu
        MiscAccessibility.setFocus(closeButton);

        MiscAccessibility.addFocusLoop(
            mainMenu,
            mainMenu.getAttribute('aria-label')
        );
        MiscEvent.dispatch('menu:show', {'element': mainMenu});

        MiscEvent.addListener('click', this.hideMainListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    // Ferme tous les menus, et ajoute un focus sur le bouton qui a ouvert le dernier menu affiché
    hideMain (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu main section
        const mainMenu = this.menu.querySelector('.ds44-overlay--navNiv1')
        if (!mainMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = this.menu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        MiscEvent.removeListener('click', this.hideMainListener, closeButton);
        MiscEvent.removeListener('focusout', this.focusOutListener, this.menu);
        MiscEvent.removeListener('click', this.clickOutListener, document.body);

        MiscAccessibility.removeFocusLoop();

        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        mainMenu.classList.remove('show');
        document
            .querySelectorAll('header .ds44-blocMenu .ds44-overlay')
            .forEach((subMenu) => {
                subMenu.classList.remove('show');
            });
        MiscAccessibility.hide(this.menu);

        if (this.triggerMainMenuElement) {
            MiscAccessibility.setFocus(this.triggerMainMenuElement)
        }

        this.triggerMainMenuElement = null;
        this.menu = null;

        MiscEvent.dispatch('menu:hide');
    }

    showSubMenu (evt) {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu main section
        const mainMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!mainMenu) {
            return;
        }

        let subMenu = null;
        if (evt.currentTarget.getAttribute('data-ssmenu')) {
            subMenu = document.querySelector('#' + evt.currentTarget.getAttribute('data-ssmenu'));
        } else {
            subMenu = document.querySelector('#navApplis');
        }
        if (!subMenu) {
            return;
        }

        // Get corresponding close button
        const backButton = subMenu.querySelector('.ds44-btn-backOverlay');
        if (!backButton) {
            return;
        }

        this.triggerSubMenuElement = evt.currentTarget;

        MiscAccessibility.hide(mainMenu);
        MiscAccessibility.removeFocusLoop();

        subMenu.classList.add('show');
        MiscAccessibility.show(subMenu);

        MiscAccessibility.setFocus(backButton);
        MiscAccessibility.addFocusLoop(
            subMenu,
            subMenu.getAttribute('aria-label')
        );
    }

    hideSubMenu () {
        // Get current menu
        if (!this.menu) {
            return;
        }

        // Get menu main section
        const mainMenu = this.menu.querySelector('.ds44-overlay--navNiv1');
        if (!mainMenu) {
            return;
        }

        const subMenu = this.menu.querySelector('.ds44-overlay.show:not(.ds44-overlay--navNiv1)');
        if (!subMenu) {
            return;
        }

        // Get corresponding close button
        const closeButton = mainMenu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        subMenu.classList.remove('show');
        MiscAccessibility.hide(subMenu);
        MiscAccessibility.removeFocusLoop();

        MiscAccessibility.show(mainMenu);

        if (this.triggerSubMenuElement) {
            MiscAccessibility.setFocus(this.triggerSubMenuElement)
            this.triggerSubMenuElement = null;
        } else {
            MiscAccessibility.setFocus(closeButton);
        }
        MiscAccessibility.addFocusLoop(
            mainMenu,
            mainMenu.getAttribute('aria-label')
        );
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

        this.hideMain();
    }
}

// Singleton
new MenuStandard();
