class OverlayMosaic extends OverlayAbstract {
    fill () {
        const sourceFigureElement = this.triggerElement;
        if(!sourceFigureElement) {
            return;
        }

        const destinationFigureElement = this.modal.querySelector('figure.ds44-legendeContainer');
        if(!destinationFigureElement) {
            return;
        }

        destinationFigureElement.innerHTML = sourceFigureElement.innerHTML;
    }
}

// Singleton
new OverlayMosaic('[data-js="ds44-modal"][data-target="#overlay-mosaique"]');
