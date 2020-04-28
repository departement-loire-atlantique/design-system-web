class OverlayNewsletter {
    constructor () {
        const buttonsElements = document.querySelectorAll('#overlay-newsletter-buttons button');
        if(buttonsElements.length === 0) {
            return;
        }

        MiscEvent.addListener('click', this.checkAll.bind(this), buttonsElements[0]);
        MiscEvent.addListener('click', this.uncheckAll.bind(this), buttonsElements[1]);
    }

    checkAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = true;
            })
    }

    uncheckAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = false;
            })
    }
}

// Singleton
new OverlayNewsletter();
