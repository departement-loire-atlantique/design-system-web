class FormFieldBoxCheckboxClass extends FormFieldBoxAbstract {
    constructor () {
        super("FormFieldBoxCheckbox", 'checkbox');
    }
}
// Singleton
var FormFieldBoxCheckbox = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldBoxCheckboxClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldBoxCheckbox();
