class FooterStandard {
    constructor () {
        MiscEvent.addListener('overlay:show', this.show.bind(this));
        MiscEvent.addListener('overlay:hide', this.hide.bind(this));
        MiscEvent.addListener('menu:show', this.show.bind(this));
        MiscEvent.addListener('menu:hide', this.hide.bind(this));
        MiscEvent.addListener('loader:show', this.show.bind(this));
        MiscEvent.addListener('loader:hide', this.hide.bind(this));

        const backToTopElement = document.querySelector('#backToTop');
        if (backToTopElement) {
            MiscEvent.addListener('click', this.backToTop.bind(this), backToTopElement);
        }
    }

    show () {
        MiscAccessibility.hide(document.querySelector('footer'));
    }

    hide () {
        MiscAccessibility.show(document.querySelector('footer'));
    }

    backToTop (evt) {
        if (evt && evt.stopPropagation) {
            evt.stopPropagation();
        }
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0) {
            window.requestAnimationFrame(this.backToTop.bind(this));
            window.scrollTo(0, scrollTop - scrollTop / 8);
        }
    }
}

// Singleton
new FooterStandard();
