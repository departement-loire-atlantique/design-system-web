class FormFieldBoxRadioClass extends FormFieldBoxAbstract {
    constructor () {
        super("FormFieldBoxRadio", 'radio');
    }
}
// Singleton
var FormFieldBoxRadio = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldBoxRadioClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldBoxRadio();
