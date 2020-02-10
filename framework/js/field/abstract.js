class FieldAbstract {
    constructor(selector) {
        this.objects = [];
        this.mainClassName = 'ds44-moveLabel';
        this.errorMessages = {
            'default': 'Le champ "{fieldName}" n\'est pas valide',
            'valueMissing': 'Veuillez renseigner le champ : {fieldName}',
            'patternMismatch': 'Veuillez renseigner le champ "{fieldName}" avec le bon format',
        };

        document
            .querySelectorAll(selector)
            .forEach((element) => {
                this.create(element);
            });
    }

    create(element) {
        const object = {
            'id': MiscUtils.generateId(),
            'textElement': element,
            'labelElement': MiscDom.getPreviousSibling(element, 'span'),
            'containerElement': element.closest('.ds44-form__container'),
        }
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        if (object.labelElement) {
            object.labelElement.classList.remove(this.mainClassName);
        }

        MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), element);
        MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), element);
        MiscEvent.addListener('invalid', this.invalid.bind(this, objectIndex), element);
    }

    focus(objectIndex) {
        const object = this.objects[objectIndex];

        if (object.labelElement) {
            object.labelElement.classList.add(this.mainClassName);
        }
    }

    blur(objectIndex) {
        this.checkValidity(objectIndex);
    }

    checkValidity(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        object.textElement.removeAttribute('aria-invalid');
        object.textElement.removeAttribute('aria-label');
        object.textElement.removeAttribute('aria-describedby')
        object.textElement.classList.remove('ds44-error');

        if (!object.textElement.value && object.labelElement) {
            object.labelElement.classList.remove(this.mainClassName);
        }

        if (object.containerElement) {
            let elementError = object.containerElement.querySelector('.ds44-errorMsg-container');
            if (elementError) {
                elementError.remove();
            }
        }
        object.textElement.checkValidity();
    }

    invalid(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.labelElement) {
            return;
        }
        if (!object.containerElement) {
            return;
        }

        let errorElement = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (errorElement) {
            errorElement.remove();
        }

        let errorMessage = null;
        for (let key in object.textElement.validity) {
            if (key === 'valid') {
                continue;
            }

            let isInError = object.textElement.validity[key];
            if (isInError && this.errorMessages[key]) {
                errorMessage = this.errorMessages[key];
                break;
            }
        }
        if (errorMessage === null) {
            errorMessage = this.errorMessages['default'];
        }
        errorMessage = this.formatErrorMessage(errorMessage, object.labelElement);

        errorElement = document.createElement('div');
        errorElement.classList.add('ds44-errorMsg-container');
        object.containerElement.appendChild(errorElement);

        const errorMessageElementId = MiscUtils.generateId();
        let errorMessageElement = document.createElement('p');
        errorMessageElement.setAttribute('id', errorMessageElementId);
        errorMessageElement.classList.add('ds44-msgErrorText');
        errorMessageElement.classList.add('ds44-msgErrorInvalid');
        errorElement.appendChild(errorMessageElement);

        let errorIconElement = document.createElement('i');
        errorIconElement.classList.add('icon');
        errorIconElement.classList.add('icon-cross');
        errorIconElement.classList.add('icon--sizeM');
        errorIconElement.setAttribute('aria-hidden', 'true');
        errorMessageElement.appendChild(errorIconElement);

        let errorTextElement = document.createElement('span');
        errorTextElement.classList.add('ds44-iconInnerText');
        errorTextElement.innerHTML = errorMessage;
        errorMessageElement.appendChild(errorTextElement);

        object.textElement.classList.add('ds44-error');
        object.textElement.setAttribute('aria-invalid', 'true');
        object.textElement.setAttribute('aria-label', errorMessage);
        object.textElement.setAttribute('aria-describedby', errorMessageElementId)
    }

    formatErrorMessage(errorMessage, labelElement) {
        return errorMessage
            .replace('{fieldName}', labelElement.innerText.replace(/\*$/, ''))
    }
}