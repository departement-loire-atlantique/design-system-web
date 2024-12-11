class ButtonSkipClass {
    constructor () {
        Debug.log("ButtonSkip -> Constructor");
    }

    initialise () {
        Debug.log("ButtonSkip -> Initialise");
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
        MiscUtils.scrollTo(focusElement, 400, 'linear');
    }
}
// Singleton
var ButtonSkip = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonSkipClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonSkip();
