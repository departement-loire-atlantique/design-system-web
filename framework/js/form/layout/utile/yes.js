class FormLayoutUtileYesClass extends FormLayoutUtileAbstract {
    constructor () {
        super("FormLayoutUtileYes", '#ds44-choiceY form');
    }
}
// Singleton
var FormLayoutUtileYes = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormLayoutUtileYesClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormLayoutUtileYes();
