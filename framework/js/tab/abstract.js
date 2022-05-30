class TabAbstract {
    constructor (selector) {
        document
            .querySelectorAll(selector)
            .forEach((containerElement) => {
                if(MiscComponent.checkAndCreate(containerElement, "tab")) {
                    MiscEvent.addListener('keyDown:shiftTab', this.goBackToTab.bind(this, selector));
                    this.create(containerElement);
                }
            });
    }

    getHrefFromElement (element) {
        return element.getAttribute('href') || element.getAttribute('data-href');
    }

    create (containerElement) {
        containerElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
                const tabPanel = document.querySelector(tabHref);
                if (
                    !tabPanel ||
                    !tabPanel.children.length
                ) {
                    return;
                }

                MiscEvent.addListener('click', this.change.bind(this), tabHandleElement);

                const tabPanelExitElement = tabPanel.querySelector('.ds44-keyboard-show:last-child');
                if (tabPanelExitElement) {
                    MiscEvent.addListener('click', this.back.bind(this), tabPanelExitElement);
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

        const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
        const tabPanel = document.querySelector(tabHref);
        if (!tabPanel) {
            return;
        }

        this.changeTab(tabHandleElement, tabPanel);
    }

    changeTab (tabHandleElement, tabPanel) {
        const tabsElement = tabPanel.parentElement;
        tabsElement.style.height = tabsElement.offsetHeight + 'px';

        // Hide others
        tabHandleElement
            .closest('.js-tabs')
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
                const tabPanel = document.querySelector(tabHref);
                if (!tabPanel) {
                    return;
                }

                tabHandleElement.classList.remove('ds44-tabs__linkSelected');
                tabHandleElement.setAttribute('aria-disabled', 'true');
                tabHandleElement.removeAttribute('aria-current');
                this.hideTab(tabHandleElement, tabPanel);
                MiscAccessibility.hide(tabPanel);
            });

        // Show selected tab
        tabHandleElement.classList.add('ds44-tabs__linkSelected');
        tabHandleElement.setAttribute('aria-current', 'true');
        tabHandleElement.removeAttribute('aria-disabled');
        this.showTab(tabHandleElement, tabPanel);
        MiscAccessibility.show(tabPanel);
    }

    showTab (tabHandleElement, tabPanel) {
        window.setTimeout(this.showTabCallback.bind(this, tabHandleElement, tabPanel), 300);
    }

    showTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 1;
        tabPanel.style.display = 'block';

        const tabsElement = tabPanel.parentElement;
        tabsElement.style.height = null;

        const h2Element = tabPanel.querySelector('h2.visually-hidden');
        if (h2Element) {
            MiscAccessibility.setFocus(h2Element);
        }
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

        const tabHandleHref = this.getHrefFromElement(evt.currentTarget.firstElementChild);
        const currentTabHandle = document.querySelector(
            '.js-tablist__link.ds44-tabs__linkSelected' + tabHandleHref + ', ' +
            '.js-tablist__link.ds44-tabs__linkSelected[href="' + tabHandleHref + '"], ' +
            '.js-tablist__link.ds44-tabs__linkSelected[data-href="' + tabHandleHref + '"]'
        );
        if (!currentTabHandle) {
            return;
        }

        MiscAccessibility.setFocus(currentTabHandle);
        window.scrollTo(0, MiscUtils.getPositionY(currentTabHandle) - MiscDom.getHeaderHeight(true))
    }

    goBackToTab (selector, evt) {
        if (
            !document.activeElement ||
            !document.activeElement.closest('h2.visually-hidden') ||
            !document.activeElement.closest('.ds44-tabs').querySelector(selector)
        ) {
            return;
        }

        const linkSelectedElement = document.activeElement.closest('.ds44-tabs').querySelector(selector + ' .ds44-tabs__linkSelected');
        if (linkSelectedElement) {
            MiscAccessibility.setFocus(linkSelectedElement);
        }
    }

    getTabFromHref (href) {
        if (href.indexOf('#') !== -1) {
            return href.slice(href.indexOf('#'));
        }

        return '#';
    }
}
