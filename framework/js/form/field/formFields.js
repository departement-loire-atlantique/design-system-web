class FormFieldsClass {
  constructor(className, selector, category) {
    MiscEvent.addListener('fields:initialise', this.fieldsInitialise.bind(this));
    window.addEventListener('DOMContentLoaded', () => {
      let currentFocus = document.activeElement;
      document.querySelectorAll("input, select, textarea").forEach((input) => {
        MiscEvent.dispatch("focus", {}, input);
      });
      currentFocus.focus();
    });
  }

  initialise() {

  }

  fieldsInitialise() {
    /** Box Field **/
    (new FormFieldBoxCheckbox());
    (new FormFieldBoxRadio());

    /** Input Field **/
    (new FormFieldInputAutoComplete());
    (new FormFieldInputDatepicker());
    (new FormFieldInputFile());
    (new FormFieldInputStandard());
    (new FormFieldInputTextarea());

    /** Select Field **/
    (new FormFieldSelectCheckbox());
    (new FormFieldSelectMultilevel());
    (new FormFieldSelectRadio());
    (new FormFieldSelectStandard());
  }


}
// Singleton
var FormFields = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new FormFieldsClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new FormFields();