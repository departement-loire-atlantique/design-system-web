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

        let img = sourceFigureElement.querySelector('img').cloneNode(true);
        let figcaption = sourceFigureElement.querySelector('figcaption').cloneNode(true);
        let sourceFigureFinal = document.createElement('figure');
        sourceFigureFinal.appendChild(img);
        sourceFigureFinal.appendChild(figcaption);
        destinationFigureElement.innerHTML = sourceFigureFinal.innerHTML;
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
