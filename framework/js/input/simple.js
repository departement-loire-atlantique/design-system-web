class InputSimple extends InputAbstract {
    constructor() {
        super('input:not([type="hidden"]):not([aria-autocomplete="list"])');
    }
}

// Singleton
new InputSimple();
