class FormInputAutoComplete extends FormField {
    constructor() {
        super(
            'input[aria-autocomplete="list"]',
            'inputAutocomplete'
        );
    }

    create(element) {
        super.create(element);

        this.FREE_TEXT_MODE = 'free-text';
        this.SELECT_ONLY_MODE = 'select-only';

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        valueElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(valueElement, element);

        // Create corresponding hidden input to store the metadata
        let metadataElement = document.createElement('input');
        metadataElement.classList.add('ds44-input-metadata');
        metadataElement.setAttribute('type', 'hidden');
        metadataElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(metadataElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.valueElement = valueElement;
        object.metadataElement = metadataElement;
        object.autoCompleterElement = null;
        object.isExpanded = false;
        if (object.containerElement) {
            object.autoCompleterElement = object.containerElement.querySelector('.ds44-autocomp-container');
        }
        if (object.autoCompleterElement) {
            object.autoCompleterListElement = object.autoCompleterElement.querySelector('.ds44-list');
        }
        if (object.autoCompleterListElement) {
            object.autoCompleterListElement.setAttribute('id', 'owned_listbox_' + object.id);
        }
        if (object.textElement.getAttribute('data-mode') === this.SELECT_ONLY_MODE) {
            object.mode = this.SELECT_ONLY_MODE;
        } else {
            object.mode = this.FREE_TEXT_MODE;
        }
        object.textElement.setAttribute('aria-owns', 'owned_listbox_' + object.id);

        this.hide(objectIndex);

        MiscEvent.addListener('keyDown:*', this.record.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:escape', this.hide.bind(this, objectIndex));
        MiscEvent.addListener('keyPress:spacebar', this.selectOption.bind(this, objectIndex));
        MiscEvent.addListener('keyPress:enter', this.selectOption.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));

        if (object.containerElement) {
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);

            object.containerElement
                .querySelectorAll('.ds44-autocomp-buttons button')
                .forEach((buttonElement) => {
                    MiscEvent.addListener('click', this.select.bind(this, objectIndex), buttonElement);
                });
        }
    }

    getData(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return;
        }

        let data = {};
        data[object.name] = {
            'value': object.valueElement.value,
            'metadata': object.metadataElement.value
        };

        return data;
    }

    record(objectIndex) {
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

    write(objectIndex) {
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

    reset(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        this.setNewValue(
            objectIndex,
            null,
            null,
            null
        );
        this.showHideResetButton(objectIndex);
        MiscAccessibility.setFocus(object.textElement);
    }

    autoComplete(objectIndex) {
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
            this.setNewValue(
                objectIndex,
                object.textElement.value,
                object.textElement.value
            );
        } else {
            object.valueElement.value = null;
            object.metadataElement.value = null;
        }

        if (!object.textElement.value) {
            this.hide(objectIndex);

            return;
        }

        MiscRequest.send(
            object.textElement.getAttribute('data-url') + '?search=' + encodeURIComponent(object.textElement.value),
            this.autoCompleteSuccess.bind(this, objectIndex),
            this.autoCompleteError.bind(this, objectIndex)
        );
    }

    autoCompleteSuccess(objectIndex, results) {
        this.autoCompleteFill(objectIndex, results);
    }

    autoCompleteError(objectIndex) {
        this.autoCompleteFill(objectIndex, {});
    }

    autoCompleteFill(objectIndex, results) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.autoCompleterElement) {
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
                let elementAutoCompleterListItem = document.createElement('li');
                elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
                elementAutoCompleterListItem.setAttribute('role', 'option');
                elementAutoCompleterListItem.setAttribute('data-text', results[key].name);
                if (object.mode === this.FREE_TEXT_MODE) {
                    elementAutoCompleterListItem.setAttribute('data-value', results[key].name);
                } else {
                    elementAutoCompleterListItem.setAttribute('data-value', key);
                }
                elementAutoCompleterListItem.setAttribute('data-metadata', (results[key].metadata ? JSON.stringify(results[key].metadata) : null));
                elementAutoCompleterListItem.setAttribute('tabindex', '0');
                elementAutoCompleterListItem.innerHTML = this.highlightSearch(results[key].name, object.textElement.value);
                object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);

                MiscEvent.addListener('focus', this.fakeSelect.bind(this, objectIndex), elementAutoCompleterListItem);
                MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), elementAutoCompleterListItem);
            }
        }

        this.show(objectIndex);
    }

    focus(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
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

    focusOut(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.valueElement) {
            return;
        }
        if (!object.containerElement) {
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
            !object.valueElement.value
        ) {
            object.textElement.value = null;
            object.currentElementValue = null;
            object.textElement.removeAttribute('value');
            this.blur(objectIndex);
        }

        this.hide(objectIndex);
    }

    invalid(objectIndex) {
        this.hide(objectIndex);

        super.invalid(objectIndex);
    }

    show(objectIndex) {
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

    hide(objectIndex) {
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

        this.showHideResetButton(objectIndex);
    }

    highlightSearch(result, search) {
        if (!result) {
            return '';
        }

        return result.replace(new RegExp(search, 'gi'), str => `<strong>${str}</strong>`);
    }

    selectOption(objectIndex, evt) {
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

    nextOption(objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.autoCompleterListElement) {
            return;
        }

        if (object.isExpanded) {
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
    }

    previousOption(objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.containerElement) {
            return;
        }

        if (object.isExpanded) {
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
    }

    fakeSelect(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        object.textElement.value = currentListItem.innerText;
        MiscAccessibility.setFocus(currentListItem);
    }

    select(objectIndex, evt) {
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
        if(
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

    selectRecord(objectIndex, currentItem) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        this.setNewValue(
            objectIndex,
            currentItem.getAttribute('data-text'),
            currentItem.getAttribute('data-value'),
            currentItem.getAttribute('data-metadata')
        );

        MiscAccessibility.setFocus(object.textElement);

        this.hide(objectIndex);

        this.checkValidity(objectIndex);
    }

    aroundMe(objectIndex, currentItem) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.aroundMeSuccess.bind(this, objectIndex, currentItem));

            return;
        }

        this.selectRecord(objectIndex, currentItem);
    }

    aroundMeSuccess(objectIndex, currentItem, position) {
        currentItem.setAttribute(
            'data-metadata',
            JSON.stringify({
                'latitude': position.coords.latitude,
                'longitude': position.coords.longitude
            })
        );
        this.selectRecord(objectIndex, currentItem);
    }

    setNewValue(objectIndex, newText, newValue, newMetadata = null) {
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

        object.textElement.value = newText;
        object.valueElement.value = newValue;
        object.metadataElement.value = newMetadata;
        object.currentElementValue = newText;
        if (object.currentElementValue) {
            object.textElement.setAttribute('value', object.currentElementValue);
        } else {
            object.textElement.removeAttribute('value');
        }
    }
}

// Singleton
new FormInputAutoComplete();
