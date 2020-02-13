class FormBox {
    constructor(category) {
        this.objects = [];
        this.errorMessage = 'Veuillez cocher un élément';
        this.category = category;

        document
            .querySelectorAll('.ds44-form__' + this.category + '_container')
            .forEach((element) => {
                this.create(element);
            });

        MiscEvent.addListener('form:validate', this.validate.bind(this));
    }

    create(element) {
        const object = {
            'id': MiscUtils.generateId(),
            'name': element.getAttribute('data-name'),
            'inputElements': element.querySelectorAll('input[type="' + this.category + '"]'),
            'containerElement': element,
            'isRequired': (element.getAttribute('data-required') === 'true'),
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        object.inputElements.forEach((inputElement) => {
            MiscEvent.addListener('click', this.toggleCheck.bind(this, objectIndex), inputElement);
        });
    }

    toggleCheck(objectIndex) {
        const object = this.objects[objectIndex];

        object.inputElements.forEach((inputElement) => {
            if(inputElement.checked) {
                inputElement.setAttribute('aria-checked', 'true');
            } else {
                inputElement.removeAttribute('aria-checked');
            }
        });
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
                break;
            }

            data = Object.assign(data, this.getData(objectIndex));
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

    getData(objectIndex) {
        const object = this.objects[objectIndex];

        let data = {};
        data[object.name] = [];
        object.inputElements.forEach((inputElement) => {
            if(inputElement.checked) {
                data[object.name].push(inputElement.value);
            }
        });
        return data;
    }

    checkValidity(objectIndex) {
        const object = this.objects[objectIndex];

        if (!object.isRequired) {
            return true;
        }

        let errorElement = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (errorElement) {
            errorElement.remove();
        }

        let hasOneCheckedInput = false;
        object.inputElements.forEach((inputElement) => {
            if (inputElement.checked) {
                hasOneCheckedInput = true;
            }

            inputElement.removeAttribute('aria-invalid');
            inputElement.removeAttribute('aria-label');
            inputElement.removeAttribute('aria-describedby');
            inputElement.classList.remove('ds44-boxError');
        });

        if (hasOneCheckedInput !== true) {
            this.showError(objectIndex);
            return false;
        }

        return true;
    }

    showError(objectIndex) {
        const object = this.objects[objectIndex];
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
        errorTextElement.innerHTML = this.errorMessage;
        errorMessageElement.appendChild(errorTextElement);

        object.inputElements.forEach((inputElement) => {
            inputElement.classList.add('ds44-boxError');
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.setAttribute('aria-label', this.errorMessage);
            inputElement.setAttribute('aria-describedby', errorMessageElementId)
        });
    }
}
