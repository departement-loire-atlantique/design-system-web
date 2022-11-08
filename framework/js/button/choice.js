class ButtonChoiceClass {
    constructor () {
        Debug.log("ButtonMore -> Constructor");
        this.nbResults = 5;
    }
    initialise() {
        Debug.log("ButtonMore -> Initialise");
        document
          .querySelectorAll('.ds44-js-choice-button')
          .forEach((buttonElement) => {
              if(MiscComponent.checkAndCreate(buttonElement, "button-choice"))
              {
                  MiscEvent.addListener('click', this.showMore.bind(this), buttonElement);
                  const viewElements = document.querySelectorAll(buttonElement.dataset.choiceElementView);
                  viewElements.forEach((viewElement) => {
                      if(viewElement.classList.contains("hidden")) {
                          this.hideElement(buttonElement, viewElement);
                      }
                  });
              }
          });
    }

    showMore (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const buttonElement = evt.currentTarget;
        const viewElements = document.querySelectorAll(buttonElement.dataset.choiceElementView);
        if (!viewElements) {
            return;
        }

        viewElements.forEach((viewElement) => {
            this.showElement(buttonElement, viewElement);
        });
        if(buttonElement.dataset.choiceElementHide) {
            [].forEach.call(buttonElement.dataset.choiceElementHide.split(","), (selector) => {
                let hiddenElements = document.querySelectorAll(selector.trim());
                hiddenElements.forEach((hiddenElement) => {
                    this.hideElement(buttonElement, hiddenElement);
                });
            });
        }
        return false;
    }

    showElement(buttonElement, element) {
        element.classList.remove('hidden');
        if(buttonElement.hasAttribute("data-inputs-disabled")) {
            element.querySelectorAll("input, select").forEach((field) => {
                field.removeAttribute('disabled');
                MiscEvent.dispatch("field:enable", {}, field);
            });
        }
    }

    hideElement(buttonElement, element) {
        element.classList.add('hidden');
        if(buttonElement.hasAttribute("data-inputs-disabled")) {
            element.querySelectorAll("input, select").forEach((field) => {
                field.setAttribute('disabled', true);
                MiscEvent.dispatch("field:reset", {}, field);
                MiscEvent.dispatch("field:disable", {}, field);
            });
        }
    }


}
// Singleton
var ButtonChoice = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonChoiceClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonChoice();
