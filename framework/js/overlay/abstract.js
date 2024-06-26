class OverlayAbstract {
    constructor (className, selector) {
        this.className = className;
        this.selector = selector;
        Debug.log(this.className+" -> Constructor");

        this.triggerElement = null;
        this.modal = null;
        this.visibilityCounter = 0;

        this.hideListener = this.hide.bind(this);
        this.focusOutListener = this.focusOut.bind(this);
        this.clickOutListener = this.clickOut.bind(this);

        // Events
        MiscEvent.addListener('keyUp:escape', this.hideListener);
        MiscEvent.addListener('loader:show', this.showLoader.bind(this));
        MiscEvent.addListener('loader:hide', this.hideLoader.bind(this));
    }

    initialise() {
        Debug.log(this.className+" -> Initialise");
        // Ajouter un event listener sur les boutons qui ouvrent un overlay / modale
        document
          .querySelectorAll(this.selector)
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
    show (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        if (this.modal) {
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

        // Dynamically fill modal
        this.fill();

        // Show modal
        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        this.modal.classList.add('show');

        // Set focus in modal
        MiscAccessibility.show(this.modal);
        const firstField = this.modal.querySelector('input, button, textarea, a, select')
        if (firstField) {
            MiscAccessibility.setFocus(firstField);
        } else {
            MiscAccessibility.setFocus(closeButton);
        }
        MiscAccessibility.addFocusLoop(this.modal);
        MiscEvent.dispatch('overlay:show', { 'element': this.modal });

        MiscEvent.addListener('click', this.hideListener, closeButton);
        MiscEvent.addListener('focusout', this.focusOutListener, this.modal);
        MiscEvent.addListener('click', this.clickOutListener, document.body);
    }

    fill () {
        // Abstract method
    }

    // Ferme tous les overlays, et ajoute un focus sur le bouton qui a ouvert le dernier overlay affiché
    hide (evt) {
        if (evt) {
            evt.stopPropagation();
        }

        // Get current modal
        if (!this.modal) {
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
        MiscEvent.dispatch('resize', null, window);
        this.modal.classList.remove('show');

        if (this.triggerElement) {
            MiscAccessibility.setFocus(this.triggerElement);
            if(this.triggerElement.querySelector("button")) {
                MiscAccessibility.setFocus(this.triggerElement.querySelector("button"));
            }
        }

        this.triggerElement = null;
        this.modal = null;

        MiscEvent.dispatch('overlay:hide');
    }

    focusOut (evt) {
        evt.stopPropagation();

        if (!evt.target || !this.modal.contains(evt.target)) {
            MiscAccessibility.setFocus(this.modal.querySelector('input, button, textarea, a, select'));
            return;
        }
    }

    clickOut (evt) {
        if (evt.target && this.modal.contains(evt.target)) {
            return;
        }

        this.hide();
    }

    showLoader () {
        if (!this.modal) {
            return;
        }

        if (this.visibilityCounter === 0) {
            MiscAccessibility.hide(this.modal, true, false);
        }
        this.visibilityCounter--;
    }

    hideLoader () {
        if (!this.modal) {
            return;
        }

        this.visibilityCounter = Math.min(0, (this.visibilityCounter + 1));
        if (this.visibilityCounter === 0) {
            MiscAccessibility.show(this.modal, true, false);
        }
    }
}
