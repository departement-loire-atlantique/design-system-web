class Input {
    constructor() {
        this.mainClassName = 'ds44-moveLabel';
        this.labels = {
            invalid_input_select: 'Veuillez sélectionner un élément de la liste.',
            invalid_input_text: 'Veuillez remplir ce champ.',
        };

        document
            .querySelectorAll('input, select, textarea')
            .forEach((element) => {
                if(element.previousElementSibling) {
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
        element.checkValidity();
        if (!element.value && element.previousElementSibling) {
            element.previousElementSibling.classList.remove(this.mainClassName);
        }
    }

    invalid(evt) {
        const element = evt.currentTarget;
        element.setAttribute('aria-invalid', 'true');
        if (element.tagName.toLowerCase() === 'select') {
            element.setAttribute('aria-label', this.labels.invalid_input_select);
        } else {
            element.setAttribute('aria-label', this.labels.invalid_input_text);
        }
    }
}

// Singleton
new Input();
