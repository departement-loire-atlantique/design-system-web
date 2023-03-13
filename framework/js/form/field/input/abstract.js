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
        object.iconButton = null;
        object.labelElement = MiscDom.getPreviousSibling(element, 'label');
        object.resetButtonElement = MiscDom.getNextSibling(element, '.ds44-reset');
        object.showPasswordButton = MiscDom.getNextSibling(element, ".ds44-showPassword");

        if(object.element.dataset.fieldCompare)
        {
            let fieldCompare = document.querySelector(object.element.dataset.fieldCompare);
            if(fieldCompare) {
                object.fieldCompare = {
                    "element":  fieldCompare,
                    "label":    MiscDom.getPreviousSibling(fieldCompare, 'label'),
                    "error":    false
                };
            }
        }
        let fieldsToCompare = document.querySelectorAll("*[data-field-compare='#"+element.getAttribute("id")+"']");
        if(fieldsToCompare) {
            object.fieldsToCompare = fieldsToCompare;
        }

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
            MiscEvent.addListener('field:check-value', this.checkValue.bind(this, objectIndex), object.textElement);

            if (object.resetButtonElement) {
                MiscEvent.addListener('click', ()=>{
                    MiscEvent.dispatch("field:reset", {}, object.textElement);
                }, object.resetButtonElement);
            }
            if (object.labelElement) {
                MiscEvent.addListener('click', this.focusOnTextElement.bind(this, objectIndex), object.labelElement);
            }
            if(object.iconButton) {
                MiscEvent.addListener('click', () => {
                    object.valueElement.click();
                }, object.iconButton);
            }
            if(object.showPasswordButton) {
                MiscEvent.addListener('click', this.tooglePasswordField.bind(this, objectIndex), object.showPasswordButton);
            }
            this.quit(objectIndex);

            let currentFocus = document.activeElement;
            console.log(currentFocus);
            object.textElement.focus();
            console.log(object.textElement);
            currentFocus.focus();
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
        this.checkValue(objectIndex);
        this.toggleContainerByValue(objectIndex, object.element.value);
        this.showNotEmpty(objectIndex);
    }

    checkValue(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if(object.fieldCompare) {
            if(object.fieldCompare.element.value !== null && object.fieldCompare.element.value !== object.element.value) {
                object.fieldCompare.error = true;
                this.invalid(objectIndex);
            }
            else {
                object.fieldCompare.error = false;
                this.removeInvalid(objectIndex);
            }
        }
        if(object.fieldsToCompare.length > 0) {
            object.fieldsToCompare.forEach((element) => {
                MiscEvent.dispatch("field:check-value", {}, element);
            });
        }

    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        this.showHideResetButton(objectIndex);
    }

    reset (objectIndex, evt) {
        this.empty(objectIndex);

        if(evt.detail.focus === undefined || evt.detail.focus !== false)
        {
            this.focusOnTextElement(objectIndex);
        }
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

        if(object.fieldCompare && object.fieldCompare.error) {
            let pattern = {
                "fieldNameCompare": object.fieldCompare.label.innerText.replace(/\*$/, '')
            }
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_COMPARE', pattern);
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

    tooglePasswordField(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.textElement) {
            return;
        }
        let icon = object.showPasswordButton.querySelector(".icon");
        let iconShow = "icon-visuel";
        let iconHide = "icon-handicap-visuel";

        let entitled = object.showPasswordButton.querySelector(".visually-hidden");
        let entitledShow = MiscTranslate._('FIELD_PASSWORD_VIEW')+" : "+object.labelElement.textContent.replace("*", "");
        let entitledHide = MiscTranslate._('FIELD_PASSWORD_NOT_VIEW')+" : "+object.labelElement.textContent.replace("*", "");

        if(object.showPasswordButton.classList.contains("show")) {
            object.showPasswordButton.classList.remove("show");
            object.inputElements[0].type = "password";
            object.inputElements[0].setAttribute("aria-hidden", true);
            if(icon) {
                icon.classList.remove(iconHide);
                icon.classList.add(iconShow);
            }
            if(entitled) {
                entitled.innerText = entitledHide;
            }
        }
        else {
            object.showPasswordButton.classList.add("show");
            object.inputElements[0].removeAttribute("aria-hidden");
            object.inputElements[0].type = "text";
            if(icon) {
                icon.classList.add(iconHide);
                icon.classList.remove(iconShow);
            }
            if(entitled) {
                entitled.innerText = entitledShow;
            }
        }
        this.showNotEmpty(objectIndex);
    }
}
