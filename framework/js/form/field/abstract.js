class FormFieldAbstract {
    constructor(selector, category) {
        this.category = category;
        this.objects = [];
        this.labelClassName = 'ds44-moveLabel';
        this.errorMessage = 'Veuillez renseigner : {fieldName}';

        if (typeof selector === 'object') {
            // Elements passed as parameter, not text selector
            selector
                .forEach((element) => {
                    this.create(element);
                });
        } else {
            document
                .querySelectorAll(selector)
                .forEach((element) => {
                    this.create(element);
                });
        }

        MiscEvent.addListener('form:validate', this.validate.bind(this));
    }

    create(element) {
        const object = {
            'id': MiscUtils.generateId(),
            'name': element.getAttribute('id'),
            'containerElement': (element.closest('.ds44-form__container') || element),
            'isRequired': (element.getAttribute('required') !== null || element.getAttribute('data-required') === 'true'),
            'isEnabled': !(element.getAttribute('readonly') !== null || element.getAttribute('data-disabled') === 'true')
        };
        element.removeAttribute('data-required');
        element.removeAttribute('data-disabled');

        const valuesAllowed = element.getAttribute('data-values');
        if (valuesAllowed) {
            object.valuesAllowed = JSON.parse(valuesAllowed);
        }
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        MiscEvent.addListener('field:enable', this.enable.bind(this, objectIndex), object.containerElement);
        MiscEvent.addListener('field:disable', this.disable.bind(this, objectIndex), object.containerElement);
    }

    empty(objectIndex) {
        this.setData(objectIndex);
        this.enableDisableLinkedField(objectIndex);
    }

    setData(objectIndex, data = null) {
        // Abstract method
    }

    getData(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.valueElement) {
            return null;
        }

        if (!object.valueElement.value) {
            return null;
        }

        let data = {};
        data[object.name] = object.valueElement.value;

        return data;
    }

    enableDisableLinkedField(objectIndex) {
        const object = this.objects[objectIndex];

        const linkedFieldsContainerElement = object.containerElement.closest('.ds44-champsLies');
        if (!linkedFieldsContainerElement) {
            return;
        }

        const secondLinkedFieldElement = MiscDom.getNextSibling(object.containerElement);
        if (
            !secondLinkedFieldElement ||
            secondLinkedFieldElement === object.containerElement
        ) {
            return;
        }

        // Has a linked field
        let data = this.getData(objectIndex);
        if (
            !data ||
            (
                data[object.name] &&
                data[object.name].metadata &&
                data[object.name].metadata.hasLinkedField === false
            )
        ) {
            // Disable linked field
            MiscEvent.dispatch('field:disable', null, secondLinkedFieldElement);
        } else {
            // Enabled linked field
            try {
                // Try if it is JSON
                data = JSON.parse(data);
            } catch (ex) {
            }
            MiscEvent.dispatch('field:enable', {'data': data}, secondLinkedFieldElement);
        }
    }

    enable(objectIndex, evt) {
        if (!this.isEnableAllowed(objectIndex, evt)) {
            this.disable(objectIndex);

            return;
        }

        const object = this.objects[objectIndex];

        object.isEnabled = true;
        this.empty(objectIndex);
        this.enableElements(objectIndex, evt);
    }

    enableElements(objectIndex, evt) {
        // Abstract method
    }

    isEnableAllowed(objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object.valuesAllowed) {
            return true;
        }

        if (
            !evt ||
            !evt.detail ||
            !evt.detail.data
        ) {
            return false;
        }

        let currentValues = evt.detail.data[Object.keys(evt.detail.data)[0]];
        try {
            currentValues = JSON.parse(currentValues);
        } catch (ex) {
        }

        if (typeof currentValues === 'object' && currentValues.value !== undefined) {
            if (!object.valuesAllowed.includes(currentValues.value)) {
                return false;
            }

            return true;
        }

        if (typeof currentValues === 'object') {
            const valuesIntersection = (object.valuesAllowed.filter(value => currentValues.includes(value)));
            if (valuesIntersection.length === 0) {
                return false;
            }

            return true;
        }

        if (!object.valuesAllowed.includes(currentValues)) {
            return false;
        }

        return true;
    }

    disable(objectIndex) {
        const object = this.objects[objectIndex];
        object.isEnabled = false;

        this.empty(objectIndex);
        this.removeInvalid(objectIndex);
        this.disableElements(objectIndex);
    }

    disableElements(objectIndex) {
        // Abstract method
    }

    validate(evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.formElement
        ) {
            return;
        }

        let isValid = true;
        let data = {};
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            if (!evt.detail.formElement.contains(this.objects[objectIndex].containerElement)) {
                continue;
            }

            if (this.checkValidity(objectIndex) === false) {
                isValid = false;
            } else {
                const newData = this.getData(objectIndex);
                if (newData) {
                    data = Object.assign(data, newData);
                }
            }
        }

        MiscEvent.dispatch(
            'form:validation',
            {
                'category': this.category,
                'isValid': isValid,
                'data': data
            },
            evt.detail.formElement
        );
    }

    removeInvalid(objectIndex) {
        // Abstract method
    }

    checkValidity(objectIndex) {
        this.removeInvalid(objectIndex);

        const object = this.objects[objectIndex];
        if (
            object.isRequired &&
            object.isEnabled &&
            !this.getData(objectIndex)
        ) {
            this.invalid(objectIndex);

            return false;
        }

        return true;
    }

    invalid(objectIndex) {
        // Abstract method
    }

    showErrorMessage(objectIndex, errorMessageElementId = null) {
        const object = this.objects[objectIndex];

        let errorElement = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (errorElement) {
            errorElement.remove();
        }
        errorElement = document.createElement('div');
        errorElement.classList.add('ds44-errorMsg-container');
        errorElement.setAttribute('aria-live', 'polite');
        object.containerElement.appendChild(errorElement);

        let errorMessageElement = document.createElement('p');
        if (errorMessageElementId) {
            errorMessageElement.setAttribute('id', errorMessageElementId);
        }
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
        errorTextElement.innerHTML = this.formatErrorMessage(objectIndex);
        errorMessageElement.appendChild(errorTextElement);
    }

    formatErrorMessage(objectIndex) {
        const errorMessage = this.getErrorMessage(objectIndex);

        const object = this.objects[objectIndex];
        if (!object.labelElement) {
            return errorMessage;
        }

        return errorMessage
            .replace(
                '{fieldName}',
                object.labelElement.innerText.replace(/\*$/, '')
            );
    }

    getErrorMessage(objectIndex) {
        return this.errorMessage;
    }
}
