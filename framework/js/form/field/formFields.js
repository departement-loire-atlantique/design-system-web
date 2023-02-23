class FormFieldsClass {
  constructor(className, selector, category) {
    MiscEvent.addListener('fields:initialise', this.fieldsInitialise.bind(this));
  }

  initialise() {

  }

  fieldsInitialise() {
    /** Box Field **/
    (new FormFieldBoxCheckboxClass()).initialise();
    (new FormFieldBoxRadioClass()).initialise();

    /** Input Field **/
    (new FormFieldInputAutoCompleteClass()).initialise();
    (new FormFieldInputDatepickerClass()).initialise();
    (new FormFieldInputFileClass()).initialise();
    (new FormFieldInputStandardClass()).initialise();
    (new FormFieldInputTextareaClass()).initialise();

    /** Select Field **/
    (new FormFieldSelectCheckboxClass()).initialise();
    (new FormFieldSelectMultilevelClass()).initialise();
    (new FormFieldSelectRadioClass()).initialise();
    (new FormFieldSelectStandardClass()).initialise();
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