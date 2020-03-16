class CardStandard {
    constructor () {
        document.addEventListener('click', this.open.bind(this));
    }

    open (evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.target.closest('.ds44-js-card')
        ) {
            return;
        }

        const elementLinks = evt.target.closest('.ds44-js-card').getElementsByTagName('a');
        if (elementLinks[0]) {
            elementLinks[0].click();
        }
    }
}

// Singleton
new CardStandard();
