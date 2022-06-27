class FormLayoutStandardClass extends FormLayoutAbstract {
    constructor () {
        super("FormLayoutStandard", 'form');
    }
}
// Singleton
var FormLayoutStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormLayoutStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormLayoutStandard();