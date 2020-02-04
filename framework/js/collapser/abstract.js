class Collapser {
    constructor() {
        MiscEvent.addListener('keyUp:escape', this.hide.bind(this));
        MiscEvent.addListener('keyUp:tab', this.manageFocus.bind(this));

        //Bind event on click
        document
            .querySelectorAll('.ds44-collapser_button')
            .forEach((element) => {
                MiscEvent.addListener('click', this.showHide.bind(this), element);
            });
    }

    showHide(evt) {
        const element = evt.currentTarget;
        if (element.classList.contains('show')) {
            // Hide
            this.hide(null, element)
        } else {
            // Show
            this.show(null, element)
        }
    }

    show(evt, element) {
        if (
            !element &&
            evt &&
            evt.detail &&
            evt.detail.element
        ) {
            element = evt.detail.element
        }

        if (
            !element ||
            element.classList.contains('show')
        ) {
            return;
        }

        const panel = element.nextElementSibling;
        element.classList.add('show');
        element.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + 60 + 'px');
        MiscEvent.dispatch('accessibility:show', {'element': panel});
        panel.style.visibility = 'visible';
    }

    hide(evt, element) {
        if (!element) {
            if (
                evt &&
                evt.detail &&
                evt.detail.element
            ) {
                element = evt.detail.element
            } else if (
                evt.type === 'keyUp:escape' &&
                document.activeElement
            ) {
                const collapserElement = document.activeElement.closest('.ds44-collapser_element');
                if (collapserElement) {
                    element = collapserElement.querySelector('.ds44-collapser_button')
                }
            }
        }

        if (
            !element ||
            !element.classList.contains('show')
        ) {
            return;
        }

        const panel = element.nextElementSibling;
        element.classList.remove('show');
        element.removeAttribute('aria-expanded');
        panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + 60 + 'px');
        MiscEvent.dispatch('accessibility:hide', {'element': panel});
        panel.style.visibility = 'hidden';
    }

    manageFocus() {
        if (!document.activeElement) {
            return;
        }

        const element = document.activeElement.closest('.ds44-collapser_element');
        if(!element) {
            return;
        }

        const button = element.querySelector('.ds44-collapser_button')
        if(!button) {
            return;
        }

        if (!button.classList.contains('show')) {
            button.click();
        }
    }
}

// Singleton
new Collapser();
