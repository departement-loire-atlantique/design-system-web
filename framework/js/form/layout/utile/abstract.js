class FormLayoutUtileAbstract {
    constructor (selector) {
        this.url = '/plugins/ChartePlugin/types/PortletQueryForeach/displayResult.jsp';
        this.formElement = null;
        this.submitSuccessText = null;

        const formElement = document.querySelector(selector);
        if (formElement) {
            this.formElement = formElement;

            MiscEvent.addListener('form:submit', this.submit.bind(this), formElement);
        }
    }

    submit (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.parameters
        ) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Add other details to parameters
        evt.detail.parameters.url = document.location.href;
        evt.detail.parameters.title = document.title;
        evt.detail.parameters.date = (new Date()).toLocaleString('fr-FR', {'timeZone': 'UTC', 'timeZoneName': 'short'});

        // Get the results from the back office
        MiscRequest.send(
            this.url,
            this.submitSuccess.bind(this),
            this.submitError.bind(this),
            evt.detail.parameters,
            'POST'
        );
    }

    submitSuccess () {
        const parentElement = this.formElement.closest('.ds44-inner-container');
        if (!parentElement) {
            MiscEvent.dispatch('loader:requestHide');

            return;
        }

        // Empty parent
        parentElement.innerHTML = '';

        // Show message
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-1-small-1');
        gridElement.classList.add('ds44-grid12-offset-1');
        gridElement.classList.add('s44-box');
        parentElement.appendChild(gridElement);

        const centerElement = document.createElement('div');
        centerElement.classList.add('col');
        centerElement.classList.add('txtcenter');
        gridElement.appendChild(centerElement);

        const textElement = document.createElement('div');
        textElement.classList.add('h4-like');
        textElement.setAttribute('aria-live', 'polite');
        textElement.innerHTML = this.submitSuccessText;
        centerElement.appendChild(textElement);

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }

    submitError () {
        // Show error notification in form
        const errorMessageId = MiscUtils.generateId();
        MiscEvent.dispatch(
            'form:notification',
            {
                'id': errorMessageId,
                'type': 'error',
                'message': 'Une erreur est survenue suite à l\'envoi de votre formulaire.'
            },
            this.formElement
        );

        // Add aria described by to textarea
        const textareaElement = this.formElement.querySelector('textarea');
        if (textareaElement) {
            textareaElement.setAttribute('aria-describedby', errorMessageId);
        }

        // Hide loader
        MiscEvent.dispatch('loader:requestHide');
    }
}
