class FormFieldInputAbstract extends FormFieldAbstract {
    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement = element;
        object.valueElement = element;
        object.inputElements = [element];
        object.labelElement = MiscDom.getPreviousSibling(element, 'label');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;

            MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('invalid', this.invalid.bind(this, objectIndex), object.textElement);
            MiscEvent.addListener('keyUp:*', this.write.bind(this, objectIndex));
            if (object.resetButtonElement) {
                MiscEvent.addListener('click', this.reset.bind(this, objectIndex), object.resetButtonElement);
            }
            if (object.labelElement) {
                MiscEvent.addListener('click', this.focusOnTextElement.bind(this, objectIndex), object.labelElement);
            }
            this.quit(objectIndex);
        }
    }

    write (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            object.textElement !== document.activeElement
        ) {
            return;
        }

        this.showNotEmpty(objectIndex);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex) {
        this.empty(objectIndex);

        this.focusOnTextElement(objectIndex);
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.removeAttribute('readonly');
            inputElement.removeAttribute('aria-readonly');
        });
        if (object.labelElement && object.labelElement.closest('label')) {
            object.labelElement.closest('label').classList.remove('ds44-inputDisabled');
        }
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.setAttribute('readonly', 'true');
            inputElement.setAttribute('aria-readonly', 'true');
        });
        if (object.labelElement && object.labelElement.closest('label')) {
            object.labelElement.closest('label').classList.add('ds44-inputDisabled');
        }

        this.blur(objectIndex);
        this.showHideResetButton(objectIndex);
    }

    showHideResetButton (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.resetButtonElement) {
            return;
        }

        if (!this.getText(objectIndex)) {
            // Hide reset button
            object.resetButtonElement.style.display = 'none';
        } else {
            // Hide reset button
            object.resetButtonElement.style.display = 'block';
        }
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (!object || !object.valueElement) {
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
            'text': object.valueElement.value
        };

        return MiscUtils.merge(data, extendedData);
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.textElement.value
        ) {
            return null;
        }

        return object.textElement.value;
    }

    isEmpty (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return true;
        }

        let isEmpty = !this.getText(objectIndex);
        if (isEmpty) {
            object.inputElements.forEach((inputElement) => {
                let isValid = true;
                const validityStates = inputElement.validity;
                for (let key in validityStates) {
                    if (!validityStates.hasOwnProperty(key)) {
                        continue;
                    }

                    if (
                        key !== 'valid' &&
                        key !== 'valueMissing' &&
                        validityStates[key]
                    ) {
                        isValid = false;
                        break;
                    }
                }

                isEmpty = (isEmpty && isValid);
            });
        }

        return isEmpty;
    }

    focusOnTextElement (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        MiscAccessibility.setFocus(object.inputElements[0]);
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.isEnabled) {
            return;
        }

        this.enter(objectIndex);
    }

    blur (objectIndex) {
        if (!this.isEmpty(objectIndex)) {
            return;
        }

        this.quit(objectIndex);
    }

    getErrorMessage (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return this.formatErrorMessage(objectIndex);
        }

        const data = this.getData(objectIndex);
        if (!data) {
            return this.formatErrorMessage(objectIndex);
        }

        const autocomplete = object.textElement.getAttribute('autocomplete');
        if (
            autocomplete === 'email' &&
            !MiscForm.isEmail(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_EMAIL_MESSAGE');
        }
        if (
            autocomplete === 'tel-national' &&
            !MiscForm.isPhone(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_PHONE_MESSAGE');
        }
        if (
            autocomplete === 'postal-code' &&
            !MiscForm.isPostcode(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_POSTCODE_MESSAGE');
        }

        const inputMode = object.textElement.getAttribute('inputmode');
        if (
            inputMode === 'numeric' &&
            !MiscForm.isNumber(data[object.name].value)
        ) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_NUMBER_MESSAGE');
        }

        return this.formatErrorMessage(objectIndex);
    }

    checkFormat (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return true;
        }

        const data = this.getData(objectIndex);
        if (!data) {
            return true;
        }

        const autocomplete = object.textElement.getAttribute('autocomplete');
        if (
            autocomplete === 'email' &&
            !MiscForm.isEmail(data[object.name].value)
        ) {
            return false;
        }
        if (
            autocomplete === 'tel-national' &&
            !MiscForm.isPhone(data[object.name].value)
        ) {
            return false;
        }
        if (
            autocomplete === 'postal-code' &&
            !MiscForm.isPostcode(data[object.name].value)
        ) {
            return false;
        }

        const inputMode = object.textElement.getAttribute('inputmode');
        if (
            inputMode === 'numeric' &&
            !MiscForm.isNumber(data[object.name].value)
        ) {
            return false;
        }

        return true;
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.textElement) {
            object.textElement.classList.remove('ds44-error');
        }

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.removeAttribute('aria-describedby');
            } else {
                inputElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
            inputElement.removeAttribute('aria-invalid');
        });
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }

        const errorMessageElementId = MiscUtils.generateId();
        this.showErrorMessage(objectIndex, errorMessageElementId);

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.setAttribute('aria-describedby', errorMessageElementId);
            } else {
                inputElement.setAttribute('aria-describedby', errorMessageElementId + ' ' + defaultAriaDescribedBy);
            }
            inputElement.setAttribute('aria-invalid', 'true');
        });
        object.textElement.classList.add('ds44-error');
    }
}
