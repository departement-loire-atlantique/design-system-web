class FormFieldsClass {
  constructor(className, selector, category) {
    MiscEvent.addListener('fields:initialise', this.fieldsInitialise.bind(this));

    MiscEvent.addListener("DOMContentLoaded", () => {
      setTimeout(() => {
        document.querySelectorAll("input").forEach((input) => {
          console.log(window.getComputedStyle(input, ':autofill').getPropertyValue("content") );
          if(window.getComputedStyle(input, ':autofill').getPropertyValue("content") === "\"autofill\"")
          {
            MiscEvent.dispatch("field:label-move", {}, input);
          }
        });
      }, 600);
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