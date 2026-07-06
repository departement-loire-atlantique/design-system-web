class ButtonMoreClass {
    constructor () {
        Debug.log("ButtonMore -> Constructor");
        this.nbResults = 5;
    }
    initialise() {
        Debug.log("ButtonMore -> Initialise");
        document
          .querySelectorAll('.ds44-js-more-button')
          .forEach((buttonElement) => {
              if(MiscComponent.checkAndCreate(buttonElement, "button-more"))
              {
                  MiscEvent.addListener('click', this.showMore.bind(this), buttonElement);
              }
          });
    }

    showMore (evt) {
        const buttonElement = evt.currentTarget;
        const collapserElement = MiscDom.getPreviousSibling(buttonElement, '.ds44-collapser');
        if (!collapserElement) {
            return;
        }

        const collapserItemElements = Array.prototype.slice.call(
            collapserElement.querySelectorAll('.ds44-collapser_element.hidden'),
            0,
            this.nbResults
        );
        collapserItemElements
            .forEach((collapserItemElement) => {
                collapserItemElement.classList.remove('hidden');
            });
        if (collapserItemElements[0]) {
            const collapserButtonElement = collapserItemElements[0].querySelector('button');
            if (collapserButtonElement) {
                MiscAccessibility.setFocus(collapserButtonElement);
            }
        }

        if (!collapserElement.querySelector('.ds44-collapser_element.hidden')) {
            buttonElement.classList.add('hidden');
        }
    }
}
// Singleton
var ButtonMore = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonMoreClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonMore();
