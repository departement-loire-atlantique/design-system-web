class AsideAlphabet {
    constructor () {
        this.containerElement = document.querySelector('.ds44-js-aside-alphabet');
        if (!this.containerElement) {
            return;
        }

        this.containerElement
            .querySelectorAll('li a')
            .forEach((letterElement) => {
                MiscEvent.addListener('click', this.select.bind(this), letterElement);
            });
    }

    select (evt) {
        const activeLetterElement = this.containerElement.querySelector('li a.active')
        if (activeLetterElement) {
            activeLetterElement.classList.remove('active');
            activeLetterElement.removeAttribute('aria-location');
        }

        evt.currentTarget.classList.add('active');
        evt.currentTarget.setAttribute('aria-location', 'true');
    }
}

// Singleton
new AsideAlphabet();
