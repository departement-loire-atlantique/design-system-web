class ButtonBackToTop {
    constructor () {
        const backToTopElement = document.querySelector('#backToTop');
        if (backToTopElement) {
            MiscEvent.addListener('click', this.go.bind(this), backToTopElement);
        }
    }

    go (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0) {
            MiscUtils.scrollTo(
                0,
                400,
                'linear',
                (function () {
                    return function () {
                        MiscAccessibility.setFocus(document.querySelector('main'));
                    }
                })()
            );
        }
    }
}

// Singleton
new ButtonBackToTop();
