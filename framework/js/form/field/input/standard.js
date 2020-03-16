class FormFieldInputStandard extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date]), ' +
            'input[type="email"]:not([aria-autocomplete="list"]), ' +
            'input[type="number"]:not([aria-autocomplete="list"])',
            'inputStandard'
        );
    }
}

// Singleton
new FormFieldInputStandard();
