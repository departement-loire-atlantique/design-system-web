class InputAutoComplete extends InputAbstract {
    constructor() {
        super('input[aria-autocomplete="list"]');
    }

    create(element) {
        super.create(element);

        this.FREE_TEXT_MODE = 'free-text';
        this.SELECT_ONLY_MODE = 'select-only';

        // Create corresponding hidden input to store the value
        let valueInputElement = document.createElement('input');
        valueInputElement.classList.add('ds44-input-value');
        valueInputElement.setAttribute('type', 'hidden');
        valueInputElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(valueInputElement, element);

        // Create corresponding hidden input to store the metadata
        let metadataInputElement = document.createElement('input');
        metadataInputElement.classList.add('ds44-input-metadata');
        metadataInputElement.setAttribute('type', 'hidden');
        metadataInputElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(metadataInputElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.valueInputElement = valueInputElement;
        object.metadataInputElement = metadataInputElement;
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
        if (element.getAttribute('data-mode') === this.SELECT_ONLY_MODE) {
            object.mode = this.SELECT_ONLY_MODE;
        } else {
            object.mode = this.FREE_TEXT_MODE;
        }
        element.setAttribute('aria-owns', 'owned_listbox_' + object.id);

        this.hide(objectIndex);

        MiscEvent.addListener('keyDown:*', this.record.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:*', this.write.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:escape', this.hide.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:spacebar', this.selectOption.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:enter', this.selectOption.bind(this, objectIndex));
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

    record(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (object.textInputElement !== document.activeElement) {
            return;
        }

        object.currentInputElementValue = object.textInputElement.value;
    }

    write(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (object.textInputElement !== document.activeElement) {
            return;
        }

        this.autoComplete(objectIndex);
    }

    autoComplete(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.valueInputElement) {
            return;
        }
        if (!object.metadataInputElement) {
            return;
        }

        if (object.currentInputElementValue === object.textInputElement.value) {
            return;
        }

        if (object.mode === this.FREE_TEXT_MODE) {
            this.setNewValue(
                objectIndex,
                object.textInputElement.value,
                object.textInputElement.value
            );
        } else if (object.mode === this.SELECT_ONLY_MODE) {
            object.valueInputElement.value = null;
            object.metadataInputElement.value = null;
        }

        if (!object.textInputElement.value) {
            this.hide(objectIndex);

            return;
        }

        MiscRequest.send(
            object.textInputElement.getAttribute('data-url') + '?search=' + encodeURIComponent(object.textInputElement.value),
            this.autoCompleteSuccess.bind(this, objectIndex),
            this.autoCompleteError.bind(this, objectIndex)
        );
    }

    autoCompleteSuccess(objectIndex, results) {
        this.autoCompleteFill(objectIndex, results);
    }

    autoCompleteError(objectIndex) {
        this.autoCompleteFill(objectIndex, {'data': {}, 'total': 0});
    }

    autoCompleteFill(objectIndex, results) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }
        if (!object.autoCompleterListElement) {
            return;
        }

        object.textInputElement.removeAttribute('aria-activedescendant');
        Array.from(object.autoCompleterListElement.children).map((childElement) => {
            childElement.remove();
        });

        for (let key in results.data) {
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
            elementAutoCompleterListItem.setAttribute('role', 'option');
            elementAutoCompleterListItem.setAttribute('data-text', results.data[key].name);
            if (object.mode === this.FREE_TEXT_MODE) {
                elementAutoCompleterListItem.setAttribute('data-value', results.data[key].name);
            } else {
                elementAutoCompleterListItem.setAttribute('data-value', key);
            }
            elementAutoCompleterListItem.setAttribute('data-metadata', (results.data[key].metadata ? JSON.stringify(results.data[key].metadata) : null));
            elementAutoCompleterListItem.setAttribute('tabindex', '0');
            elementAutoCompleterListItem.innerHTML = this.highlightSearch(results.data[key].name, object.textInputElement.value);
            object.autoCompleterListElement.appendChild(elementAutoCompleterListItem);

            MiscEvent.addListener('focus', this.fakeSelect.bind(this, objectIndex), elementAutoCompleterListItem);
            MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), elementAutoCompleterListItem);
        }

        const elementAutoCompleterTotal = object.autoCompleterElement.querySelector('.ds44-lightLink');
        if (elementAutoCompleterTotal) {
            const total = (parseInt(results.total, 10) - Object.keys(results.data).length);
            elementAutoCompleterTotal.innerHTML = total + ' ' + (total > 1 ? 'suggestions supplémentaires' : 'suggestion supplémentaire');
        }

        this.show(objectIndex);
    }

    focus(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }

        if (
            object.currentInputElementValue &&
            object.currentInputElementValue !== object.textInputElement.value
        ) {
            object.textInputElement.value = object.currentInputElementValue;
        }

        this.autoComplete(objectIndex);

        super.focus(objectIndex);
    }

    focusOut(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.valueInputElement) {
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
            !object.valueInputElement.value
        ) {
            object.textInputElement.value = null;
            object.currentInputElementValue = null;
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
        if (!object.textInputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        object.autoCompleterElement.classList.remove('hidden');
        MiscAccessibility.show(object.autoCompleterElement, true);
        object.textInputElement.setAttribute('aria-expanded', 'true');
        object.isExpanded = true;
    }

    hide(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        if (
            object.currentInputElementValue &&
            object.currentInputElementValue !== object.textInputElement.value
        ) {
            object.textInputElement.value = object.currentInputElementValue;
        }

        object.autoCompleterElement.classList.add('hidden');
        MiscAccessibility.hide(object.autoCompleterElement, true);
        object.textInputElement.removeAttribute('aria-expanded');
        object.isExpanded = false;
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
                MiscAccessibility.setFocus(object.autoCompleterListElement.querySelector('.ds44-autocomp-list_elem'))
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
        if (!object.textInputElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        object.textInputElement.value = currentListItem.innerText;
        MiscAccessibility.setFocus(currentListItem);
    }

    select(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.autoCompleterListElement) {
            return;
        }

        const currentItem = evt.currentTarget;
        const selectedListItem = object.autoCompleterListElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('id', 'selected_option_' + object.id);
        object.textInputElement.setAttribute('aria-activedescendant', 'selected_option_' + object.id);

        this.setNewValue(
            objectIndex,
            currentItem.getAttribute('data-text'),
            currentItem.getAttribute('data-value'),
            currentItem.getAttribute('data-metadata')
        );

        MiscAccessibility.setFocus(object.textInputElement);

        this.hide(objectIndex);
    }

    setNewValue(objectIndex, newText, newValue, newMetadata = null) {
        const object = this.objects[objectIndex];
        if (!object.textInputElement) {
            return;
        }
        if (!object.valueInputElement) {
            return;
        }
        if (!object.metadataInputElement) {
            return;
        }

        object.textInputElement.value = newText;
        object.valueInputElement.value = newValue;
        object.metadataInputElement.value = newMetadata;
        object.currentInputElementValue = newText;
    }
}

// Singleton
new InputAutoComplete();
