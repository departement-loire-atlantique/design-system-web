class FormLayoutUtileAbstract extends FormLayoutAbstract {
    ajaxSubmit (objectIndex, formData) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Add other details to parameters
        formData.url = { 'value': document.location.href };
        formData.title = { 'value': document.title };
        formData.date = {
            'value': (new Date()).toLocaleString(
                'fr-FR',
                {
                    'timeZone': 'UTC',
                    'timeZoneName': 'short'
                }
            )
        };

        // Get the results from the back office
        MiscRequest.send(
            object.formElement.getAttribute('action'),
            this.submitSuccess.bind(this, objectIndex),
            this.submitError.bind(this, objectIndex),
            formData
        );
    }

    submitSuccess (objectIndex, response) {
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, null, response.message, response.message_list, response.status);
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Add aria described by to textarea
        const textareaElement = object.formElement.querySelector('textarea');
        if (textareaElement) {
            const defaultAriaDescribedBy = textareaElement.getAttribute('data-bkp-aria-describedby');
            if (!defaultAriaDescribedBy) {
                textareaElement.removeAttribute('aria-describedby');
            } else {
                textareaElement.setAttribute('aria-describedby', defaultAriaDescribedBy);
            }
        }

        if (response.status !== 'error') {
            this.clear(objectIndex);
        }

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }

    submitError (objectIndex, response) {
        const messageId = MiscUtils.generateId();
        if (
            response &&
            response.message
        ) {
            this.notification(objectIndex, messageId, response.message, response.message_list, response.status);
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Add aria described by to textarea
        const textareaElement = object.formElement.querySelector('textarea');
        if (textareaElement) {
            const defaultAriaDescribedBy = textareaElement.getAttribute('data-bkp-aria-describedby');
            textareaElement.setAttribute('aria-describedby', messageId + (defaultAriaDescribedBy ? ' ' + defaultAriaDescribedBy : ''));
        }

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }
}
