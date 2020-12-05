class KeyboardStandard {
    constructor () {
        MiscEvent.addListener('keyup', this.keyUp.bind(this));
        MiscEvent.addListener('keypress', this.keyPress.bind(this));
        MiscEvent.addListener('keydown', this.keyDown.bind(this));
    }

    keyDown (evt) {
        if (!evt.key) {
            return;
        }

        // Make the space bar or enter act like a mouse click
        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            clickableElement.dispatchEvent(new MouseEvent('mousedown', {
                'bubbles': true,
                'cancelable': true
            }));
            clickableElement.dispatchEvent(new MouseEvent('mouseup', {
                'bubbles': true,
                'cancelable': true
            }));
            clickableElement.dispatchEvent(new MouseEvent('click', {
                'bubbles': true,
                'cancelable': true
            }));

            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        // Prevent non valid characters from being entered in inputs
        if (!this.isValid(evt)) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        const initialActiveElement = document.activeElement;
        const keyName = (evt.key === ' ' ? 'Spacebar' : evt.key);
        MiscEvent.dispatch('keyDown:*');
        MiscEvent.dispatch('keyDown:' + keyName.toLowerCase());
        if (evt.shiftKey) {
            MiscEvent.dispatch('keyDown:shift' + keyName.substr(0, 1).toUpperCase() + keyName.substr(1).toLowerCase());
        }

        // Cancel specific events
        if (this.needCancel(evt, initialActiveElement)) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    keyPress (evt) {
        if (!evt.key) {
            return;
        }

        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        const initialActiveElement = document.activeElement;
        const keyName = (evt.key === ' ' ? 'Spacebar' : evt.key);
        MiscEvent.dispatch('keyPress:*');
        MiscEvent.dispatch('keyPress:' + keyName.toLowerCase());
        if (evt.shiftKey) {
            MiscEvent.dispatch('keyPress:shift' + keyName.substr(0, 1).toUpperCase() + keyName.substr(1).toLowerCase());
        }

        // Cancel specific events
        if (this.needCancel(evt, initialActiveElement)) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    keyUp (evt) {
        if (!evt.key) {
            return;
        }

        const clickableElement = this.getClickableElement(evt);
        if (clickableElement) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }

        const initialActiveElement = document.activeElement;
        const keyName = (evt.key === ' ' ? 'Spacebar' : evt.key);
        MiscEvent.dispatch('keyUp:*');
        MiscEvent.dispatch('keyUp:' + keyName.toLowerCase());
        if (evt.shiftKey) {
            MiscEvent.dispatch('keyUp:shift' + keyName.substr(0, 1).toUpperCase() + keyName.substr(1).toLowerCase());
        }

        // Cancel specific events
        if (this.needCancel(evt, initialActiveElement)) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    getClickableElement (evt) {
        if (!document.activeElement) {
            return null;
        }

        if (evt.key === ' ' || evt.key === 'Spacebar') {
            return document.activeElement.closest('a') ||
                document.activeElement.closest('button') ||
                document.activeElement.closest('[tabindex="0"]');
        }

        if (evt.key === 'Enter') {
            return document.activeElement.closest('[role="option"]');
        }

        return null;
    }

    isValid (evt) {
        if (!document.activeElement) {
            return true;
        }

        const numericElement = document.activeElement.closest('[inputmode="numeric"]');
        if (numericElement) {
            const allowedCharacters = '0123456789';

            if (
                evt.key.length === 1 &&
                allowedCharacters.indexOf(evt.key) === -1
            ) {
                return false;
            }
        }

        return true;
    }

    needCancel (evt, initialActiveElement) {
        if (!initialActiveElement) {
            return false;
        }

        if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
            const withOptionElement = initialActiveElement.closest('.ds44-listSelect,.ds44-autocomp-list');
            if (withOptionElement) {
                return true;
            }
        }

        if (evt.key === 'Tab' && evt.shiftKey) {
            if (initialActiveElement.closest('h2.visually-hidden')) {
                return true;
            }
        }

        return false;
    }
}

// Singleton
new KeyboardStandard();
