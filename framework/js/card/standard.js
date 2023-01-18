class CardStandardClass {
    constructor () {
        document.addEventListener('click', this.open.bind(this));
    }

    open (evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.target.closest('.ds44-js-card')
        ) {
            return;
        }
        Debug.log(evt);

        const elementLinks = evt.target.closest('.ds44-js-card').getElementsByTagName('a');
        if (
            elementLinks[0] &&
            elementLinks[0] !== evt.target
        ) {

            let multiLinks = (evt.target.closest("*[data-popup-click-disabled]") || evt.target.closest("*[data-multi-links]"))
            if(!multiLinks) {
                elementLinks[0].click();
            }
        }
    }
}
// Singleton
var CardStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CardStandardClass();
        }
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new CardStandard();
