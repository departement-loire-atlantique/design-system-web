class Input {
    constructor() {
        this.mainClassName = 'ds44-moveLabel';
        this.errorMessages = {
            'select': {
                'default': 'Le champ "{fieldName}" n\'est pas valide',
                'valueMissing': 'Veuillez sélectionner un élément de la liste',
            },
            'input': {
                'default': 'Le champ "{fieldName}" n\'est pas valide',
                'valueMissing': 'Veuillez renseigner le champ : {fieldName}',
                'patternMismatch': 'Veuillez renseigner le champ "{fieldName}" avec le bon format',
            }
        };

        document
            .querySelectorAll('input, select, textarea')
            .forEach((element) => {
                if (element.previousElementSibling) {
                    element.previousElementSibling.classList.remove(this.mainClassName);
                }

                MiscEvent.addListener('focus', this.focus.bind(this), element);
                MiscEvent.addListener('blur', this.blur.bind(this), element);
                MiscEvent.addListener('invalid', this.invalid.bind(this), element);
            });
    }

    focus(evt) {
        const element = evt.currentTarget;
        if (element.previousElementSibling) {
            element.previousElementSibling.classList.add(this.mainClassName);
        }
    }

    blur(evt) {
        const element = evt.currentTarget;

        element.removeAttribute('aria-invalid');
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-describedby')
        element.classList.remove('ds44-error');

        if (!element.value && element.previousElementSibling) {
            element.previousElementSibling.classList.remove(this.mainClassName);
        }

        const elementContainer = element.closest('.ds44-form__container');
        if (elementContainer) {
            let elementError = elementContainer.querySelector('.ds44-errorMsg-container');
            if (elementError) {
                elementError.remove();
            }
        }
        element.checkValidity();
    }

    invalid(evt) {
        const element = evt.currentTarget;
        const elementContainer = element.closest('.ds44-form__container');
        if (!elementContainer) {
            return;
        }
        const elementPlaceholder = elementContainer.querySelector('.ds44-labelTypePlaceholder');
        if (!elementPlaceholder) {
            return;
        }

        let elementError = elementContainer.querySelector('.ds44-errorMsg-container');
        if (elementError) {
            elementError.remove();
        }

        let errorMessage = null;
        for (let key in element.validity) {
            if (key === 'valid') {
                continue;
            }

            let isInError = element.validity[key];
            if (isInError && this.errorMessages[element.tagName.toLowerCase()][key]) {
                errorMessage = this.errorMessages[element.tagName.toLowerCase()][key];
                break;
            }
        }
        if (errorMessage === null) {
            errorMessage = this.errorMessages[element.tagName.toLowerCase()]['default'];
        }
        errorMessage = this.formatErrorMessage(errorMessage, elementPlaceholder);

        elementError = document.createElement('div');
        elementError.classList.add('ds44-errorMsg-container');
        elementContainer.appendChild(elementError);

        const elementErrorMessageId = MiscUtils.generateId();
        let elementErrorMessage = document.createElement('p');
        elementErrorMessage.setAttribute('id', elementErrorMessageId);
        elementErrorMessage.classList.add('ds44-msgErrorText');
        elementErrorMessage.classList.add('ds44-msgErrorInvalid');
        elementError.appendChild(elementErrorMessage);

        let elementErrorIcon = document.createElement('i');
        elementErrorIcon.classList.add('icon');
        elementErrorIcon.classList.add('icon-cross');
        elementErrorIcon.classList.add('icon--sizeM');
        elementErrorIcon.setAttribute('aria-hidden', 'true');
        elementErrorMessage.appendChild(elementErrorIcon);

        let elementErrorText = document.createElement('span');
        elementErrorText.classList.add('ds44-iconInnerText');
        elementErrorText.innerHTML = errorMessage;
        elementErrorMessage.appendChild(elementErrorText);

        element.classList.add('ds44-error');
        element.setAttribute('aria-invalid', 'true');
        element.setAttribute('aria-label', errorMessage);
        element.setAttribute('aria-describedby', elementErrorMessageId)
    }

    formatErrorMessage(errorMessage, elementPlaceholder) {
        return errorMessage
            .replace('{fieldName}', elementPlaceholder.innerText.replace(/\*$/, ''))
    }
}

// Singleton
new Input();
