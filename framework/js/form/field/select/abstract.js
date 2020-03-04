class FormFieldSelectAbstract extends FormFieldAbstract {
    create(element) {
        this.labelClassName = 'ds44-moveSelectLabel';

        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.textElement = element;
        object.valueElement = valueElement;
        object.shapeElement = object.containerElement.querySelector('.ds44-select__shape');
        object.labelElement = object.containerElement.querySelector('.ds44-selectLabel');
        object.buttonElement = object.containerElement.querySelector('.ds44-btnOpen');
        object.buttonIconElement = object.containerElement.querySelector('.ds44-btnOpen .icon');
        object.buttonTextElement = object.containerElement.querySelector('.ds44-btnOpen .visually-hidden');
        object.isExpanded = false;

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
        MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
        if (object.shapeElement) {
            MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), object.shapeElement);
        }
        MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);
        MiscEvent.addListener('click', this.focusOut.bind(this, objectIndex), document.body);

        object.selectContainerElement = object.containerElement.querySelector('.ds44-select-container');
        object.selectListElement = null;
        object.selectButtonElement = null;
        if (object.selectContainerElement) {
            object.selectListElement = object.selectContainerElement.querySelector('.ds44-listSelect');
            object.selectButtonElement = object.selectContainerElement.querySelector('.ds44-btnSelect');
        }
        if (object.selectListElement) {
            object.selectListElement
                .querySelectorAll('.ds44-select-list_elem')
                .forEach((listElement) => {
                    this.setListElementEvents(listElement, objectIndex);
                });
        }
        if (object.selectButtonElement) {
            MiscEvent.addListener('click', this.record.bind(this, objectIndex), object.selectButtonElement);
        }

        if (object.labelElement) {
            object.labelElement.classList.remove(this.labelClassName);
        }
        this.hide(objectIndex);
    }

    empty(objectIndex) {
        super.empty(objectIndex);

        const object = this.objects[objectIndex];
        if (object.labelElement) {
            object.labelElement.classList.remove(this.labelClassName);
        }
    }

    setListElementEvents(listElement, objectIndex) {
        MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), listElement);
    }

    enableElements(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.shapeElement) {
            return;
        }
        if (!object.buttonElement) {
            return;
        }

        object.shapeElement.classList.remove('ds44-inputDisabled');
        object.buttonElement.removeAttribute('readonly');
        object.buttonElement.removeAttribute('aria-readonly');

        if (object.textElement.getAttribute('data-url')) {
            let autoCompleteParameters = null;
            if (
                evt &&
                evt.detail &&
                evt.detail.data
            ) {
                autoCompleteParameters = evt.detail.data;
            }
            this.autoComplete(objectIndex, autoCompleteParameters);
        }
    }

    disableElements(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.labelElement) {
            return;
        }
        if (!object.shapeElement) {
            return;
        }
        if (!object.buttonElement) {
            return;
        }
        if (!object.selectListElement) {
            return;
        }

        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                listElement.classList.remove('.selected_option');
            });

        object.shapeElement.classList.add('ds44-inputDisabled');
        object.buttonElement.setAttribute('readonly', 'true');
        object.buttonElement.setAttribute('aria-readonly', 'true');
        object.labelElement.classList.remove(this.labelClassName);

        this.hide(objectIndex);
    }

    setData(objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return;
        }
        if (!object.textElement) {
            return;
        }
        if (!object.buttonElement) {
            return;
        }

        object.valueElement.value = ((data && data.value) ? data.value : null);
        object.textElement.innerHTML = ((data && data.text) ? '<p>' + data.text + '</p>' : null);

        if (object.valueElement.value) {
            object.buttonElement.setAttribute('aria-describedby', object.textElement.getAttribute('id'));
        } else {
            object.buttonElement.removeAttribute('aria-describedby');
        }
    }

    showHide(objectIndex) {
        const object = this.objects[objectIndex];

        if (!object.isExpanded) {
            this.show(objectIndex);

            return;
        }

        this.hide(objectIndex);
    }

    focusOut(objectIndex, evt) {
        const object = this.objects[objectIndex];

        if (
            !evt ||
            (
                evt.type === 'focusout' &&
                (
                    !object.containerElement.contains(evt.target) ||
                    !evt.relatedTarget ||
                    object.containerElement.contains(evt.relatedTarget)
                )
            ) ||
            (
                evt.type === 'click' &&
                object.containerElement.contains(evt.target)
            )
        ) {
            return;
        }

        this.hide(objectIndex);
    }

    show(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.shapeElement) {
            return;
        }
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

        if (!object.isEnabled) {
            // Don't show if disabled
            if (evt) {
                evt.stopPropagation();
                evt.preventDefault();
            }

            return;
        }

        object.selectContainerElement.classList.remove('hidden');
        MiscAccessibility.show(object.selectContainerElement);
        object.buttonElement.setAttribute('aria-expanded', 'true');
        object.buttonIconElement.classList.remove('icon-down');
        object.buttonIconElement.classList.add('icon-up');
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
        MiscAccessibility.hide(object.selectContainerElement);
        object.buttonElement.setAttribute('aria-expanded', 'false');
        object.buttonIconElement.classList.add('icon-down');
        object.buttonIconElement.classList.remove('icon-up');
        object.isExpanded = false;
    }

    escape(objectIndex) {
        const object = this.objects[objectIndex];

        if (
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement)
        ) {
            return;
        }

        if (!object.buttonElement) {
            return;
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);
    }

    autoComplete(objectIndex, parameters) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        const url = object.textElement.getAttribute('data-url');
        let urlParameters = null;
        if (parameters) {
            const formData = MiscForm.jsonToFormData(parameters);
            urlParameters = (url.includes('?') ? '&' : '?') + new URLSearchParams(formData).toString()
        }

        MiscRequest.send(
            url + urlParameters,
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
        if (!object.selectListElement) {
            return;
        }
        if (!object.selectContainerElement) {
            return;
        }
        const subSelectListElement = object.selectListElement.querySelector('.ds44-list');
        if (!subSelectListElement) {
            return;
        }

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(subSelectListElement.children).map((childElement) => {
            childElement.remove();
        });

        if (Object.keys(results).length === 0) {
            // No result
            let elementSelectListItem = document.createElement('li');
            elementSelectListItem.classList.add('ds44-select-list_no_elem');
            elementSelectListItem.innerHTML = 'Aucun résultat trouvé';
            subSelectListElement.appendChild(elementSelectListItem);
        } else {
            // Some result
            for (let key in results) {
                let elementSelectListItem = this.getListElement(object, key, results[key]);
                subSelectListElement.appendChild(elementSelectListItem);

                this.setListElementEvents(elementSelectListItem, objectIndex);
            }
        }

        MiscAccessibility.hide(object.selectContainerElement);
    }

    getListElement(object, key, value) {
        let elementSelectListItem = document.createElement('li');
        elementSelectListItem.classList.add('ds44-select-list_elem');
        elementSelectListItem.setAttribute('role', 'option');
        elementSelectListItem.setAttribute('data-text', value);
        elementSelectListItem.setAttribute('data-value', key);
        elementSelectListItem.setAttribute('tabindex', '0');
        elementSelectListItem.innerHTML = value;

        return elementSelectListItem;
    }

    nextOption(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return;
        }
        if (!object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.last
        ) {
            // Select first
            MiscAccessibility.setFocus(listItems.first)
        } else {
            // Select next
            MiscAccessibility.setFocus(listItems.next);
        }
    }

    previousOption(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.first
        ) {
            // Select last
            MiscAccessibility.setFocus(listItems.last)
        } else {
            // Select previous
            MiscAccessibility.setFocus(listItems.previous);
        }
    }

    getListItems(parentElement) {
        // Abstract method
    }

    select(objectIndex, evt) {
        // Abstract method
    }

    getDomData(listElement) {
        // Abstract method
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
                const domData = this.getDomData(listElement);
                values.push(domData.value);
                texts.push(domData.text);
            });
        if (values.length === 0) {
            // No value
            this.empty(objectIndex);
        } else {
            this.setData(
                objectIndex,
                {
                    'value': JSON.stringify(values),
                    'text': texts.join(', '),
                }
            );
            object.labelElement.classList.add(this.labelClassName);
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);
        this.checkValidity(objectIndex);
        this.enableDisableLinkedField(objectIndex);

        if (object.textElement.getAttribute('data-auto-submit')) {
            // Auto submit
            const formElement = object.textElement.closest('form');
            if (formElement) {
                MiscEvent.dispatch('submit', null, formElement);
            }
        }
    }

    removeInvalid(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return;
        }
        if (!object.shapeElement) {
            return;
        }

        let elementError = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (elementError) {
            elementError.remove();
        }

        object.buttonElement.removeAttribute('aria-invalid');
        object.shapeElement.classList.remove('ds44-error');
    }

    invalid(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.buttonElement) {
            return;
        }
        if (!object.shapeElement) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();
        this.showErrorMessage(objectIndex, errorMessageElementId);

        object.buttonElement.setAttribute('aria-invalid', 'true');
        object.shapeElement.classList.add('ds44-error');

        if (!this.getData(objectIndex)) {
            object.buttonElement.setAttribute('aria-describedby', errorMessageElementId);
        } else {
            object.buttonElement.setAttribute('aria-describedby', errorMessageElementId + ' ' + object.textElement.getAttribute('id'));
        }
    }
}
