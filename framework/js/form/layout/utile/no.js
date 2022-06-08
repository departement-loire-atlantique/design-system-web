class FormLayoutUtileNoClass extends FormLayoutUtileAbstract {
    constructor () {
        super("FormLayoutUtileNo", '#ds44-choiceN form');
    }
}
// Singleton
var FormLayoutUtileNo = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormLayoutUtileNoClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormLayoutUtileNo();
