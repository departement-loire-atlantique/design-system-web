class FormLayoutUtileNo extends FormLayoutUtileAbstract {
    constructor () {
        super('#ds44-choiceN form');

        this.submitSuccessText = 'Désolé que cette page ne vous ait pas été utile !<br>Nous faisons de notre mieux pour améliorer le contenu de ce site.';
    }
}

// Singleton
new FormLayoutUtileNo();
