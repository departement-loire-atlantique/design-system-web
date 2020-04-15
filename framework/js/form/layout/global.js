class FormLayoutGlobal {
    constructor () {
        this.objects = [];

        document
            .querySelectorAll('form')
            .forEach((formElement) => {
                this.create(formElement);
            });
    }

    create (formElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'formElement': formElement,
            'hasBeenChecked': false,
            'validationCategories': MiscForm.getValidationCategories()
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        // Bind events
        MiscEvent.addListener('submit', this.submit.bind(this, objectIndex), formElement);
        MiscEvent.addListener('form:validation', this.validation.bind(this, objectIndex), formElement);
        MiscEvent.addListener('form:notification', this.notification.bind(this, objectIndex), formElement);

        // Init
        formElement.setAttribute('novalidate', 'true');
    }

    validation (objectIndex, evt) {
        // This function will be fired by each component category so they can tell if they are valid or not
        const object = this.objects[objectIndex];
        object.hasBeenChecked = true;

        if (
            !evt ||
            !evt.detail ||
            evt.detail.category === undefined ||
            evt.detail.isValid === undefined
        ) {
            return;
        }

        // Mark the component category as answered
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
            this.submit(objectIndex, evt);
        }
    }

    submit (objectIndex, evt) {
        const object = this.objects[objectIndex];

        // Submission is in two steps :
        //  - First we ask the form components if they are valid through event dispatching
        //  - Then, once everyone came back, we make a decision on the form validity
        try {
            if (!object.hasBeenChecked) {
                object.validationCategories = MiscForm.getValidationCategories();

                // Check the form components
                evt.stopPropagation();
                evt.preventDefault();

                MiscEvent.dispatch('form:validate', { 'formElement': object.formElement });

                return false;
            }
            object.hasBeenChecked = false;

            // Check if the components are all valid
            const formValidity = MiscForm.checkValidity(object.validationCategories);
            if (!formValidity.isValid) {
                // At least one was not valid
                evt.stopPropagation();
                evt.preventDefault();

                // Focus on first error field
                const firstErrorField = object.formElement.querySelector('[aria-invalid="true"]');
                if (firstErrorField) {
                    MiscAccessibility.setFocus(firstErrorField);
                }

                return false;
            }

            // Organize data
            const formattedData = {};
            for (let dataKey in formValidity.data) {
                if (!formValidity.data.hasOwnProperty(dataKey)) {
                    continue;
                }

                let dataValue = formValidity.data[dataKey];
                try {
                    // Try if it is JSON
                    dataValue = JSON.parse(dataValue);
                } catch (ex) {
                }
                formattedData[dataKey] = dataValue;
            }

            // Add technical hidden fields
            object.formElement
                .querySelectorAll('input[type="hidden"][name][data-technical-field]')
                .forEach((hiddenInputElement) => {
                    formattedData[hiddenInputElement.getAttribute('name')] = {
                        'value': hiddenInputElement.value
                    };
                });

            // Save city and adresse in local storage
            const fieldParameters = JSON.parse(window.sessionStorage.getItem('fields') || '{}');
            ['commune', 'adresse'].forEach((key) => {
                if (formattedData[key]) {
                    fieldParameters[key] = formattedData[key];
                }
            });
            window.sessionStorage.setItem('fields', JSON.stringify(fieldParameters));

            // Statistics
            if (object.formElement.getAttribute('data-statistic')) {
                MiscEvent.dispatch(
                    'statistic:gtag:event',
                    {
                        'statistic': JSON.parse(object.formElement.getAttribute('data-statistic')),
                        'data': formattedData
                    });
            }

            if (object.formElement.getAttribute('data-is-ajax') === 'true') {
                // Ajax submission
                MiscEvent.dispatch(
                    'form:submit',
                    {
                        'parameters': formattedData
                    },
                    object.formElement
                );

                return;
            }

            // Regular submission
            let hasFile = false;
            object.formElement
                .querySelectorAll('[name][type="file"]')
                .forEach((inputFileElement) => {
                    hasFile = true;
                    inputFileElement.setAttribute('name', inputFileElement.getAttribute('name') + '[value]');
                });
            if (hasFile) {
                object.formElement.setAttribute('method', 'post');
                object.formElement.setAttribute('enctype', 'multipart/form-data');
            }

            // Remove name from all elements not to interfere with the next step
            object.formElement
                .querySelectorAll('[name]:not([type="file"])')
                .forEach((element) => {
                    element.removeAttribute('name');
                });

            // Regular submission
            const formData = MiscForm.jsonToFormData(formattedData);
            for (var [key, value] of formData.entries()) {
                let hiddenInputElement = document.createElement('input');
                hiddenInputElement.setAttribute('type', 'hidden');
                hiddenInputElement.setAttribute('name', key);
                hiddenInputElement.value = value;
                object.formElement.appendChild(hiddenInputElement);
            }
            object.formElement.submit();
        } catch (ex) {
            console.log(ex);

            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    notification (objectIndex, evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.detail ||
            !evt.detail.message
        ) {
            return;
        }

        const object = this.objects[objectIndex];
        const notificationType = evt.detail.type || 'error';
        const errorMessageId = evt.detail.id;

        let containerElement = object.formElement.querySelector('.ds44-message-container');
        if (containerElement) {
            containerElement.remove();
        }

        // Show message
        containerElement = document.createElement('div');
        containerElement.classList.add('ds44-message-container');
        containerElement.classList.add('ds44-mb-std');
        object.formElement.insertBefore(containerElement, object.formElement.firstChild);

        const textElement = document.createElement('p');
        if (errorMessageId) {
            textElement.setAttribute('id', errorMessageId);
        }
        textElement.classList.add('ds44-message-text');
        textElement.classList.add(notificationType);
        textElement.setAttribute('tabindex', '-1');
        containerElement.appendChild(textElement);

        const iconElement = document.createElement('i');
        iconElement.classList.add('icon');
        if (notificationType === 'success') {
            iconElement.classList.add('icon-check');
        } else {
            iconElement.classList.add('icon-attention');
        }
        iconElement.classList.add('icon--sizeM');
        iconElement.setAttribute('aria-hidden', 'true');
        textElement.appendChild(iconElement);

        const spanElement = document.createElement('span');
        spanElement.classList.add('ds44-iconInnerText');
        spanElement.innerText = evt.detail.message;
        textElement.appendChild(spanElement);

        MiscAccessibility.setFocus(textElement);
    }
}

// Singleton
new FormLayoutGlobal();
