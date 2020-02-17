class Overlay {
    constructor() {
        this.triggerElement = null;
        this.modal = null;

        this.hideListener = this.hide.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        // Events
        MiscEvent.addListener('keyUp:escape', this.hideListener);
        MiscEvent.addListener('loader:show', this.showLoader.bind(this));
        MiscEvent.addListener('loader:hide', this.hideLoader.bind(this));

        // Ajouter un event listener sur les boutons qui ouvrent un overlay / modale
        document
            .querySelectorAll('[data-js="ds44-modal"]')
            .forEach((element) => {
                MiscEvent.addListener('click', this.show.bind(this), element);
            });
        document
            .querySelectorAll('.ds44-modal-container .ds44-btnOverlay--closeOverlay')
            .forEach((element) => {
                MiscEvent.addListener('click', this.hideListener, element);
            });

        document
            .querySelectorAll('.ds44-modal-container')
            .forEach((element) => {
                MiscAccessibility.hide(element);
            });
    }

    // Ouvre un overlay
    show(evt) {
        if(evt) {
            evt.stopPropagation();
        }

        if(this.modal) {
            this.hide();
        }

        const modalId = evt.currentTarget.getAttribute('data-target');
        if (!modalId) {
            return;
        }

        // Get corresponding modal
        const modal = document.querySelector(modalId);
        if (!modal) {
            return;
        }

        // Get corresponding close button
        const closeButton = modal.querySelector('[data-js="ds44-modal-action-close"]');
        if (!closeButton) {
            return;
        }

        // Record the element that triggered the overlay
        this.triggerElement = evt.currentTarget;
        this.modal = modal;

        // Show modal
        document.body.style.overflow = 'hidden';
        this.modal.classList.add('show');

        // Set focus in modal
        const firstField = this.modal.querySelector('input, button, textarea, a, select')
        if (firstField) {
            MiscAccessibility.setFocus(firstField);
        } else {
            MiscAccessibility.setFocus(closeButton);
        }

        MiscAccessibility.show(this.modal);
        MiscAccessibility.addFocusLoop(
            this.modal,
            this.modal.querySelector('#' + this.modal.getAttribute('aria-labelledby')).innerText
        );
        MiscEvent.dispatch('overlay:show', {'element': this.modal});

        MiscEvent.addListener('click', this.hideListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.modal);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    // Ferme tous les overlays, et ajoute un focus sur le bouton qui a ouvert le dernier overlay affiché
    hide(evt) {
        if(evt) {
            evt.stopPropagation();
        }

        // Get current modal
        if(!this.modal) {
            return;
        }

        // Get corresponding close button
        const closeButton = this.modal.querySelector('[data-js="ds44-modal-action-close"]');
        if (!closeButton) {
            return;
        }

        MiscEvent.removeListener('click', this.hideListener, closeButton);
        MiscEvent.removeListener('focusout', this.focusOutListener, this.modal);
        MiscEvent.removeListener('click', this.clickOutListener, document.body);

        MiscAccessibility.hide(this.modal);
        MiscAccessibility.removeFocusLoop();

        document.body.style.overflow = null;
        this.modal.classList.remove('show');

        if (this.triggerElement) {
            MiscAccessibility.setFocus(this.triggerElement)
        }

        this.triggerElement = null;
        this.modal = null;

        MiscEvent.dispatch('overlay:hide');
    }

    focusOut(evt) {
        evt.stopPropagation();

        if (!evt.target || !this.modal.contains(evt.target)) {
            MiscAccessibility.setFocus(this.modal.querySelector('input, button, textarea, a, select'));
            return;
        }

        MiscAccessibility.setFocus(this.modal);
    }

    clickOut(evt) {
        if (evt.target && this.modal.contains(evt.target)) {
            return;
        }

        this.hide();
    }

    showLoader() {
        if(!this.modal) {
            return;
        }

        MiscAccessibility.hide(this.modal);
    }

    hideLoader() {
        if(!this.modal) {
            return;
        }

        MiscAccessibility.show(this.modal);
    }
}

// Singleton
new Overlay();
