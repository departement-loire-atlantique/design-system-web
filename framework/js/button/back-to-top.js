class ButtonBackToTopClass {
    constructor () {
        Debug.log("ButtonBackToTop -> Constructor");
    }

    initialise() {
        Debug.log("ButtonBackToTop -> Initialise");

        const backToTopElement = document.querySelector('#backToTop');
        if(backToTopElement && MiscComponent.checkAndCreate(backToTopElement, "button-to-top"))
        {
            if (backToTopElement) {
                MiscEvent.addListener('click', this.go.bind(this), backToTopElement);
            }
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
var ButtonBackToTop = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonBackToTopClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonBackToTop();