class FormLayoutUtileNo extends FormLayoutUtileAbstract {
    constructor () {
        super('#ds44-choiceN form');

        this.submitSuccessText = MiscTranslate._('USEFUL_REQUEST_NO');
    }
}

// Singleton
new FormLayoutUtileNo();
