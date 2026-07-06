class ButtonReturnSearchClass {
  constructor () {
    Debug.log("ButtonReturnSearch -> Constructor");
  }

  initialise() {
    Debug.log("ButtonReturnSearch -> Initialise");

    this.linkSearch = localStorage.getItem("LaDesignSystem.urlSearch");
    document
      .querySelectorAll('.ds44-js-button-return-search')
      .forEach((buttonElement) => {
        if(this.linkSearch) {
          if(MiscComponent.checkAndCreate(buttonElement, "button-return-search"))
          {
            if(buttonElement.tagName === "A") {
              buttonElement.setAttribute("href", this.linkSearch);
            }
            else {
              MiscEvent.addListener('click', this.openLink.bind(this, buttonElement), buttonElement);
            }
          }
        }
        else {
          buttonElement.remove();
        }
      });
  }

  openLink (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    location.href = this.linkSearch;
  }
}
// Singleton
var ButtonReturnSearch = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new ButtonReturnSearchClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new ButtonReturnSearch();