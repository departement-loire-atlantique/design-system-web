class LoaderStandard {
    constructor () {
        // Counter that prevents from hiding the loader if it has been requested several times
        this.counter = 0;
        this.previousFocusedElement = null;

        this.scrollWindow = 0;

        MiscEvent.addListener('loader:requestShow', this.show.bind(this));
        MiscEvent.addListener('loader:requestHide', this.hide.bind(this));
        MiscEvent.addListener('loader:setFocus', this.setFocusedElement.bind(this));
    }

    show () {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }
        this.scrollWindow = window.scrollY;

        document.body.classList.add('is-loader');
        this.previousFocusedElement = document.activeElement;

        this.counter++;
        loaderElement.classList.remove('hidden');
        MiscAccessibility.show(loaderElement);
        loaderTextElement.innerHTML = '<p>' + MiscTranslate._('LOADING') + '</p>';
        MiscAccessibility.setFocus(loaderTextElement);
        MiscEvent.dispatch('loader:show');
    }

    hide () {
        const loaderElement = document.querySelector('.ds44-loader');
        const loaderTextElement = document.querySelector('.ds44-loader-text');
        if (!loaderElement || !loaderTextElement) {
            return;
        }

        document.body.classList.remove('is-loader');
        if(document.body.classList.contains("fix-scroll-refresh"))
        {
            document.body.scrollTop = this.scrollWindow; // For Safari
            document.documentElement.scrollTop = this.scrollWindow;
        }
        this.scrollWindow = 0;


        this.counter = Math.max(0, (this.counter - 1));
        if (this.counter === 0) {
            loaderElement.classList.add('hidden');
            MiscAccessibility.hide(loaderElement);
            loaderTextElement.innerHTML = '';
            MiscEvent.dispatch('loader:hide');

            if (this.previousFocusedElement) {
                MiscAccessibility.setFocus(this.previousFocusedElement);
                this.previousFocusedElement = null;
            }
        }
    }

    setFocusedElement (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.focusedElement
        ) {
            return;
        }

        this.previousFocusedElement = evt.detail.focusedElement;
    }
}

// Singleton
new LoaderStandard();
