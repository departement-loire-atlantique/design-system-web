class FormFieldInputAutoComplete extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[aria-autocomplete="list"]',
            'inputAutocomplete'
        );
    }

    create (element) {
        super.create(element);

        this.FREE_TEXT_MODE = 'free-text';
        this.SELECT_ONLY_MODE = 'select-only';

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        // Create corresponding hidden input to store the metadata
        let metadataElement = document.createElement('input');
        metadataElement.classList.add('ds44-input-metadata');
        metadataElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(metadataElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];

        object.valueElement = valueElement;
        object.metadataElement = metadataElement;
        object.autoCompleterElement = object.containerElement.querySelector('.ds44-autocomp-container');
        object.autoCompleterListElement = null;
        if (object.autoCompleterElement) {
            object.autoCompleterListElement = object.autoCompleterElement.querySelector('.ds44-list');
        }
        if (object.textElement.getAttribute('data-mode') === this.SELECT_ONLY_MODE) {
            object.mode = this.SELECT_ONLY_MODE;
        } else {
            object.mode = this.FREE_TEXT_MODE;
        }
        object.isExpanded = false;
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            object.textElement.setAttribute('aria-owns', 'owned_listbox_' + object.id);
            if (object.autoCompleterListElement) {
                object.autoCompleterListElement.setAttribute('id', 'owned_listbox_' + object.id);
            }

            this.hide(objectIndex);

            MiscEvent.addListener('keyDown:*', this.record.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
            MiscEvent.addListener('keyPress:spacebar', this.selectOption.bind(this, objectIndex));
            MiscEvent.addListener('keyPress:enter', this.selectOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);

            object.containerElement
                .querySelectorAll('.ds44-autocomp-buttons button')
                .forEach((buttonElement) => {
                    MiscEvent.addListener('click', this.select.bind(this, objectIndex), buttonElement);
                });
        }
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        this.hide(objectIndex);
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.metadataElement) {
            return;
        }

        object.currentElementValue = ((data && data.text) ? data.text : null);
        if (object.currentElementValue) {
            object.textElement.setAttribute('value', object.currentElementValue);
        } else {
            object.textElement.removeAttribute('value');
        }
        if (object.textElement.value !== object.currentElementValue) {
            object.textElement.value = object.currentElementValue;
        }
        if (data && data.metadata) {
            if (typeof data.metadata === 'object') {
                object.metadataElement.value = JSON.stringify(data.metadata);
            } else {
                object.metadataElement.value = data.metadata;
            }
        } else {
            object.metadataElement.value = null;
        }
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        const extendedData = {};
        extendedData[object.name] = {
            'text': object.textElement.value,
            'metadata': (object.metadataElement.value ? JSON.parse(object.metadataElement.value) : null)
        };

        return MiscUtils.merge(data, extendedData);
    }

    record (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (object.textElement !== document.activeElement) {
            return;
        }

        object.currentElementValue = object.textElement.value;
        if (object.currentElementValue) {
            object.textElement.setAttribute('value', object.currentElementValue);
        } else {
            object.textElement.removeAttribute('value');
        }
    }

    write (objectIndex) {
        super.write(objectIndex);

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (object.textElement !== document.activeElement) {
            return;
        }

        this.autoComplete(objectIndex);
    }

    autoComplete (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.valueElement) {
            return;
        }
        if (!object.metadataElement) {
            return;
        }

        if (object.currentElementValue === object.textElement.value) {
            return;
        }

        if (
            object.mode === this.FREE_TEXT_MODE ||
            !object.textElement.value
        ) {
            this.setData(
                objectIndex,
                {
                    'text': object.textElement.value,
                    'value': object.textElement.value
                }
            );
        } else {
            this.setData(
                objectIndex,
                {
                    'text': object.textElement.value,
                    'value': null,
                    'metadata': null
                }
            );
        }

        if (!object.textElement.value) {
            this.hide(objectIndex);

            return;
        }

        const url = object.textElement.getAttribute('data-url');
        MiscRequest.send(
            url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(object.textElement.value),
            this.autoCompleteSuccess.bind(this, objectIndex),
            this.autoCompleteError.bind(this, objectIndex)
        );
    }

    autoCompleteSuccess (objectIndex, results) {
        this.autoCompleteFill(objectIndex, results);
    }

    autoCompleteError (objectIndex) {
        this.autoCompleteFill(objectIndex, {});
    }

    autoCompleteFill (objectIndex, results) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.autoCompleterListElement) {
            return;
        }

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(object.autoCompleterListElement.children).map((childElement) => {
            childElement.remove();
        });

        if (Object.keys(results).length === 0) {
            // No result
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_no_elem');
            elementAutoCompleterListItem.innerHTML = 'Aucun résultat trouvé';
            object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);
        } else {
            // Some result
            for (let key in results) {
                if (!results.hasOwnProperty(key)) {
                    continue;
                }

                let elementAutoCompleterListItem = document.createElement('li');
                elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
                elementAutoCompleterListItem.setAttribute('role', 'option');
                elementAutoCompleterListItem.setAttribute('data-text', results[key].value);
                if (object.mode === this.FREE_TEXT_MODE) {
                    elementAutoCompleterListItem.setAttribute('data-value', results[key].value);
                } else {
                    elementAutoCompleterListItem.setAttribute('data-value', (results[key].id || key));
                }
                elementAutoCompleterListItem.setAttribute('data-metadata', (results[key].metadata ? JSON.stringify(results[key].metadata) : null));
                elementAutoCompleterListItem.setAttribute('tabindex', '0');
                elementAutoCompleterListItem.innerHTML = this.highlightSearch(results[key].value, object.textElement.value);
                object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);

                MiscEvent.addListener('focus', this.fakeSelect.bind(this, objectIndex), elementAutoCompleterListItem);
                MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), elementAutoCompleterListItem);
            }
        }

        this.show(objectIndex);
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.isEnabled || !object.textElement) {
            return;
        }

        if (
            object.currentElementValue &&
            object.currentElementValue !== object.textElement.value
        ) {
            object.textElement.value = object.currentElementValue;
        }

        this.autoComplete(objectIndex);

        super.focus(objectIndex);
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.valueElement) {
            return;
        }

        if (
            evt &&
            object.containerElement.contains(evt.target) &&
            object.containerElement.contains(evt.relatedTarget)
        ) {
            return;
        }

        if (
            object.mode === this.SELECT_ONLY_MODE &&
            !this.getData(objectIndex)
        ) {
            object.textElement.value = null;
            object.currentElementValue = null;
            object.textElement.removeAttribute('value');
            this.blur(objectIndex);
        }

        this.hide(objectIndex);
    }

    invalid (objectIndex) {
        super.invalid(objectIndex);

        this.hide(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        object.autoCompleterElement.classList.remove('hidden');
        MiscAccessibility.show(object.autoCompleterElement, true);
        object.textElement.setAttribute('aria-expanded', 'true');
        object.isExpanded = true;
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        if (
            object.currentElementValue &&
            object.currentElementValue !== object.textElement.value
        ) {
            object.textElement.value = object.currentElementValue;
        }

        object.autoCompleterElement.classList.add('hidden');
        MiscAccessibility.hide(object.autoCompleterElement, true);
        object.textElement.setAttribute('aria-expanded', 'false');
        object.isExpanded = false;

        this.showNotEmpty(objectIndex);
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];

        if (
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement)
        ) {
            return;
        }

        if (!object.textElement) {
            return;
        }

        MiscAccessibility.setFocus(object.textElement);

        this.hide(objectIndex);
    }

    highlightSearch (result, search) {
        if (!result) {
            return '';
        }

        return result.replace(new RegExp(search, 'gi'), str => `<strong>${str}</strong>`);
    }

    selectOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.autoCompleterListElement) {
            return;
        }

        if (
            document.activeElement &&
            document.activeElement.classList.contains('ds44-autocomp-list_elem') &&
            object.autoCompleterListElement.contains(document.activeElement)
        ) {
            MiscEvent.dispatch('mousedown', null, document.activeElement);
        }
    }

    nextOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.autoCompleterListElement) {
            return;
        }
        if (!object.isExpanded) {
            return;
        }

        const selectedListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:focus');
        const lastListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:last-child');
        if (
            !selectedListItem ||
            selectedListItem === lastListItem
        ) {
            // Select first
            MiscAccessibility.setFocus(object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem'));
        } else {
            // Select next
            MiscAccessibility.setFocus(MiscDom.getNextSibling(selectedListItem));
        }
    }

    previousOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.isExpanded) {
            return;
        }

        const selectedListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:focus');
        const firstListItem = object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:first-child');
        if (
            !selectedListItem ||
            selectedListItem === firstListItem
        ) {
            // Select last
            MiscAccessibility.setFocus(object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem:last-child'))
        } else {
            // Select previous
            MiscAccessibility.setFocus(MiscDom.getPreviousSibling(selectedListItem));
        }
    }

    fakeSelect (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        object.textElement.value = currentListItem.innerText;
        MiscAccessibility.setFocus(currentListItem);
    }

    select (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        const currentItem = evt.currentTarget;
        const selectedListItem = object.autoCompleterElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
            selectedListItem.removeAttribute('aria-selected');
            selectedListItem.removeAttribute('aria-pressed');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('id', 'selected_option_' + object.id);
        currentItem.setAttribute('aria-selected', 'true');
        if (
            evt &&
            evt.currentTarget.tagName.toLowerCase() === 'button'
        ) {
            currentItem.setAttribute('aria-pressed', 'true');
        }
        object.textElement.setAttribute('aria-activedescendant', 'selected_option_' + object.id);

        if (this[currentItem.getAttribute('data-value')]) {
            // Call corresponding function
            this[currentItem.getAttribute('data-value')](objectIndex, currentItem);
            return;
        }

        this.selectRecord(objectIndex, currentItem);
    }

    selectRecord (objectIndex, currentItem) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        this.setData(
            objectIndex,
            {
                'text': currentItem.getAttribute('data-text'),
                'value': currentItem.getAttribute('data-value'),
                'metadata': currentItem.getAttribute('data-metadata')
            }
        );

        this.focusOnTextElement(objectIndex);

        this.hide(objectIndex);

        this.checkValidity(objectIndex);
    }

    aroundMe (objectIndex, currentItem) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.aroundMeSuccess.bind(this, objectIndex, currentItem));

            return;
        }

        this.selectRecord(objectIndex, currentItem);
    }

    aroundMeSuccess (objectIndex, currentItem, position) {
        currentItem.setAttribute(
            'data-metadata',
            JSON.stringify({
                'latitude': position.coords.latitude,
                'longitude': position.coords.longitude
            })
        );
        this.selectRecord(objectIndex, currentItem);
    }
}

// Singleton
new FormFieldInputAutoComplete();
