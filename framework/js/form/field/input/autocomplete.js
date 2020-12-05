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
        if (!object) {
            return;
        }

        object.valueElement = valueElement;
        object.metadataElement = metadataElement;
        object.autoCompleterElement = object.containerElement.querySelector('.ds44-autocomp-container');
        object.nbResultsElement = object.autoCompleterElement.querySelector('.ds44-js-nb-results');
        if(!object.nbResultsElement) {
            let nbResultsElement = document.createElement('div');
            nbResultsElement.classList.add('visually-hidden');
            nbResultsElement.classList.add('ds44-js-nb-results');
            nbResultsElement.setAttribute('aria-live', 'polite');

            const autoCompleterListElement = object.autoCompleterElement.querySelector('.ds44-autocomp-list')
            autoCompleterListElement.insertBefore(nbResultsElement, autoCompleterListElement.firstChild);
            object.nbResultsElement = object.autoCompleterElement.querySelector('.ds44-js-nb-results');
        }
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
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

            object.textElement.setAttribute('aria-owns', 'owned_listbox_' + object.id);
            if (object.autoCompleterListElement) {
                object.autoCompleterListElement.setAttribute('id', 'owned_listbox_' + object.id);
            }

            this.hide(objectIndex);

            MiscEvent.addListener('keyDown:*', this.record.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);

            const locationElement = object.containerElement.querySelector('.ds44-location');
            if (locationElement) {
                MiscEvent.addListener('click', this.aroundMe.bind(this, objectIndex), locationElement);
            }

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
        if (
            !object ||
            !object.textElement ||
            !object.metadataElement
        ) {
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
        if (!object) {
            return null;
        }

        const extendedData = {};
        extendedData[object.name] = {
            'text': object.textElement.value,
            'metadata': (object.metadataElement.value ? JSON.parse(object.metadataElement.value) : null)
        };

        return MiscUtils.merge(data, extendedData);
    }

    record (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
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
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
            return;
        }

        this.autoComplete(objectIndex);
    }

    autoComplete (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement ||
            !object.metadataElement ||
            object.currentElementValue === object.textElement.value
        ) {
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

        let url = object.textElement.getAttribute('data-url');
        if (url.includes('$parentValue')) {
            url = url.replace('$parentValue', object.parentValue);
        }
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
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterListElement
        ) {
            return;
        }

        // Translate results
        results = this.translate(objectIndex, results);

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(object.autoCompleterListElement.children).map((childElement) => {
            childElement.remove();
        });


        if (Object.keys(results).length === 0) {
            // No result
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_no_elem');
            elementAutoCompleterListItem.innerHTML = MiscTranslate._('NO_RESULTS_FOUND');
            object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);

            if (object.nbResultsElement) {
                object.nbResultsElement.setAttribute('aria-atomic', 'true');
                object.nbResultsElement.innerHTML = '<p>' + MiscTranslate._('NO_SUGGESTIONS', { search: object.textElement.value }) + '</p>';
            }
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
                elementAutoCompleterListItem.setAttribute('title', results[key].value);
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

            if (object.nbResultsElement) {
                object.nbResultsElement.setAttribute('aria-atomic', 'true');
                object.nbResultsElement.innerHTML = '<p>' + MiscTranslate._('SUGGESTIONS', { nbResults: Object.keys(results).length }) + '</p>';
            }
        }

        this.show(objectIndex);
    }

    translate (objectIndex, results) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return results;
        }

        if (object.textElement.classList.contains('ds44-js-field-address')) {
            // Address from BAN
            const formatedResults = {};

            if (results.features) {
                for (let i = 0; i < results.features.length; i++) {
                    const feature = results.features[i];

                    formatedResults[feature.properties.id] = {
                        value: feature.properties.label,
                        metadata: {
                            latitude: feature.geometry.coordinates[1],
                            longitude: feature.geometry.coordinates[0]
                        }
                    }
                }
            }

            results = formatedResults;
        }

        return results;
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (object && object.isEnabled && object.textElement) {
            if (
                object.currentElementValue &&
                object.currentElementValue !== object.textElement.value
            ) {
                object.textElement.value = object.currentElementValue;
            }

            this.autoComplete(objectIndex);
        }

        super.focus(objectIndex);
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement
        ) {
            return;
        }

        if (
            evt &&
            object.containerElement.contains(evt.target) &&
            object.containerElement.contains(evt.relatedTarget)
        ) {
            return;
        }

        this.hide(objectIndex);
    }

    invalid (objectIndex) {
        super.invalid(objectIndex);

        this.hide(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        object.autoCompleterElement.classList.remove('hidden');
        MiscAccessibility.show(object.autoCompleterElement);
        object.textElement.setAttribute('aria-expanded', 'true');
        object.isExpanded = true;
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        if (
            object.currentElementValue &&
            object.currentElementValue !== object.textElement.value
        ) {
            object.textElement.value = object.currentElementValue;
        }

        if (object.nbResultsElement) {
            object.nbResultsElement.removeAttribute('aria-atomic');
            object.nbResultsElement.innerHTML = '';
        }
        object.autoCompleterElement.classList.add('hidden');
        MiscAccessibility.hide(object.autoCompleterElement);
        object.textElement.setAttribute('aria-expanded', 'false');
        object.isExpanded = false;

        this.showNotEmpty(objectIndex);
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement) ||
            !object.textElement
        ) {
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

    nextOption (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.autoCompleterListElement ||
            !object.isExpanded
        ) {
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
        if (!object || !object.isExpanded) {
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
        if (!object || !object.textElement) {
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
        if (
            !object ||
            !object.textElement ||
            !object.autoCompleterElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget;
        const selectedListItem = object.autoCompleterElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('id', 'selected_option_' + object.id);
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
        if (!object || !object.textElement) {
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
        if (currentItem instanceof Event) {
            // Only accept dom elements
            currentItem = null;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.aroundMeSuccess.bind(this, objectIndex, currentItem));

            return;
        }

        if (currentItem) {
            this.selectRecord(objectIndex, currentItem);
        }
    }

    aroundMeSuccess (objectIndex, currentItem, position) {
        if (currentItem) {
            // Is an option in the autocomplete list
            currentItem.setAttribute(
                'data-metadata',
                JSON.stringify({
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude
                })
            );
            this.selectRecord(objectIndex, currentItem);

            return;
        }

        // Is outside the autocomplete list, set the data straight away
        this.setData(
            objectIndex,
            {
                'value': 'aroundMe',
                'text': MiscTranslate._('AROUND_ME'),
                'metadata': {
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude
                }
            }
        );

        this.focusOnTextElement(objectIndex);
        this.hide(objectIndex);
        this.checkValidity(objectIndex);
    }
}

// Singleton
new FormFieldInputAutoComplete();
