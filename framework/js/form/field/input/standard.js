class FormFieldInputStandardClass extends FormFieldInputAbstract {
    constructor () {
        super(
          "FormFieldInputStandard",
            'input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date]), ' +
            'input[type="email"]:not([aria-autocomplete="list"]), ' +
            'input[type="password"]:not([aria-autocomplete="list"]), ' +
            'input[type="number"]:not([aria-autocomplete="list"])',
            'inputStandard'
        );
    }
}
// Singleton
var FormFieldInputStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldInputStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldInputStandard();