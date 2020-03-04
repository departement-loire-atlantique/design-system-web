class LoaderStandard {
    constructor() {
        // Counter that prevents from hiding the loader if it has been requested several times
        this.counter = 0;

        MiscEvent.addListener('loader:requestShow', this.show.bind(this));
        MiscEvent.addListener('loader:requestHide', this.hide.bind(this));
    }

    show() {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }

        this.counter++;
        loaderElement.classList.remove('hidden');
        MiscAccessibility.show(loaderElement, true);
        loaderTextElement.innerHTML = '<p>Chargement en cours</p>';
        MiscAccessibility.setFocus(loaderTextElement);
        MiscEvent.dispatch('loader:show');
    }

    hide() {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }

        this.counter = Math.max(0, (this.counter - 1));
        if (this.counter === 0) {
            loaderElement.classList.add('hidden');
            MiscAccessibility.hide(loaderElement, true);
            loaderTextElement.innerHTML = '';
            MiscEvent.dispatch('loader:hide');
        }
    }
}

// Singleton
new LoaderStandard();
