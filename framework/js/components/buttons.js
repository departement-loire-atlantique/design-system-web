'use strict';

class Buttons {
	
	constructor() {

	}

	static displayAllCloseBtns() {
		// Ré-afficher tous les boutons "fermer"
        const allCloseButtons = document.querySelectorAll('.ds44-btnOverlay--closeOverlay');
        allCloseButtons.forEach((element) => {
          element.style.display = "block";
        });
	}

}

// Singleton
new Buttons();