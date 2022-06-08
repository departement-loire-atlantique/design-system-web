class ButtonLegendClass {
  constructor () {
    Debug.log("ButtonLegend -> Constructor");
  }

  initialise() {
    Debug.log("ButtonLegend -> Initialise");
    const buttonLegends = document.querySelectorAll('button[type="button"]');
    [].forEach.call(buttonLegends, (buttonLegend) => {
      if (buttonLegend.closest("figure") && MiscComponent.checkAndCreate(buttonLegend, "button-legend")) {
        MiscEvent.addListener('focus', this.focusParent.bind(this), buttonLegend);
        MiscEvent.addListener('focusout', this.unFocusParent.bind(this), buttonLegend);
      }
    });
  }

  focusParent (evt) {
    evt.target.closest("figure").classList.add("focus");
  }

  unFocusParent (evt) {
    evt.target.closest("figure").classList.remove("focus");
  }
}
// Singleton
var ButtonLegend = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new ButtonLegendClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new ButtonLegend();
