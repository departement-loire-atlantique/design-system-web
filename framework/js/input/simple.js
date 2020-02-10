class InputSimple extends FieldAbstract {
    constructor() {
        super(
            'input[type="text"]:not([aria-autocomplete="list"]), ' +
            'input[type="email"]:not([aria-autocomplete="list"]), ' +
            'input[type="number"]:not([aria-autocomplete="list"])',
            'inputSimple'
        );
    }
}

// Singleton
new InputSimple();
