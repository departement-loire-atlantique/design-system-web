class Checkbox {
    constructor() {
        this.objects = [];
        this.errorMessage = 'Veuillez cocher un élément';

        document
            .querySelectorAll('.ds44-form__checkbox_container')
            .forEach((element) => {
                this.create(element);
            });

        MiscEvent.addListener('form:validate', this.validate.bind(this));
    }

    create(element) {
        const object = {
            'id': MiscUtils.generateId(),
            'name': element.getAttribute('data-name'),
            'checkboxElements': element.querySelectorAll('input[type="checkbox"]'),
            'containerElement': element,
            'isRequired': (element.getAttribute('data-required') === 'true' ? true : false),
        }
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        if (object.isRequired) {
            object.checkboxElements.forEach((checkboxElement) => {
                MiscEvent.addListener('click', this.toggleCheck.bind(this, objectIndex), checkboxElement);
            });
        }
    }

    toggleCheck(objectIndex, evt) {
        if(evt.currentTarget.checked) {
            evt.currentTarget.setAttribute('aria-checked', 'true');
        } else {
            evt.currentTarget.removeAttribute('aria-checked');
        }
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
                'category': 'checkbox',
                'isValid': isValid,
                'data': data
            },
            evt.detail.formElement
        );
    }

    getData(objectIndex) {
        const object = this.objects[objectIndex];

        let data = {};
        object.checkboxElements.forEach((checkboxElement) => {
            if(checkboxElement.checked) {
                if(!data[object.name]) {
                    data[object.name] = [];
                }
                data[object.name].push(checkboxElement.value);
            }
        });
        return data;
    }

    checkValidity(objectIndex) {
        const object = this.objects[objectIndex];

        let errorElement = object.containerElement.querySelector('.ds44-errorMsg-container');
        if (errorElement) {
            errorElement.remove();
        }

        let hasOneCheckedCheckbox = false;
        object.checkboxElements.forEach((checkboxElement) => {
            if (checkboxElement.checked) {
                hasOneCheckedCheckbox = true;
            }

            checkboxElement.removeAttribute('aria-invalid');
            checkboxElement.removeAttribute('aria-label');
            checkboxElement.removeAttribute('aria-describedby')
            checkboxElement.classList.remove('ds44-boxError');
        });

        if (hasOneCheckedCheckbox !== true) {
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
        errorIconElement.classList.add('icon-cross');
        errorIconElement.classList.add('icon--sizeM');
        errorIconElement.setAttribute('aria-hidden', 'true');
        errorMessageElement.appendChild(errorIconElement);

        let errorTextElement = document.createElement('span');
        errorTextElement.classList.add('ds44-iconInnerText');
        errorTextElement.innerHTML = this.errorMessage;
        errorMessageElement.appendChild(errorTextElement);

        object.checkboxElements.forEach((checkboxElement) => {
            checkboxElement.classList.add('ds44-boxError');
            checkboxElement.setAttribute('aria-invalid', 'true');
            checkboxElement.setAttribute('aria-label', this.errorMessage);
            checkboxElement.setAttribute('aria-describedby', errorMessageElementId)
        });
    }
}

// Singleton
new Checkbox();
