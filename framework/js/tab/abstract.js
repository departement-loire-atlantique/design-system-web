class Tab {
    constructor() {
        MiscEvent.addListener('keyUp:spacebar', this.move.bind(this));
        MiscEvent.addListener('keyUp:enter', this.move.bind(this));

        document
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandle) => {
                const tabHref = this.getTabFromHref(tabHandle.getAttribute('href'));
                const tabPanel = document.querySelector(tabHref);
                if (
                    !tabPanel ||
                    !tabPanel.children.length
                ) {
                    return;
                }

                const tabPanelExit = tabPanel.children[tabPanel.children.length - 1];
                tabHandle.addEventListener('click', this.change.bind(this));
                tabPanelExit.addEventListener('click', this.back.bind(this));
            });

        let selectedTabHandle = null;
        const tabHref = this.getTabFromHref(document.location.href);
        const selectedTabHandleFromUrl = document.querySelector('.js-tablist__link[href="' + tabHref + '"]');
        if (selectedTabHandleFromUrl) {
            selectedTabHandle = selectedTabHandleFromUrl;
        } else {
            const selectedTabHandleFromDom = document.querySelector('.js-tablist__link[aria-current]');
            if (selectedTabHandleFromDom) {
                selectedTabHandle = selectedTabHandleFromDom;
            } else {
                selectedTabHandle = document.querySelector('.js-tablist__link');
            }
        }
        if (selectedTabHandle) {
            selectedTabHandle.classList.add('ds44-tabs__linkSelected');
            selectedTabHandle.click();
        }
    }

    // Effectue une transition des display:none sur les contenus des onglets
    change(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandle = evt.currentTarget;
        if (tabHandle.classList.contains('ds44-tabs__linkSelected')) {
            return;
        }

        const tabHref = this.getTabFromHref(tabHandle.getAttribute('href'));
        const tabPanel = document.querySelector(tabHref);
        if (!tabPanel) {
            return;
        }

        // Hide others
        MiscEvent.dispatch('accessibility:reinstate', {'element': tabPanel});
        document
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandle) => {
                const tabHref = this.getTabFromHref(tabHandle.getAttribute('href'));
                const tabPanel = document.querySelector(tabHref);
                if (!tabPanel) {
                    return;
                }

                tabHandle.classList.remove('ds44-tabs__linkSelected');
                tabPanel.style.opacity = 0;
                Utils.timerClass(tabPanel, 'display', 'none', 150);
                MiscEvent.dispatch('accessibility:hide', {'element': tabPanel});
            });

        // Show selected tab
        tabHandle.classList.add('ds44-tabs__linkSelected');
        Utils.timerClass(tabPanel, 'opacity', '1', 300);
        Utils.timerClass(tabPanel, 'display', 'block', 150);
        MiscEvent.dispatch('accessibility:show', {'element': tabPanel});
    }

    back(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        const currentTabHandle = document.querySelector('.js-tablist__link.ds44-tabs__linkSelected');
        if (!currentTabHandle) {
            return;
        }

        let headerHeight = 0;
        let header = document.querySelector('header .ds44-header');
        if (header) {
            let wasHidden = false;
            if(header.classList.contains('hidden')) {
                wasHidden = true;
                header.classList.remove('hidden')
            }
            headerHeight = header.offsetHeight;
            if(wasHidden) {
                header.classList.add('hidden');
            }
        }

        MiscEvent.dispatch('focus:set', {'element': currentTabHandle});
        window.scrollTo(0, Utils.getPositionY(currentTabHandle) - headerHeight)
    }

    move(evt) {
        evt.preventDefault();

        const newEvt = {'currentTarget': document.activeElement};
        if(newEvt.currentTarget.classList.contains('js-tablist__link')) {
            // Change
            this.change(newEvt);
        } else if(newEvt.currentTarget.parentElement.classList.contains('ds44-keyboard-show')) {
            // Back
            this.back(newEvt);
        }
    }

    // Récupère le tag ID d'un HREF, s'il existe
    getTabFromHref(href) {
        if (href.indexOf('#') !== -1) {
            return href.slice(href.indexOf('#'));
        }

        return '#';
    }

}

// Singleton
new Tab();
