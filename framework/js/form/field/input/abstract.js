class FormFieldInputAbstract extends FormFieldAbstract {
    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];

        object.textElement = element;
        object.valueElement = element;
        object.inputElements = [element];
        object.labelElement = MiscDom.getPreviousSibling(element, 'span.ds44-labelTypePlaceholder');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

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
        if (!object.textElement) {
            return;
        }
        if (object.textElement !== document.activeElement) {
            return;
        }

        this.showHideResetButton(objectIndex);
        this.enableDisableLinkedField(objectIndex);
    }

    empty (objectIndex) {
        super.empty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex) {
        this.empty(objectIndex);

        this.focusOnTextElement(objectIndex);
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];

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
        if (!object.resetButtonElement) {
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
        if (!object.valueElement) {
            return;
        }

        object.valueElement.value = ((data && data.value) ? data.value : null);
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object.textElement ||
            !object.textElement.value
        ) {
            return null;
        }

        return object.textElement.value;
    }

    isValid (inputElement) {
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

        return isValid;
    }

    isEmpty (objectIndex) {
        const object = this.objects[objectIndex];

        let isEmpty = !this.getText(objectIndex);
        object.inputElements.forEach((inputElement) => {
            isEmpty = (isEmpty && this.isValid(inputElement));
        });
        return isEmpty;
    }

    focusOnTextElement (objectIndex) {
        const object = this.objects[objectIndex];

        MiscAccessibility.setFocus(object.inputElements[0]);
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];

        if (!object.isEnabled) {
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

    removeInvalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        let elementError = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (elementError) {
            elementError.remove();
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
        object.textElement.classList.remove('ds44-error');

    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
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
