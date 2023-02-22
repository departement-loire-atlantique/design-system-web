class FormFieldBoxAbstract extends FormFieldAbstract {
    constructor (className, category) {
        super(
          className,
            '.ds44-form__' + category + '_container',
            category
        );

        this.errorMessage = 'FIELD_BOX_MANDATORY_ERROR_MESSAGE';
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements = element.querySelectorAll('input[type="' + this.category + '"]');
        object.inputElements.forEach((input) => {
            MiscEvent.addListener("change", this.changeValue.bind(this, objectIndex, input), input);
        });
    }

    initialize () {
        super.initialize();
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubInitialized) {
                continue;
            }
            object.isSubInitialized = true;
            object.autoSubmit = false;
            object.inputElements.forEach((inputElement) => {
                if(inputElement.dataset.autoSubmit !== undefined) {
                    object.autoSubmit = true;
                }
                if(inputElement.checked) {
                    this.toggleContainer(inputElement);
                }
                MiscEvent.addListener('click', this.toggleCheck.bind(this, objectIndex), inputElement);
            });
        }
    }

    enableElements (objectIndex, evt) {
        super.enableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.removeAttribute('aria-disabled');
        });
        object.containerElement.classList.remove('ds44-inputDisabled');
    }

    disableElements (objectIndex, evt) {
        super.disableElements(objectIndex, evt);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            inputElement.setAttribute('aria-disabled', 'true');
        });
        object.containerElement.classList.add('ds44-inputDisabled');
    }

    toggleCheck (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.isEnabled) {
            evt.stopPropagation();
            evt.preventDefault();

            return;
        }

        if(object.autoSubmit) {
            Debug.log(object);
            MiscEvent.dispatch('submit', {}, object.containerElement.closest("form"));
        }


        this.showNotEmpty(objectIndex);
    }

    changeValue(objectIndex, input, evt) {
        const object = this.objects[objectIndex];
        if (!object || !object.isEnabled) {
            evt.stopPropagation();
            evt.preventDefault();

            return;
        }
        if(input.checked)
        {
            object.inputElements.forEach((inputElement) => {
                if(inputElement !== input) {
                    this.toggleContainer(inputElement);
                }
            });
            this.toggleContainer(input);
        }
        else
        {
            this.toggleContainer(input);
            object.inputElements.forEach((inputElement) => {
                if(inputElement !== input) {
                    this.toggleContainer(inputElement);
                }
            });
        }
    }

    setData (objectIndex, data = null) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            if (
                data &&
                data.value &&
                data.value.includes(inputElement.value)
            ) {
                inputElement.checked = true;
            } else {
                inputElement.checked = false;
            }
        });
    }

    getData (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const inputElementValues = [];
        const inputElementTexts = [];
        object.inputElements.forEach((inputElement) => {
            if (inputElement.checked) {
                inputElementValues.push(inputElement.value);
                inputElementTexts.push(MiscDom.getNextSibling(inputElement).innerText);
            }
        });
        if (inputElementValues.length === 0) {
            return null;
        }

        let data = {};
        data[object.name] = {
            'value': inputElementValues,
            'text': inputElementTexts.join(', '),
            'position': object.position
        };

        return data;
    }

    removeInvalid (objectIndex) {
        super.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.inputElements.forEach((inputElement) => {
            const defaultAriaDescribedBy = inputElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                inputElement.removeAttribute('aria-describedby');
            } else {
                inputElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
            inputElement.removeAttribute('aria-invalid');
            inputElement.classList.remove('ds44-boxError');
        });
    }

    invalid (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
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
            inputElement.classList.add('ds44-boxError');
        });
    }
}
