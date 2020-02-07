class InputAutoComplete extends InputAbstract {
    constructor() {
        super('input[aria-autocomplete="list"]');
    }

    create(element) {
        super.create(element);

        this.FREE_TEXT_MODE = 'free-text';
        this.SELECT_ONLY_MODE = 'select-only';

        // Create corresponding hidden input to store the value
        let hiddenInputElement = document.createElement('input');
        hiddenInputElement.setAttribute('type', 'hidden');
        hiddenInputElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(hiddenInputElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.hiddenInputElement = hiddenInputElement;
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
        }
    }

    record(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (object.inputElement !== document.activeElement) {
            return;
        }

        object.currentInputElementValue = object.inputElement.value;
    }

    write(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (object.inputElement !== document.activeElement) {
            return;
        }

        this.autoComplete(objectIndex);
    }

    autoComplete(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (!object.hiddenInputElement) {
            return;
        }

        if (object.currentInputElementValue === object.inputElement.value) {
            return;
        }

        if (object.mode === this.FREE_TEXT_MODE) {
            this.setNewValue(
                objectIndex,
                object.inputElement.value,
                object.inputElement.value
            );
        } else if (object.mode === this.SELECT_ONLY_MODE) {
            object.hiddenInputElement.value = null;
        }

        if (!object.inputElement.value) {
            this.hide(objectIndex);

            return;
        }

        MiscRequest.send(
            object.inputElement.getAttribute('data-url') + '?search=' + encodeURIComponent(object.inputElement.value),
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
        if (!object.inputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }
        if (!object.autoCompleterListElement) {
            return;
        }

        object.inputElement.removeAttribute('aria-activedescendant');
        Array.from(object.autoCompleterListElement.children).map((childElement) => {
            childElement.remove();
        });

        for (let key in results.data) {
            let elementAutoCompleterListItem = document.createElement('li');
            elementAutoCompleterListItem.classList.add('ds44-autocomp-list_elem');
            elementAutoCompleterListItem.setAttribute('role', 'option');
            elementAutoCompleterListItem.setAttribute('data-value', key);
            elementAutoCompleterListItem.setAttribute('tabindex', '0');
            elementAutoCompleterListItem.innerHTML = this.highlightSearch(results.data[key].name, object.inputElement.value);
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
        if (!object.inputElement) {
            return;
        }

        if (
            object.currentInputElementValue &&
            object.currentInputElementValue !== object.inputElement.value
        ) {
            object.inputElement.value = object.currentInputElementValue;
        }

        this.autoComplete(objectIndex);

        super.focus(objectIndex);
    }

    focusOut(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (!object.hiddenInputElement) {
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
            !object.hiddenInputElement.value
        ) {
            object.inputElement.value = null;
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
        if (!object.inputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        object.autoCompleterElement.classList.remove('hidden');
        MiscAccessibility.show(object.autoCompleterElement, true);
        object.inputElement.setAttribute('aria-expanded', 'true');
        object.isExpanded = true;
    }

    hide(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        if (
            object.currentInputElementValue &&
            object.currentInputElementValue !== object.inputElement.value
        ) {
            object.inputElement.value = object.currentInputElementValue;
        }

        object.autoCompleterElement.classList.add('hidden');
        MiscAccessibility.hide(object.autoCompleterElement, true);
        object.inputElement.removeAttribute('aria-expanded');
        object.isExpanded = false;
    }

    highlightSearch(result, search) {
        if (!result) {
            return '';
        }

        return result.replace(new RegExp(search, 'gi'), str => `<strong>${str}</strong>`);
    }

    fakeSelect(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        object.inputElement.value = currentListItem.innerText;
        MiscAccessibility.setFocus(currentListItem);
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

    select(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (!object.autoCompleterElement) {
            return;
        }

        const currentListItem = evt.currentTarget;
        const selectedListItem = currentListItem.parentNode.querySelector('.ds44-autocomp-list_elem.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
        }
        currentListItem.classList.add('selected_option');
        currentListItem.setAttribute('id', 'selected_option_' + object.id);
        object.inputElement.setAttribute('aria-activedescendant', 'selected_option_' + object.id);

        if (object.mode === this.FREE_TEXT_MODE) {
            this.setNewValue(
                objectIndex,
                currentListItem.innerText,
                currentListItem.innerText
            );
        } else {
            this.setNewValue(
                objectIndex,
                currentListItem.getAttribute('data-value'),
                currentListItem.innerText
            );
        }

        MiscAccessibility.setFocus(object.inputElement);

        this.hide(objectIndex);
    }

    setNewValue(objectIndex, newValue, text) {
        const object = this.objects[objectIndex];
        if (!object.inputElement) {
            return;
        }
        if (!object.hiddenInputElement) {
            return;
        }

        object.inputElement.value = text;
        object.hiddenInputElement.value = newValue;
        object.currentInputElementValue = text;
    }
}

// Singleton
new InputAutoComplete();
