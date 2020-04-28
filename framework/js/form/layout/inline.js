class FormLayoutInline {
    constructor () {
        const formElement = document.querySelector('form[data-is-inline="true"]');
        if (!formElement) {
            return;
        }

        MiscEvent.addListener('form:submit', this.submit.bind(this), formElement);
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

        // Get the inline data from the back office
        MiscRequest.send(
            evt.currentTarget.getAttribute('action'),
            this.inlineSuccess.bind(this, evt.currentTarget),
            this.inlineError.bind(this, evt.currentTarget),
            evt.detail.parameters
        )
    }

    inlineSuccess (formElement, response) {
        this.showInlineData(formElement, response);
        MiscEvent.dispatch('loader:requestHide');
    }

    inlineError (formElement) {
        MiscEvent.dispatch(
            'form:notification',
            {
                'id': MiscUtils.generateId(),
                'type': 'error',
                'message': MiscTranslate._('FORM_GENERAL_ERROR')
            },
            formElement
        );
        MiscEvent.dispatch('loader:requestHide');
    }

    showInlineData (formElement, inlineData) {
        const destinationElement = document.querySelector(formElement.getAttribute('data-result-destination'));
        if(!destinationElement) {
            return;
        }

        destinationElement.innerHTML = inlineData.content_html;
    }
}

new FormLayoutInline();
