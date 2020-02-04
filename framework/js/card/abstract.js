class Card {
    constructor() {
        document
            .querySelectorAll('section.ds44-card')
            .forEach((element) => {
                MiscEvent.addListener('click', this.open.bind(this), element);
            });
    }

    open(evt) {
        const elementLinks = evt.currentTarget.getElementsByTagName('a');
        if (elementLinks[0]) {
            elementLinks[0].click();
        }
    }
}

// Singleton
new Card();
