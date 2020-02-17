class Loader {
    constructor() {
        // Counter that prevents from hiding the loader if it has been requested several times
        this.counter = 0;

        MiscEvent.addListener('loader:requestShow', this.show.bind(this));
        MiscEvent.addListener('loader:requestHide', this.hide.bind(this));
    }

    show() {
        const loaderElement = document.querySelector('.ds44-loader');
        if (!loaderElement) {
            return;
        }

        this.counter++;
        loaderElement.classList.add('show');
        MiscAccessibility.show(loaderElement, true);
        MiscEvent.dispatch('loader:show');
    }

    hide() {
        const loaderElement = document.querySelector('.ds44-loader');
        if (!loaderElement) {
            return;
        }

        this.counter = Math.max(0, (this.counter - 1));
        if (this.counter === 0) {
            loaderElement.classList.remove('show');
            MiscAccessibility.hide(loaderElement, true);
            MiscEvent.dispatch('loader:hide');
        }
    }
}

// Singleton
new Loader();
