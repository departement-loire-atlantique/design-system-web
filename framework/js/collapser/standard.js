class CollapserStandard {
    constructor () {
        this.objects = [];

        document
            .querySelectorAll('.ds44-collapser_button')
            .forEach((buttonElement) => {
                this.create(buttonElement);
            });
    }

    create (buttonElement) {
        if(
            buttonElement.getAttribute('role') !== 'heading' &&
            buttonElement.parentElement.getAttribute('role') === 'heading'
        ) {
            buttonElement = buttonElement.parentElement;
        }

        const object = {
            'id': MiscUtils.generateId(),
            'containerElement': buttonElement.closest('.ds44-collapser_element'),
            'buttonElement': buttonElement
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        this.hide(objectIndex);

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
        MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), buttonElement);
    }

    showHide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        if (object.buttonElement.classList.contains('show')) {
            // Hide
            this.hide(objectIndex);

            return;
        }

        // Show
        this.show(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('COLLAPSE');
        }
        object.buttonElement.classList.add('show');
        object.buttonElement.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + 60 + 'px');
        MiscAccessibility.show(panel);
        panel.style.visibility = 'visible';
    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('EXPAND');
        }
        object.buttonElement.classList.remove('show');
        object.buttonElement.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
        MiscAccessibility.hide(panel);
        panel.style.visibility = 'hidden';
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement) ||
            !object.buttonElement
        ) {
            return;
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);
    }
}

// Singleton
new CollapserStandard();
