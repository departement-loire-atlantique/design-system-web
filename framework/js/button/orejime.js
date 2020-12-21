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
            if (learnMoreButtonElement) {
                this.isInitialized = true;

                MiscEvent.addListener('click', this.showMore.bind(this), learnMoreButtonElement);

            }
            else if (modifyPrefsButtonElement) {
                this.isInitialized = true;
                MiscEvent.addListener('click', this.show.bind(this), modifyPrefsButtonElement);
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
}

// Singleton
new ButtonOrejime();
