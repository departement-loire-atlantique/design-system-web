class InputAutoComplete extends InputAbstract {
    constructor() {
        super('input[aria-autocomplete="list"]');
    }

    create(element) {
        super.create(element);

        this.hide(null, element);

        MiscEvent.addListener('keyUp:*', this.autoComplete.bind(this, element));
    }

    autoComplete(element) {
        if (!element.value) {
            this.hide(null, element);

            return;
        }

        MiscRequest.send(
            element.getAttribute('data-url') + '?search=' + encodeURIComponent(element.value),
            this.autoCompleteSuccess.bind(this, element),
            this.autoCompleteError.bind(this, element)
        );
    }

    autoCompleteSuccess(element, results) {
        this.autoCompleteFill(element, results);
    }

    autoCompleteError(element) {
        this.autoCompleteFill(element, {});
    }

    autoCompleteFill(element, results) {
        const elementAutoCompleter = this.getAutoCompleterElement(element);
        if (!elementAutoCompleter) {
            return;
        }

        const elementAutoCompleterList = elementAutoCompleter.querySelector('.ds44-list');
        if (!elementAutoCompleterList) {
            return;
        }

        Array.from(elementAutoCompleterList.children).map((childElement) => {
            childElement.remove();
        });

        for (let key in results) {
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
            elementAutoCompleterListItem.setAttribute('role', 'option');
            elementAutoCompleterListItem.setAttribute('data-value', key);
            elementAutoCompleterListItem.innerHTML = this.highlightSearch(results[key].name, element.value);
            elementAutoCompleterList.appendChild(elementAutoCompleterListItem);
        }

        const elementAutoCompleterTotal = elementAutoCompleter.querySelector('.ds44-lightLink');
        if (elementAutoCompleterTotal) {
            let totalSentence = elementAutoCompleterTotal.innerHTML.split(' ');
            totalSentence.splice(0, 1, Object.keys(results).length);
            elementAutoCompleterTotal.innerHTML = totalSentence.join(' ');
        }

        elementAutoCompleter.classList.remove('hidden');
    }

    focus(evt) {
        const element = evt.currentTarget;
        if (element.value) {
            this.autoComplete(element);
        }

        super.focus(evt);
    }

    blur(evt) {
        this.hide(evt);

        super.blur(evt);
    }

    invalid(evt) {
        this.hide(evt);

        super.invalid(evt);
    }

    hide(evt, element) {
        if (!element) {
            element = evt.currentTarget;
        }

        const elementAutoCompleter = this.getAutoCompleterElement(element);
        if (!elementAutoCompleter) {
            return;
        }

        elementAutoCompleter.classList.add('hidden');
    }

    getAutoCompleterElement(element) {
        if (!element) {
            return null;
        }

        const elementContainer = element.closest('.ds44-form__container');
        if (!elementContainer) {
            return null;
        }

        const elementAutoCompleter = elementContainer.querySelector('.ds44-autocomp-container');
        if (!elementAutoCompleter) {
            return null;
        }

        return elementAutoCompleter;
    }

    highlightSearch(result, search) {
        if (!result) {
            return '';
        }

        return result.replace(new RegExp(search, 'gi'), str => `<strong>${str}</strong>`);
    }
}

// Singleton
new InputAutoComplete();
