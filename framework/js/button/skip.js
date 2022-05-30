class ButtonSkip {
    constructor () {
        document
            .querySelectorAll('.ds44-skiplinks--link')
            .forEach((skipElement) => {
                if(MiscComponent.checkAndCreate(skipElement, "button-skip")) {
                    MiscEvent.addListener('click', this.go.bind(this), skipElement);
                }
            });
    }

    go (evt) {
        const id = evt.currentTarget.getAttribute('href');
        if (id.indexOf('#') === -1) {
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();
        const focusElement = document.querySelector(id);
        if (!focusElement) {
            return;
        }

        MiscAccessibility.setFocus(focusElement);
    }
}

// Singleton
new ButtonSkip();
