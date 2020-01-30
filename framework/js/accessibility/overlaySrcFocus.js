'use strict';

class OverlaySrcFocus {

    constructor() {
        // Ajouter un event listener sur les boutons qui ouvrent un overlay / modale
        document.querySelectorAll('[data-open-overlay="true"]').forEach((element) => {
            element.addEventListener('click', this.designElementAsOverlaySrc.bind(this));
        });

        document.addEventListener('overlay:hide', this.removeDesignatedOverlaySrc.bind(this));
        document.addEventListener('modal:hide', this.removeDesignatedOverlaySrc.bind(this));
    }

    // Ajoute un attribut à un élément pour le désigner en tant que source d'une ouverture d'overlay
    designElementAsOverlaySrc(evt) {
        evt.currentTarget.setAttribute('data-src-overlay','true');
    }

    // Retire l'attribut désignant un élément comme source d'ouverture d'overlay et focus sur cet élément
    removeDesignatedOverlaySrc() {
        let itDesignatedElem = document.querySelector('[data-src-overlay="true"]');

        if (!itDesignatedElem) {
            return;
        }

        itDesignatedElem.removeAttribute('data-src-overlay');
        itDesignatedElem.focus();
    }

}

// Singleton
new OverlaySrcFocus();