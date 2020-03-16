class TabAbstract {
    constructor (selector) {
        document
            .querySelectorAll(selector)
            .forEach((containerElement) => {
                this.create(containerElement);
            });
    }

    create (containerElement) {
        containerElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(tabHandleElement.getAttribute('href'));
                const tabPanel = document.querySelector(tabHref);
                if (
                    !tabPanel ||
                    !tabPanel.children.length
                ) {
                    return;
                }

                MiscEvent.addListener('click', this.change.bind(this), tabHandleElement);
                MiscEvent.addListener('keypress', this.move.bind(this), tabHandleElement);

                const tabPanelExitElement = tabPanel.querySelector('.ds44-keyboard-show:last-child');
                if (tabPanelExitElement) {
                    MiscEvent.addListener('click', this.back.bind(this), tabPanelExitElement);
                    MiscEvent.addListener('keypress', this.move.bind(this), tabPanelExitElement);
                }
            });

        let selectedTabHandle = null;
        const tabHref = this.getTabFromHref(document.location.href);
        const selectedTabHandleFromUrl = containerElement.querySelector('.js-tablist__link[href="' + tabHref + '"]');
        if (selectedTabHandleFromUrl) {
            selectedTabHandle = selectedTabHandleFromUrl;
        } else {
            const selectedTabHandleFromDom = containerElement.querySelector('.js-tablist__link[aria-current]');
            if (selectedTabHandleFromDom) {
                selectedTabHandle = selectedTabHandleFromDom;
            } else {
                selectedTabHandle = this.getDefaultTabHandle(containerElement);
            }
        }
        if (selectedTabHandle) {
            selectedTabHandle.click();
        }
    }

    getDefaultTabHandle (containerElement) {
        return containerElement.querySelector('.js-tablist__link');
    }

    change (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandleElement = evt.currentTarget;
        if (tabHandleElement.classList.contains('ds44-tabs__linkSelected')) {
            return;
        }

        const tabHref = this.getTabFromHref(tabHandleElement.getAttribute('href'));
        const tabPanel = document.querySelector(tabHref);
        if (!tabPanel) {
            return;
        }

        this.changeTab(tabHandleElement, tabPanel);
    }

    changeTab (tabHandleElement, tabPanel) {
        // Hide others
        tabHandleElement
            .closest('.js-tabs')
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(tabHandleElement.getAttribute('href'));
                const tabPanel = document.querySelector(tabHref);
                if (!tabPanel) {
                    return;
                }

                tabHandleElement.classList.remove('ds44-tabs__linkSelected');
                tabHandleElement.removeAttribute('aria-disabled');
                this.hideTab(tabHandleElement, tabPanel);
                MiscAccessibility.hide(tabPanel, true);
            });

        // Show selected tab
        tabHandleElement.classList.add('ds44-tabs__linkSelected');
        tabHandleElement.setAttribute('aria-disabled', 'true');
        this.showTab(tabHandleElement, tabPanel);
        MiscAccessibility.show(tabPanel, true);
    }

    showTab (tabHandleElement, tabPanel) {
        window.setTimeout(this.showTabCallback.bind(this, tabHandleElement, tabPanel), 300);
    }

    showTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 1;
        tabPanel.style.display = 'block';
    }

    hideTab (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 0;

        window.setTimeout(this.hideTabCallback.bind(this, tabHandleElement, tabPanel), 150);
    }

    hideTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.display = 'none';
    }

    back (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandleHref = evt.currentTarget.firstElementChild.getAttribute('href');
        const currentTabHandle = document.querySelector('.js-tablist__link.ds44-tabs__linkSelected[href="' + tabHandleHref + '"]');
        if (!currentTabHandle) {
            return;
        }

        let headerHeight = 0;
        let header = document.querySelector('header .ds44-header');
        if (header) {
            let wasHidden = false;
            if (header.classList.contains('hidden')) {
                wasHidden = true;
                header.classList.remove('hidden')
            }
            headerHeight = header.offsetHeight;
            if (wasHidden) {
                header.classList.add('hidden');
            }
        }

        MiscAccessibility.setFocus(currentTabHandle);
        window.scrollTo(0, MiscUtils.getPositionY(currentTabHandle) - headerHeight)
    }

    move (evt) {
        evt.preventDefault();

        const eventKey = (evt.key === ' ' ? 'spacebar' : evt.key).toLowerCase();
        if (eventKey !== 'spacebar' && eventKey !== 'enter') {
            return;
        }

        if (evt.currentTarget.classList.contains('js-tablist__link')) {
            // Change
            this.change(evt);
        } else if (evt.currentTarget.classList.contains('ds44-keyboard-show')) {
            // Back
            this.back(evt);
        }
    }

    getTabFromHref (href) {
        if (href.indexOf('#') !== -1) {
            return href.slice(href.indexOf('#'));
        }

        return '#';
    }
}
