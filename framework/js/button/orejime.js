class ButtonOrejime {
    constructor () {
        this.isInitialized = false;
        this.nbTrial = 3;

        MiscEvent.addListener('load', this.initialize.bind(this), window);
    }

    initialize () {
        if (this.isInitialized) {
            return;
        }

        if (window.orejime) {
            const learnMoreButtonElement = document.querySelector('.orejime-Notice-learnMoreButton');
            const modifyPrefsButtonElement = document.querySelector('.ds44-js-orejime-show');
            const consentMediaButtonElement = document.querySelectorAll('[data-consent="accept-streaming-cookie"]');

            if (learnMoreButtonElement || modifyPrefsButtonElement || consentMediaButtonElement) {
                this.isInitialized = true;
                if (learnMoreButtonElement) {
                    MiscEvent.addListener('click', this.showMore.bind(this), learnMoreButtonElement);
                }
                if (modifyPrefsButtonElement) {
                    MiscEvent.addListener('click', this.show.bind(this), modifyPrefsButtonElement);
                }
                if (consentMediaButtonElement) {
                	consentMediaButtonElement.forEach((element) => {
                		MiscEvent.addListener('click', this.consentMedia.bind(this), element);
                    });
                }
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
            modalWrapperElement.setAttribute('aria-modal', 'true');
        }
    }
    show () {
        if (window.orejime) {
            window.orejime.show();
        }
    }
    consentMedia() {
        if (window.orejime) {
        	var app = window.orejime.internals.manager.getApp("streaming-video");
        	console.log(window.orejime.internals.manager.getConsent(app));
            window.orejime.internals.manager.updateConsent(app,true);
            window.orejime.internals.manager.saveAndApplyConsents();
        }
    }
}

// Singleton
new ButtonOrejime();
