class TabUtile extends TabAbstract {
    constructor () {
        super('.js-tabs.ds44-choiceYN');
    }

    getDefaultTabHandle (containerElement) {
        return null;
    }

    changeTab (tabHandleElement, tabPanelElement) {
        super.changeTab(tabHandleElement, tabPanelElement);

        tabHandleElement
            .parentElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                tabHandleElement.classList.remove('ds44-bgDark');
                tabHandleElement.setAttribute('aria-pressed', 'false');
            });

        tabHandleElement.classList.add('ds44-bgDark');
        tabHandleElement.setAttribute('aria-pressed', 'true');
    }

    showTabCallback (tabHandleElement, tabPanel) {
        super.showTabCallback(tabHandleElement, tabPanel);

        if (tabHandleElement.getAttribute('href') === '#ds44-choiceY') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceY #form-bloc-utils-Y'));
        } else if (tabHandleElement.getAttribute('href') === '#ds44-choiceN') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceN .h4-like'));
        }
    }
}

// Singleton
new TabUtile();
