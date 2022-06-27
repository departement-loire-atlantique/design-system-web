class FormLayoutObligationAlimentaireClass extends FormLayoutAbstract {
    constructor () {
        super("FormLayoutObligationAlimentaire", '#ds44-js-soa-form');
    }

    initialise()
    {
        super.initialise();
        this.templateElement = document.querySelector('#ds44-js-soa-template');
        this.containerElement = document.querySelector('#ds44-js-soa-container');
        if (
          !this.templateElement ||
          !this.containerElement
        ) {
            return;
        }

        if(MiscComponent.checkAndCreate(this.containerElement, "form-soa"))
        {
            this.add();

            const addElement = document.querySelector('#ds44-js-soa-add');
            if (addElement) {
                MiscEvent.addListener('click', this.add.bind(this), addElement);
            }
            const deleteElement = document.querySelector('#ds44-js-soa-delete');
            if (deleteElement) {
                MiscEvent.addListener('click', this.delete.bind(this), deleteElement);
            }
        }
    }

    add () {
        const itemNumber = this.containerElement.querySelectorAll('.ds44-js-soa-item').length;
        const idNumber = itemNumber * 2;

        const cloneElement = document.importNode(this.templateElement.content, true);
        cloneElement.childNodes.forEach((childElement) => {
            if (!childElement.innerHTML) {
                return;
            }

            childElement.innerHTML = childElement.innerHTML
                .replace(/ds44-js-soa-template-field-1/gi, 'ds44-js-soa-field-' + idNumber)
                .replace(/ds44-js-soa-template-field-2/gi, 'ds44-js-soa-field-' + (idNumber + 1))
                .replace(/n°\)/gi, 'n°' + (itemNumber + 1) + ')');
            if (childElement.classList.contains('ds44-js-soa-item')) {
                childElement.setAttribute('id', 'ds44-js-soa-item-' + itemNumber)
            }
        });
        cloneElement.querySelector('.ds44-js-soa-number').innerText = itemNumber + 1;

        this.containerElement.append(cloneElement);

        const selectorPrefix = '#ds44-js-soa-container #ds44-js-soa-item-' + itemNumber;
        MiscEvent.dispatch('field:add', {
            'selector': selectorPrefix + ' input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date])',
            'category': 'inputStandard'
        });
        MiscEvent.dispatch('field:add', {
            'selector': selectorPrefix + ' .ds44-selectDisplay.ds44-js-select-standard',
            'category': 'selectStandard'
        });

        const deleteElement = document.querySelector('#ds44-js-soa-delete');
        if (deleteElement && itemNumber === 1) {
            deleteElement.classList.remove('ds44-none');
        }

        window.setTimeout(
            ((idNumber) => {
                MiscAccessibility.setFocus(null, '#ds44-js-soa-field-' + idNumber);
            }).bind(this, idNumber),
            100
        )
    }

    delete () {
        const itemElements = this.containerElement.querySelectorAll('.ds44-js-soa-item');
        const itemNumber = itemElements.length;
        if (itemNumber <= 1) {
            return;
        }
        const lastItemElement = itemElements[itemNumber - 1];

        const selectorPrefix = '#ds44-js-soa-container #' + lastItemElement.getAttribute('id');
        MiscEvent.dispatch('field:destroy', {
            'selector': selectorPrefix + ' input[type="text"]:not([aria-autocomplete="list"]):not([data-is-date])',
            'category': 'inputStandard'
        });
        MiscEvent.dispatch('field:destroy', {
            'selector': selectorPrefix + ' .ds44-selectDisplay.ds44-js-select-standard',
            'category': 'selectStandard'
        });

        lastItemElement.remove();

        const deleteElement = document.querySelector('#ds44-js-soa-delete');
        if (deleteElement && itemNumber === 2) {
            deleteElement.classList.add('ds44-none');

            const addElement = document.querySelector('#ds44-js-soa-add');
            if (addElement) {
                MiscAccessibility.setFocus(addElement);
            }
        }
    }

    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        const resultsElement = document.querySelector('#ds44-js-soa-results');
        if (
            !object ||
            !window.FORM_OBLIGATION_ALIMENTAIRE ||
            !resultsElement
        ) {
            return;
        }

        const results = [];
        let totalFoodObligation = 0;
        for (let i = 0; i < Object.keys(formData).length; (i = i + 2)) {
            const income = formData['ds44-js-soa-field-' + i].value;
            const nbShare = formData['ds44-js-soa-field-' + (i + 1)].value;

            const result = parseFloat(
                Math.max(
                    0,
                    ((income / 12) - (window.FORM_OBLIGATION_ALIMENTAIRE.threshold + ((nbShare - 1) * window.FORM_OBLIGATION_ALIMENTAIRE.delta * 2))) / 6
                )
                , 10
            );
            totalFoodObligation += Math.round(result);

            results.push(
                Math.round(result) + ' ' +
                MiscTranslate._('FOOD_OBLIGATION_PER_MONTH') + ((i / 2) + 1)
            );
        }

        resultsElement.innerHTML = '<section class="ds44-box ds44-theme" tabindex="0">' +
            '<div class="ds44-innerBoxContainer">' +
            '<p role="heading" aria-level="3" class="h5-like">' +
            MiscTranslate._(
                'FOOD_OBLIGATION_TOTAL',
                { totalFoodObligation: totalFoodObligation }
            ) +
            '</p>' +
            '<ul><li>' + results.join('</li><li>') + '</li></ul>' +
            '</div>' +
            '</section>';
        resultsElement.classList.remove('hidden');
        MiscAccessibility.setFocus(resultsElement.querySelector('section:first-child'));
    }
}
// Singleton
var FormLayoutObligationAlimentaire = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormLayoutObligationAlimentaireClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormLayoutObligationAlimentaire();
