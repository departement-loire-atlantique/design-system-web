class OverlayStandardClass extends OverlayAbstract {
}
// Singleton
var OverlayStandard = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new OverlayStandardClass("OverlayStandard", '[data-js="ds44-modal"]:not([data-target="#overlay-mosaique"])');
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new OverlayStandard();