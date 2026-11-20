class ButtonOrejimeClass {
    constructor () {
        Debug.log("ButtonOrejime -> Constructor");
        this.isInitialized = false;
        this.nbTrial = 3;
    }

    initialise() {
        Debug.log("ButtonOrejime -> Initialise");
        MiscEvent.addListener('load', this.initialize.bind(this), window);
    }

    initialize () {
        if (this.isInitialized) {
            return;
        }

        if (window.orejime) {
            const learnMoreButtonElement = document.querySelector('.orejime-Notice-learnMoreButton');
            const modifyPrefsButtonElement = document.querySelector('.ds44-js-orejime-show');
            const consentMediaButtonElement = document.querySelectorAll('[data-consent]');

            if (learnMoreButtonElement || modifyPrefsButtonElement || consentMediaButtonElement.length > 0) {
                this.isInitialized = true;
                if (learnMoreButtonElement) {
                    MiscEvent.addListener('click', this.showMore.bind(this), learnMoreButtonElement);
                }
                if (modifyPrefsButtonElement) {
                    MiscEvent.addListener('click', this.show.bind(this), modifyPrefsButtonElement);
                }
                consentMediaButtonElement.forEach((element) => {
                    MiscEvent.addListener('click', this.consentMedia.bind(this), element);
                });
            }
            else {
                this.nbTrial--;
                if (this.nbTrial > 0) {
                    window.setTimeout(this.initialize.bind(this), 1000);
                }
            }
        } else {
            this.isInitialized = true;
        }
    }

    showMore() {
        const modalWrapperElement = document.querySelector('.orejime-ModalWrapper');
        if(modalWrapperElement) {
            MiscAccessibility.hide(modalWrapperElement);

            modalWrapperElement.setAttribute('aria-modal', 'true');
            modalWrapperElement.removeAttribute('tabindex');
            [].forEach.call(document.querySelectorAll("*[data-react-modal-body-trap]"), (el) => {
                el.remove();
            });

            const closeButton = modalWrapperElement.querySelector('.orejime-CloseIcon');
            MiscAccessibility.show(modalWrapperElement);
            const firstField = modalWrapperElement.querySelector('input, button, textarea, a, select')
            if (firstField) {
                MiscAccessibility.setFocus(firstField);
            } else {
                MiscAccessibility.setFocus(closeButton);
            }
            MiscAccessibility.addFocusLoop(modalWrapperElement);

        }
    }
    show () {
        if (window.orejime) {
            window.orejime.show();
            setTimeout(() => {
                this.showMore();
            }, 300);
        }
    }
    consentMedia(event) {
        if (!window.orejime) {
            return;
        }
        const button = event.target.closest('[data-consent]');
        if (!button) {
            return;
        }
        const appName = button.getAttribute('data-consent-app') || 'streaming-video';
        const manager = window.orejime.internals.manager;
        const app = manager.getApp(appName);
        if (!app) {
            return;
        }
        manager.updateConsent(app, true);
        manager.saveAndApplyConsents();
    }
}
// Singleton
var ButtonOrejime = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonOrejimeClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonOrejime();
