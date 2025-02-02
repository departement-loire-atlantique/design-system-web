class FormFieldSelectAbstract extends FormFieldAbstract {
    create (element) {
        this.labelClassName = 'ds44-moveSelectLabel';

        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        valueElement.setAttribute('name', element.hasAttribute("data-name") ? element.getAttribute("data-name") : element.getAttribute("id"));
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement = element;
        object.valueElement = valueElement;
        object.shapeElement = object.containerElement.querySelector('.ds44-select__shape');
        object.labelElement = object.containerElement.querySelector('.ds44-selectLabel');
        object.buttonElement = object.containerElement.querySelector('.ds44-btnOpen');
        object.buttonIconElement = object.containerElement.querySelector('.ds44-btnOpen .icon');
        object.buttonTextElement = object.containerElement.querySelector('.ds44-btnOpen .visually-hidden');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
        object.selectContainerElement = object.containerElement.querySelector('.ds44-select-container');
        object.selectListElement = null;
        object.selectButtonElement = null;
        if (object.selectContainerElement) {
            object.selectListElement = object.selectContainerElement.querySelector('.ds44-listSelect');
            object.selectButtonElement = object.selectContainerElement.querySelector('.ds44-btnSelect');
        }
        object.isExpanded = false;
        object.titleDefault = object.buttonElement.getAttribute("title");
        object.validationCategories = MiscForm.getValidationCategories();
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            if(!MiscComponent.isInit(object.element, "form-field")) {
                MiscComponent.create(object.element, "form-field")
            }

            MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowup', this.previousOption.bind(this, objectIndex));
            MiscEvent.addListener('keyUp:arrowdown', this.nextOption.bind(this, objectIndex));
            if (object.shapeElement) {
                MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), object.shapeElement);
            }
            MiscEvent.addListener('focusout', this.focusOut.bind(this, objectIndex), object.containerElement);
            MiscEvent.addListener('click', this.focusOut.bind(this, objectIndex), document.body);
            if (object.resetButtonElement) {
                MiscEvent.addListener('click', this.reset.bind(this, objectIndex), object.resetButtonElement);
            }

            if (object.selectListElement) {
                MiscEvent.addListener('form:validation', this.validation.bind(this, objectIndex), object.selectListElement);
                object.selectListElement
                    .querySelectorAll('.ds44-select-list_elem')
                    .forEach((listElement) => {
                        this.setListElementEvents(listElement, objectIndex);
                    });
            }
            if (object.selectButtonElement) {
                MiscEvent.addListener('click', this.record.bind(this, objectIndex), object.selectButtonElement);
            }

            this.quit(objectIndex);
            this.hide(objectIndex);
        }
    }

    validation (objectIndex, evt) {
        if (
            !evt ||
            !evt.detail ||
            evt.detail.category === undefined ||
            evt.detail.isValid === undefined
        ) {
            return;
        }

        // Mark the component category as answered
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let isFinished = true;
        object.validationCategories[evt.detail.category] = {
            'isValid': evt.detail.isValid,
            'data': evt.detail.data
        };
        for (let category in object.validationCategories) {
            if (!object.validationCategories.hasOwnProperty(category)) {
                continue;
            }

            if (object.validationCategories[category] === null) {
                isFinished = false;
                break;
            }
        }

        // All the component categories answered the call, we can carry on with the form validation
        if (isFinished) {
            const formValidity = MiscForm.checkValidity(object.validationCategories);
            if (formValidity.isValid) {
                this.save(objectIndex, formValidity.data);
            } else if (object.selectListElement) {
                const firstErrorField = object.selectListElement.querySelector('[aria-invalid="true"]');
                if (firstErrorField) {
                    this.setFocus(objectIndex, firstErrorField);
                }
            }
        }
    }

    empty (objectIndex) {
        super.empty(objectIndex);

        this.quit(objectIndex);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex, evt) {
        if (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        this.empty(objectIndex);
        this.focusOnButtonElement(objectIndex);
        this.autoSubmit(objectIndex);
    }

    focusOnButtonElement (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        this.setFocus(objectIndex, object.buttonElement);
    }

    setListElementEvents (listElement, objectIndex) {
        MiscEvent.addListener('mousedown', this.select.bind(this, objectIndex), listElement);
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.shapeElement ||
            !object.buttonElement
        ) {
            return;
        }

        object.shapeElement.classList.remove('ds44-inputDisabled');
        object.buttonElement.removeAttribute('aria-disabled');

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

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.labelElement ||
            !object.shapeElement ||
            !object.buttonElement ||
            !object.selectListElement
        ) {
            return;
        }

        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                listElement.classList.remove('.selected_option');
            });

        object.shapeElement.classList.add('ds44-inputDisabled');
        object.buttonElement.setAttribute('aria-disabled', 'true');

        this.quit(objectIndex);
        this.hide(objectIndex);
        this.showHideResetButton(objectIndex);
    }

    showHideResetButton (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.resetButtonElement) {
            return;
        }

        if (!this.getData(objectIndex)) {
            // Hide reset button
            object.resetButtonElement.style.display = 'none';
        } else {
            // Hide reset button
            object.resetButtonElement.style.display = 'block';
        }
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.valueElement ||
            !object.textElement ||
            !object.buttonElement
        ) {
            return;
        }

        let value = ((data && data.value) ? data.value : null);
        if (
            value &&
            typeof value === 'object'
        ) {
            value = JSON.stringify(value);
        }
        object.valueElement.value = value;
        object.textElement.innerHTML = ((data && data.text) ? '<p>' + data.text + '</p>' : null);

        if (value) {
            object.buttonElement.setAttribute('aria-describedby', object.textElement.getAttribute('id'));
        } else {
            object.buttonElement.removeAttribute('aria-describedby');
        }

        this.selectFromValue(objectIndex);
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
            'text': object.textElement.innerText
        };

        return MiscUtils.merge(data, extendedData);
    }

    showHide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (!object.isExpanded) {
            this.show(objectIndex);

            return;
        }

        this.hide(objectIndex);
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

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

    show (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.shapeElement ||
            !object.buttonElement ||
            !object.buttonIconElement ||
            !object.buttonTextElement ||
            !object.selectContainerElement
        ) {
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

        this.selectAfterShow(objectIndex);
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.buttonElement ||
            !object.buttonIconElement ||
            !object.buttonTextElement ||
            !object.selectContainerElement
        ) {
            return;
        }

        object.selectContainerElement.classList.add('hidden');
        MiscAccessibility.hide(object.selectContainerElement);
        object.buttonElement.setAttribute('aria-expanded', 'false');
        object.buttonIconElement.classList.add('icon-down');
        object.buttonIconElement.classList.remove('icon-up');
        object.isExpanded = false;

        this.selectAfterHide(objectIndex);
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement)
        ) {
            return;
        }

        this.focusOnButtonElement(objectIndex);
        this.hide(objectIndex);
    }

    autoComplete (objectIndex, parameters) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        let url = object.textElement.getAttribute('data-url');
        if (url.includes('$parentValue')) {
            url = url.replace('$parentValue', object.parentValue);
        }
        let urlParameters = null;
        if (parameters) {
            const objectData = parameters[Object.keys(parameters)[0]];
            if (objectData) {
                urlParameters = (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(objectData.value);
            }
        }

        MiscRequest.send(
            url + urlParameters,
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
            !object.selectListElement ||
            !object.selectContainerElement
        ) {
            return;
        }

        let subSelectListElement = object.selectListElement.querySelector('.ds44-list');
        if(object.selectListElement.classList.contains("ds44-collapser"))
        {
            subSelectListElement = object.selectListElement;
        }

        if (!subSelectListElement) {
            return;
        }

        object.textElement.removeAttribute('aria-activedescendant');
        Array.from(subSelectListElement.children).map((childElement) => {
            childElement.remove();
        });
        subSelectListElement.innerHTML = "";

        if (Object.keys(results).length === 0) {
            // No result
            let elementSelectListItem = document.createElement('li');
            elementSelectListItem.classList.add('ds44-select-list_no_elem');
            elementSelectListItem.innerHTML = MiscTranslate._('NO_RESULTS_FOUND');
            subSelectListElement.appendChild(elementSelectListItem);
        } else {
            // Some result
            for (let key in results) {
                if (!results.hasOwnProperty(key)) {
                    continue;
                }

                let elementSelectListItem = this.getListElement(object, (results[key].id || key), results[key].value,  results[key].children !== undefined ? results[key].children : null, objectIndex);
                subSelectListElement.appendChild(elementSelectListItem);

                this.setListElementEvents(elementSelectListItem, objectIndex);
            }
        }
        let collapser = new CollapserStandard();
        this.selectFromValue(objectIndex);
        MiscAccessibility.hide(object.selectContainerElement);
    }

    getListElement (object, key, value) {
        let elementSelectListItem = document.createElement('li');
        elementSelectListItem.classList.add('ds44-select-list_elem');
        elementSelectListItem.setAttribute('role', 'option');
        elementSelectListItem.setAttribute('data-text', value);
        elementSelectListItem.setAttribute('data-value', key);
        elementSelectListItem.setAttribute('tabindex', '0');
        elementSelectListItem.innerHTML = value;

        return elementSelectListItem;
    }

    nextOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.selectListElement ||
            !object.isExpanded
        ) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.last
        ) {
            // Select first
            this.setFocus(objectIndex, listItems.first)
        } else {
            // Select next
            this.setFocus(objectIndex, listItems.next);
        }
    }

    previousOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object || !object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (
            !listItems.selected ||
            listItems.selected === listItems.first
        ) {
            // Select last
            this.setFocus(objectIndex, listItems.last)
        } else {
            // Select previous
            this.setFocus(objectIndex, listItems.previous);
        }
    }

    getListItems (parentElement) {
        // Abstract method
    }

    select (objectIndex, evt) {
        // Abstract method
    }

    selectFromValue (objectIndex) {
        // Abstract method
    }

    selectAfterShow (objectIndex) {
        this.nextOption(objectIndex);
    }

    selectAfterHide (objectIndex) {
        // Abstract method
    }

    getDomData (listElement) {
        // Abstract method
    }

    setFocus (objectIndex, element) {
        MiscAccessibility.setFocus(element);
    }

    record (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return;
        }

        // Check sub child elements validity
        object.validationCategories = MiscForm.getValidationCategories();
        if (object.selectListElement.querySelector('.ds44-select-list_elem_child:not(.hidden)')) {
            MiscEvent.dispatch('form:validate', { 'formElement': object.selectListElement });

            return;
        }

        this.save(objectIndex);
    }

    save (objectIndex, additionalData) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.valueElement ||
            !object.selectListElement
        ) {
            return;
        }

        const values = [];
        const texts = [];
        object.selectListElement
            .querySelectorAll('.selected_option')
            .forEach((listElement) => {
                const domData = this.getDomData(listElement);

                const text = [];
                let isFound = false;
                if (additionalData) {
                    for (let additionalDataKey in additionalData) {
                        if (!additionalData.hasOwnProperty(additionalDataKey)) {
                            continue;
                        }

                        const additionalElement = object.selectListElement.querySelector('[name="' + additionalDataKey + '"], [data-name="' + additionalDataKey + '"]');
                        if (listElement.contains(additionalElement)) {
                            let value = {};
                            value[additionalDataKey] = additionalData[additionalDataKey];
                            values.push(value);

                            let labelText = value[additionalDataKey].text;
                            const additionalLabelElement = MiscDom.getPreviousSibling(additionalElement, 'label');
                            if (additionalLabelElement) {
                                labelText = additionalLabelElement.innerText.replace(/\*$/, '')
                            }
                            if (text.length > 0) {
                                text.push(labelText.toLowerCase() + ' ' + this.formatValue(value[additionalDataKey].value));
                            } else {
                                text.push(labelText + ' ' + this.formatValue(value[additionalDataKey].value));
                            }

                            isFound = true;
                        }
                    }
                }
                if (!isFound) {
                    values.push(domData.value);
                }

                texts.push(domData.text + (text.length > 0 ? ' : ' + text.join(' ') : ''));
            });
        if (values.length === 0) {
            // No value
            this.empty(objectIndex);
        } else {
            let formattedValue = null;
            if (values.length === 1) {
                if (typeof values[0] === 'object') {
                    formattedValue = JSON.stringify(values[0]);
                } else {
                    formattedValue = values[0];
                }
            } else {
                let isJson = true;
                let formattedJson = {};
                for (let valueKey in values) {
                    if (!values.hasOwnProperty(valueKey)) {
                        continue;
                    }

                    if (typeof values[valueKey] !== 'object') {
                        isJson = false;
                        break;
                    }

                    formattedJson = Object.assign(formattedJson, values[valueKey]);
                }
                if (isJson) {
                    formattedValue = JSON.stringify(formattedJson);
                } else {
                    formattedValue = JSON.stringify(values);
                }
            }
            this.setData(
                objectIndex,
                {
                    'value': formattedValue,
                    'text': texts.join(', '),
                }
            );
            this.enter(objectIndex);
        }

        this.focusOnButtonElement(objectIndex);
        this.hide(objectIndex);
        this.checkValidity(objectIndex);
        this.showNotEmpty(objectIndex);
        this.autoSubmit(objectIndex);
    }

    autoSubmit (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.textElement.getAttribute('data-auto-submit')) {
            // Auto submit
            const formElement = object.textElement.closest('form');
            if (formElement) {
                MiscEvent.dispatch('submit', null, formElement);
            }
        }
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.buttonElement) {
            object.buttonElement.removeAttribute('aria-invalid');
        }
        if (!object.shapeElement) {
            object.shapeElement.classList.remove('ds44-error');
        }
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.buttonElement ||
            !object.shapeElement
        ) {
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

    formatValue (value) {
        if (
            typeof value == 'string' &&
            value.match(/^(19|20)\d\d([- /.])(0?[1-9]|1[012])\2(0?[1-9]|[12][0-9]|3[01])$/)
        ) {
            // Date
            const dateArray = value.split('-');
            value = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
        }

        return value;
    }
}
