class FormLayoutAbstract {
    constructor (className, selector) {
        this.className = className;
        this.selector = selector;
        Debug.log(this.className+" -> Constructor");
        this.objects = [];
    }

    clearObject() {
        Debug.log(this.className+" -> Clear object");
        this.objects = [];
        this.submitter = null;
    }

    initialise()
    {
        Debug.log(this.className+" -> Initialise");
        document
          .querySelectorAll(this.selector)
          .forEach((formElement) => {
              if (formElement.getAttribute('data-is-initialized') !== 'true' && !MiscComponent.isInit(formElement, "form-layout")) {
                  this.create(formElement);
              }
          });
        this.initialize();
    }


    create (formElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'formElement': formElement,
            'hasBeenChecked': false,
            'validationCategories': MiscForm.getValidationCategories(),
            'isAutoLoaded': false
        };
        formElement.setAttribute('novalidate', 'true');
        formElement.setAttribute('data-is-initialized', 'true');

        const msgContainerElement = formElement.querySelector('.ds44-msg-container');
        if (msgContainerElement) {
            this.delayedFocus(msgContainerElement);
        }

        formElement.querySelectorAll("button").forEach((button) => {
            MiscEvent.addListener("click", () => {
                this.submitter = button;
            }, button);
        });


        this.objects.push(object);
    }

    initialize () {
        // Initialize each object
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if(!MiscComponent.isInit(object.formElement, "form-layout"))
            {
                MiscComponent.create(object.formElement, "form-layout")
                // Bind events
                MiscEvent.addListener('submit', this.submit.bind(this, objectIndex), object.formElement);
                MiscEvent.addListener('form:validation', this.validation.bind(this, objectIndex), object.formElement);

                this.start(objectIndex);
            }
        }
    }

    start (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-auto-load') === 'true') {
            MiscEvent.dispatch('submit', { 'dryRun': true }, object.formElement);
        }
    }

    validation (objectIndex, evt) {
        // This function will be fired by each component category so they can tell if they are valid or not
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

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
        if (!object) {
            return false;
        }

        this.submitter = null;

        if(evt.submitter) {
            this.submitter = evt.submitter
        }

        console.log(this.submitter);
        return false;

        // We need to deactivate the submit button once clicked
        // If the form is incorrect, it shall be reactivated
        let submitBtn = object.formElement.querySelector('.ds44-btnStd');
        let isFormWithBlockedSubmit = object.formElement.classList.contains("ds44-js-oneSubmit");
        if (submitBtn && isFormWithBlockedSubmit) {
            submitBtn.setAttribute("disabled", true);
            submitBtn.setAttribute("aria-disabled", true);
        }

        if(this.submitter && this.submitter.hasAttribute("data-form-no-validate"))
        {
            return true;
        }

        // Submission is in two steps :
        //  - First we ask the form components if they are valid through event dispatching
        //  - Then, once everyone came back, we make a decision on the form validity
        try {
            if (!object.hasBeenChecked) {
                object.validationCategories = MiscForm.getValidationCategories();

                // Check the form components
                evt.stopPropagation();
                evt.preventDefault();

                MiscEvent.dispatch('form:validate', {
                    'formElement': object.formElement,
                    'dryRun': ((evt.detail || { 'dryRun': false }).dryRun || false)
                });

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

                // We need to activate the submit button if the form is incorrect
                let isFormWithBlockedSubmit = object.formElement.classList.contains("ds44-js-oneSubmit");
                if (submitBtn && isFormWithBlockedSubmit) {
                    submitBtn.removeAttribute("disabled");
                    submitBtn.removeAttribute("aria-disabled");
                }

                return false;
            }
            else if(!this.submitter || !this.submitter.hasAttribute("data-send-native")) {

                Debug.log("Form - Send default");
                // Organize data
                const formattedData = {};
                const dataPositionByKey = {};
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
                    dataPositionByKey[dataKey] = dataValue.position;
                    delete dataValue.position;
                    formattedData[dataKey] = dataValue;
                }

                // Add technical hidden fields
                object.formElement
                  .querySelectorAll('input[type="hidden"][name][data-technical-field]')
                  .forEach((hiddenInputElement) => {
                      const hiddenInputName = hiddenInputElement.getAttribute('name');
                      formattedData[hiddenInputName] = {
                          'value': hiddenInputElement.value
                      };
                      dataPositionByKey[hiddenInputName] = 999;
                  });

                if (this.submitter !== null) {
                    let submitKey = "submit";
                    if (this.submitter.dataset.submitKey !== undefined && this.submitter.dataset.submitKey) {
                        submitKey = this.submitter.dataset.submitKey
                    }
                    if (this.submitter.dataset.submitValue !== undefined && this.submitter.dataset.submitValue) {
                        formattedData[submitKey] = {
                            "value": this.submitter.dataset.submitValue
                        };
                        dataPositionByKey[submitKey] = 1010;
                    }
                }

                // Sort formatted data
                const sortedKeys = Object.keys(dataPositionByKey).sort(function (a, b) {
                    return parseInt(dataPositionByKey[a], 10) - parseInt(dataPositionByKey[b], 10);
                });
                const sortedData = {};
                for (let i = 0; i < sortedKeys.length; i++) {
                    if (object.formElement.dataset.noEncoding !== undefined && object.formElement.dataset.noEncoding) {
                        sortedData[sortedKeys[i]] = formattedData[sortedKeys[i]]["value"];
                    } else {
                        sortedData[sortedKeys[i]] = formattedData[sortedKeys[i]];
                    }
                }

                // Save city and adresse in local storage
                const fieldParameters = JSON.parse(window.sessionStorage.getItem('fields') || '{}');
                ['commune', 'adresse'].forEach((key) => {
                    if (sortedData[key]) {
                        fieldParameters[key] = sortedData[key];
                    } else if (fieldParameters[key]) {
                        delete fieldParameters[key];
                    }
                });

                window.sessionStorage.setItem('fields', JSON.stringify(fieldParameters));

                // Statistics
                if (object.formElement.getAttribute('data-statistic')) {
                    MiscEvent.dispatch(
                      'statistic:gtag:event',
                      {
                          'statistic': JSON.parse(object.formElement.getAttribute('data-statistic')),
                          'data': sortedData
                      });
                }

                if (object.formElement.getAttribute('data-is-ajax') === 'true') {
                    // Ajax submission
                    this.recaptchaSubmit(objectIndex, sortedData);

                    evt.stopPropagation();
                    evt.preventDefault();

                    return false;
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
                const formData = MiscForm.jsonToFormData(sortedData);
                for (var [key, value] of formData.entries()) {
                    let hiddenInputElement = document.createElement('input');
                    hiddenInputElement.setAttribute('type', 'hidden');
                    hiddenInputElement.setAttribute('name', key);
                    hiddenInputElement.value = value;
                    object.formElement.appendChild(hiddenInputElement);
                }

                // Affiche les valeurs
                this.recaptchaSubmit(objectIndex, sortedData);
            }
            else {
                Debug.log("Form - Send native");
                if (this.submitter !== null) {
                    let submitKey = "submit";
                    if (this.submitter.dataset.submitKey !== undefined && this.submitter.dataset.submitKey) {
                        submitKey = this.submitter.dataset.submitKey
                    }
                    if (this.submitter.dataset.submitValue !== undefined && this.submitter.dataset.submitValue) {
                        let buttonHiddenField = document.createElement("input");
                        buttonHiddenField.setAttribute('type', 'hidden');
                        buttonHiddenField.setAttribute('name', submitKey);
                        buttonHiddenField.value = this.submitter.dataset.submitValue;
                        object.formElement.appendChild(buttonHiddenField);
                    }
                }
                return false;
                object.formElement.submit();
            }
        } catch (ex) {
            console.log(ex);

            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    recaptchaSubmit (objectIndex, formData) {
        if (window.grecaptcha) {
            // Send using recaptcha
            const recaptchaId = document.querySelector('#googleRecaptchaId').getAttribute('src').split('render=').pop().split('?').shift();
            window.grecaptcha.ready((function (objectIndex, recaptchaId) {
                window.grecaptcha
                    .execute(recaptchaId, { action: 'submit' })
                    .then((function (objectIndex, token) {
                        const object = this.objects[objectIndex];
                        if (!object) {
                            return;
                        }

                        if (object.formElement.getAttribute('data-is-ajax') === 'true') {
                            // Ajax submission
                            formData['recaptcha[value]'] = token;
                        } else {
                            let hiddenInputElement = document.createElement('input');
                            hiddenInputElement.setAttribute('type', 'hidden');
                            hiddenInputElement.setAttribute('name', 'recaptcha[value]');
                            hiddenInputElement.value = token;
                            object.formElement.appendChild(hiddenInputElement);
                        }

                        this.send(objectIndex, formData);
                    }).bind(this, objectIndex))
            }).bind(this, objectIndex, recaptchaId));

            return;
        }

        this.send(objectIndex, formData);
    }

    send (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-is-ajax') === 'true') {
            // Ajax submission
            this.ajaxSubmit(objectIndex, formData);
        } else {
            object.formElement.submit();
        }
    }

    ajaxSubmit (objectIndex, formData) {
        // Abstract method
    }

    clear (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.formElement.getAttribute('data-empty-after-submit') === 'true') {
            MiscEvent.dispatch('form:clear', {
                'formElement': object.formElement
            });
        }
    }

    notification (objectIndex, messageId, messageText, messageList, notificationType = 'error') {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let containerElement = object.formElement.querySelector('.ds44-msg-container');
        if (containerElement) {
            containerElement.remove();
        }

        // Show message
        containerElement = document.createElement('div');
        containerElement.classList.add('ds44-msg-container');
        containerElement.classList.add(notificationType);
        containerElement.setAttribute('tabindex', '-1');
        if (messageId) {
            containerElement.setAttribute('id', messageId);
        }
        object.formElement.insertBefore(containerElement, object.formElement.firstChild);

        const textElement = document.createElement('p');
        textElement.classList.add('ds44-message-text');
        containerElement.appendChild(textElement);

        const iconElement = document.createElement('i');
        iconElement.classList.add('icon');
        if (notificationType === 'information') {
            iconElement.classList.add('icon-check');
        } else if (notificationType === 'warning') {
            iconElement.classList.add('icon-help');
        } else {
            iconElement.classList.add('icon-attention');
        }
        iconElement.classList.add('icon--sizeL');
        iconElement.setAttribute('aria-hidden', 'true');
        textElement.appendChild(iconElement);

        const spanElement = document.createElement('span');
        spanElement.classList.add('ds44-iconInnerText');
        spanElement.innerText = messageText;
        textElement.appendChild(spanElement);

        if (messageList) {
            const listElement = document.createElement('ul');
            listElement.classList.add('ds44-errorList');
            textElement.appendChild(listElement);

            for (let i = 0; i < messageList.length; i++) {
                const listItemElement = document.createElement('li');
                listItemElement.innerText = messageList[i];
                listElement.appendChild(listItemElement);
            }
        }

        this.delayedFocus(containerElement);
    }

    delayedFocus (element) {
        window.setTimeout(
            (function (element) {
                return function () {
                    MiscAccessibility.setFocus(element);
                }
            })(element),
            1000
        );
    }
}
