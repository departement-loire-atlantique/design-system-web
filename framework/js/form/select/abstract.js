class FormSelect extends FormField {
    constructor() {
        super(
            '.ds44-selectDisplay',
            'selectStandard'
        );
    }

    create(element) {
        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        valueElement.setAttribute('aria-hidden', 'true');
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.valueElement = valueElement;
        object.shapeElement = null;
        object.labelElement = null;
        object.buttonElement = null;
        object.buttonIconElement = null;
        object.buttonTextElement = null;
        if (object.containerElement) {
            object.shapeElement = object.containerElement.querySelector('.ds44-select__shape');
            object.labelElement = object.containerElement.querySelector('.ds44-selectLabel');
            object.buttonElement = object.containerElement.querySelector('.ds44-btnOpen');
            object.buttonIconElement = object.containerElement.querySelector('.ds44-btnOpen .icon');
            object.buttonTextElement = object.containerElement.querySelector('.ds44-btnOpen .visually-hidden');
        }
        object.isExpanded = false;
        object.isRequired = (element.getAttribute('data-required') === 'true');

        this.hide(objectIndex);

        MiscEvent.addListener('keyUp:escape', this.hide.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
        MiscEvent.addListener('keyPress:spacebar', this.selectOption.bind(this, objectIndex));
        MiscEvent.addListener('keyPress:enter', this.selectOption.bind(this, objectIndex));
        if (object.shapeElement) {
            MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), object.shapeElement);
        }
        if (object.containerElement) {
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);
        }

        object.hasRadioButtons = false;
        object.hasCheckBoxes = false;
        object.selectContainerElement = null;
        if (object.containerElement) {
            object.selectContainerElement = object.containerElement.querySelector('.ds44-select-container');
        }
        object.selectListElement = null;
        object.selectButtonElement = null;
        if (object.selectContainerElement) {
            object.selectListElement = object.selectContainerElement.querySelector('.ds44-listSelect');
            object.selectButtonElement = object.selectContainerElement.querySelector('.ds44-btnSelect');
        }
        if (object.selectListElement) {
            object.hasRadioButtons = !!object.selectListElement.querySelector('.ds44-select-list_elem input[type="radio"]');
            object.hasCheckBoxes = !!object.selectListElement.querySelector('.ds44-select-list_elem input[type="checkbox"]');

            object.selectListElement
                .querySelectorAll('.ds44-select-list_elem')
                .forEach((listElement) => {
                    MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), listElement);

                    if (
                        object.hasRadioButtons ||
                        object.hasCheckBoxes
                    ) {
                        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listElement.querySelector('input'));
                    }
                });
        }
        if (object.selectButtonElement) {
            MiscEvent.addListener('click', this.record.bind(this, objectIndex), object.selectButtonElement);
        }
    }

    getData(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return;
        }

        let data = {};
        data[object.name] = object.valueElement.value;

        return data;
    }

    showHide(objectIndex) {
        const object = this.objects[objectIndex];

        if (object.isExpanded === false) {
            this.show(objectIndex);

            return;
        }

        this.hide(objectIndex);
    }

    focusOut(objectIndex, evt) {
        const object = this.objects[objectIndex];
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

        this.hide(objectIndex);
    }

    show(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.buttonElement) {
            return;
        }
        if (!object.buttonIconElement) {
            return;
        }
        if (!object.buttonTextElement) {
            return;
        }
        if (!object.selectContainerElement) {
            return;
        }

        object.selectContainerElement.classList.remove('hidden');
        MiscAccessibility.show(object.selectContainerElement, true);
        object.buttonElement.setAttribute('aria-expanded', 'true');
        object.buttonIconElement.classList.remove('icon-down');
        object.buttonIconElement.classList.add('icon-up');
        object.buttonTextElement.innerText = object.buttonTextElement.innerText.replace('Ouvrir' , 'Fermer');
        object.isExpanded = true;

        this.nextOption(objectIndex);
    }

    hide(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.buttonElement) {
            return;
        }
        if (!object.buttonIconElement) {
            return;
        }
        if (!object.buttonTextElement) {
            return;
        }
        if (!object.selectContainerElement) {
            return;
        }

        object.selectContainerElement.classList.add('hidden');
        MiscAccessibility.hide(object.selectContainerElement, true);
        object.buttonElement.setAttribute('aria-expanded', 'false');
        object.buttonIconElement.classList.add('icon-down');
        object.buttonIconElement.classList.remove('icon-up');
        object.buttonTextElement.innerText = object.buttonTextElement.innerText.replace('Fermer' , 'Ouvrir');
        object.isExpanded = false;
    }

    nextOption(objectIndex, evt) {
        if(evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return;
        }

        if (object.isExpanded) {
            let firstListItemSelector = '.ds44-select-list_elem input';
            let selectedListItemSelector = '.ds44-select-list_elem input:focus';
            let lastListItemSelector = '.ds44-select-list_elem:last-child input';
            if (
                !object.hasRadioButtons &&
                !object.hasCheckBoxes
            ) {
                firstListItemSelector = '.ds44-select-list_elem';
                selectedListItemSelector = '.ds44-select-list_elem:focus';
                lastListItemSelector = '.ds44-select-list_elem:last-child';
            }

            const selectedListItem = object.selectListElement.querySelector(selectedListItemSelector);
            if (object.hasRadioButtons) {
                // Is radio button, don't mess with up and down keys
                if (!selectedListItem) {
                    // Select first
                    const firstListItem = object.selectListElement.querySelector(firstListItemSelector);
                    MiscAccessibility.setFocus(firstListItem);
                }
            } else {
                const lastListItem = object.selectListElement.querySelector(lastListItemSelector);
                if (
                    !selectedListItem ||
                    selectedListItem === lastListItem
                ) {
                    // Select first
                    MiscAccessibility.setFocus(object.selectListElement.querySelector(firstListItemSelector))
                } else {
                    // Select next
                    if (object.hasCheckBoxes) {
                        MiscAccessibility.setFocus(MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem')).querySelector('input'));
                    } else {
                        MiscAccessibility.setFocus(MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem')));
                    }
                }
            }
        }
    }

    previousOption(objectIndex, evt) {
        if(evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.containerElement) {
            return;
        }

        if (object.isExpanded) {
            let firstListItemSelector = '.ds44-select-list_elem:first-child input';
            let selectedListItemSelector = '.ds44-select-list_elem input:focus';
            let lastListItemSelector = '.ds44-select-list_elem:last-child input';
            if (
                !object.hasRadioButtons &&
                !object.hasCheckBoxes
            ) {
                firstListItemSelector = '.ds44-select-list_elem:first-child';
                selectedListItemSelector = '.ds44-select-list_elem:focus';
                lastListItemSelector = '.ds44-select-list_elem:last-child';
            }

            const selectedListItem = object.selectListElement.querySelector(selectedListItemSelector);
            if (object.hasRadioButtons) {
                // Is radio button, don't mess with up and down keys
                if (!selectedListItem) {
                    // Select last
                    const lastListItem = object.selectListElement.querySelector(lastListItemSelector);
                    MiscAccessibility.setFocus(lastListItem);
                }
            } else {
                const firstListItem = object.selectListElement.querySelector(firstListItemSelector);
                if (
                    !selectedListItem ||
                    selectedListItem === firstListItem
                ) {
                    // Select last
                    MiscAccessibility.setFocus(object.selectListElement.querySelector(lastListItemSelector))
                } else {
                    // Select previous
                    if (object.hasCheckBoxes) {
                        MiscAccessibility.setFocus(MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem')).querySelector('input'));
                    } else {
                        MiscAccessibility.setFocus(MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem')));
                    }
                }
            }
        }
    }

    selectOption(objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return;
        }

        if (
            !object.hasRadioButtons &&
            !object.hasCheckBoxes &&
            document.activeElement &&
            document.activeElement.classList.contains('ds44-select-list_elem') &&
            object.selectListElement.contains(document.activeElement)
        ) {
            MiscEvent.dispatch('mousedown', null, document.activeElement);
        }
    }

    select(objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.selectListElement) {
            return;
        }

        const currentItem = evt.currentTarget.closest('.ds44-select-list_elem');
        object.textElement.removeAttribute('aria-activedescendant');
        if (
            object.hasRadioButtons ||
            object.hasCheckBoxes
        ) {
            const currentListInputElement = currentItem.querySelector('input');

            object.selectListElement
                .querySelectorAll('.ds44-select-list_elem')
                .forEach((listElement) => {
                    let listInputElement = listElement.querySelector('input');
                    if (
                        (
                            evt.type === 'mousedown' &&
                            (
                                (
                                    listInputElement === currentListInputElement &&
                                    !listInputElement.checked
                                ) ||
                                (
                                    listInputElement !== currentListInputElement &&
                                    listInputElement.checked
                                )
                            )
                        ) ||
                        (
                            evt.type === 'change' &&
                            listInputElement.checked
                        )
                    ) {
                        listElement.classList.add('selected_option');
                        listElement.setAttribute('aria-selected', 'true');
                        listInputElement.setAttribute('aria-checked', 'true');
                    } else {
                        listElement.classList.remove('selected_option');
                        listElement.removeAttribute('aria-selected');
                        listInputElement.removeAttribute('aria-checked');
                    }
                });

            return;
        }

        const selectedListItem = object.selectListElement.querySelector('.selected_option');
        if (selectedListItem) {
            selectedListItem.classList.remove('selected_option');
            selectedListItem.removeAttribute('id');
            selectedListItem.removeAttribute('aria-selected');
            selectedListItem.removeAttribute('aria-checked');
        }
        currentItem.classList.add('selected_option');
        currentItem.setAttribute('aria-selected', 'true');
        currentItem.setAttribute('aria-checked', 'true');

        // Record click straight away as there is no validate button
        this.record(objectIndex);
    }

    record(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.buttonElement) {
            return;
        }
        if (!object.valueElement) {
            return;
        }
        if (!object.selectListElement) {
            return;
        }

        const values = [];
        const texts = [];
        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                if (object.hasRadioButtons || object.hasCheckBoxes) {
                    values.push(listElement.querySelector('input').getAttribute('value'));
                    texts.push(listElement.querySelector('label').innerText);
                } else {
                    values.push(listElement.getAttribute('data-value'));
                    texts.push(listElement.innerText);
                }
            });
        if (values.length === 0) {
            // No value
            object.valueElement.value = null;
            object.textElement.innerText = '';
            object.labelElement.classList.remove('ds44-moveSelectLabel');
        } else {
            object.valueElement.value = JSON.stringify(values);
            object.textElement.innerText = texts.join(', ');
            object.labelElement.classList.add('ds44-moveSelectLabel');
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);

        this.checkValidity(objectIndex);
    }

    checkValidity(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return;
        }
        if (!object.shapeElement) {
            return;
        }

        object.valueElement.removeAttribute('aria-invalid');
        object.valueElement.removeAttribute('aria-describedby');
        object.shapeElement.classList.remove('ds44-error');

        if (object.containerElement) {
            let elementError = object.containerElement.querySelector('.ds44-errorMsg-container');
            if (elementError) {
                elementError.remove();
            }
        }

        if (object.isRequired && !object.valueElement.value) {
            this.invalid(objectIndex);

            return false;
        }

        return true;
    }

    invalid(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.labelElement) {
            return;
        }
        if (!object.shapeElement) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();

        let errorElement = document.createElement('div');
        errorElement.classList.add('ds44-errorMsg-container');
        object.containerElement.appendChild(errorElement);

        let errorMessageElement = document.createElement('p');
        errorMessageElement.setAttribute('id', errorMessageElementId);
        errorMessageElement.classList.add('ds44-msgErrorText');
        errorMessageElement.classList.add('ds44-msgErrorInvalid');
        errorElement.appendChild(errorMessageElement);

        let errorIconElement = document.createElement('i');
        errorIconElement.classList.add('icon');
        errorIconElement.classList.add('icon-attention');
        errorIconElement.classList.add('icon--sizeM');
        errorIconElement.setAttribute('aria-hidden', 'true');
        errorMessageElement.appendChild(errorIconElement);

        let errorTextElement = document.createElement('span');
        errorTextElement.classList.add('ds44-iconInnerText');
        errorTextElement.innerHTML = this.formatErrorMessage(this.errorMessages['valueMissing'], object.labelElement);
        errorMessageElement.appendChild(errorTextElement);

        object.shapeElement.classList.add('ds44-error');
        object.valueElement.setAttribute('aria-invalid', 'true');
        object.valueElement.setAttribute('aria-describedby', errorMessageElementId);
    }
}

// Singleton
new FormSelect();
