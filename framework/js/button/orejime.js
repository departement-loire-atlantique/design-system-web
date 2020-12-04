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
            if (learnMoreButtonElement) {
                this.isInitialized = true;

                MiscEvent.addListener('click', this.showMore.bind(this), learnMoreButtonElement);

            } else {
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
}

// Singleton
new ButtonOrejime();
