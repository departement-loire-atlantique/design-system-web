class Form {
    constructor() {
        document
            .querySelectorAll('form')
            .forEach((element) => {
                element.setAttribute('novalidate', 'true');

                MiscEvent.addListener('submit', this.submit.bind(this), element);
            });
    }

    submit(evt) {
        const element = evt.currentTarget;

        let isValid = true;
        element
            .querySelectorAll('input:not([type="hidden"]), select, textarea')
            .forEach((element) => {
                isValid = (element.checkValidity() && isValid);
            })

        if (!isValid) {
            evt.stopPropagation();
            evt.preventDefault();

            // Focus on first error field
            const firstErrorField = element.querySelector('[aria-invalid="true"]');
            if (firstErrorField) {
                MiscAccessibility.setFocus(firstErrorField);
            }

            return false;
        }
    }
}

// Singleton
new Form();
