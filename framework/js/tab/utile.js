class TabUtileClass extends TabAbstract {
    constructor () {
        super("TabUtile", '.js-tabs.ds44-choiceYN');
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
                tabHandleElement.removeAttribute('aria-disabled');
                tabHandleElement.removeAttribute('aria-current');
            });

        tabHandleElement.classList.add('ds44-bgDark');
        tabHandleElement.setAttribute('aria-pressed', 'true');
    }

    showTabCallback (tabHandleElement, tabPanel) {
        super.showTabCallback(tabHandleElement, tabPanel);

        const href = this.getHrefFromElement(tabHandleElement);
        if (href === '#ds44-choiceY') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceY #form-bloc-utils-Y'));
        } else if (href === '#ds44-choiceN') {
            MiscAccessibility.setFocus(document.querySelector('#ds44-choiceN .h4-like'));
        }
    }
}
// Singleton
var TabUtile = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new TabUtileClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new TabUtile();