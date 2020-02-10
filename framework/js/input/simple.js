class InputSimple extends FieldAbstract {
    constructor() {
        super('input:not([type="hidden"]):not([aria-autocomplete="list"])');
    }
}

// Singleton
new InputSimple();
