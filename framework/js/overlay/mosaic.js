class OverlayMosaicClass extends OverlayAbstract {
    fill () {
        const sourceFigureElement = this.triggerElement;
        if (!sourceFigureElement) {
            return;
        }

        const destinationFigureElement = this.modal.querySelector('figure.ds44-legendeContainer');
        if (!destinationFigureElement) {
            return;
        }

        destinationFigureElement.innerHTML = sourceFigureElement.innerHTML;
    }
}
// Singleton
var OverlayMosaic = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new OverlayMosaicClass("OverlayMosaic", '[data-js="ds44-modal"][data-target="#overlay-mosaique"]');
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new OverlayMosaic();
