class FormFieldInputTextareaClass extends FormFieldInputAbstract {
    constructor () {
        super("FormFieldInputTextarea", 'textarea', 'textarea');
    }
}
// Singleton
var FormFieldInputTextarea = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldInputTextareaClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldInputTextarea();
