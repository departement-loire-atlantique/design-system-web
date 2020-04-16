class FormLayoutUtileYes extends FormLayoutUtileAbstract {
    constructor () {
        super('#ds44-choiceY form');

        this.submitSuccessText = MiscTranslate._('USEFUL_REQUEST_YES');
    }
}

// Singleton
new FormLayoutUtileYes();
