
(function (window) {
	function ds44_headerAnim() {
		var _ds44_headerAnim = {};

		// Génère dynamiquement la largeur du bandeau en fonction de la page
	    _ds44_headerAnim.refreshBandeauWidth = function() {
	    	var bandeau = document.querySelector(".ds44-blocBandeau");
	    	if (bandeau == undefined) return;
	    	if (window.innerWidth <= 576) {
	    		bandeau.style.width = 'calc(100% - 2rem)';
	    		return;
	    	}
	    	var referenceComponent = document.querySelector("main .ds44-container-fluid");
	    	var referenceStyle = window.getComputedStyle(referenceComponent);
	    	var padding = parseFloat(referenceStyle.paddingLeft) + parseFloat(referenceStyle.paddingRight);
	    	bandeau.style.width = (referenceComponent.offsetWidth - padding) + "px";
	    }

	    // Génère dynamiquement le padding-top du body en fonction de la hauteur du bandeau
	    _ds44_headerAnim.refreshBodyPadding = function() {
			var bandeau = document.querySelector(".ds44-blocBandeau");
			if (bandeau == undefined) return;
			var body = document.querySelector("body");
			body.style.paddingTop = (bandeau.offsetHeight) + "px";
	    }

	    // Sur le focus au clavier d'un élément caché sous le header,
	    //effectuer un scroll vers le haut pour que l'élément soit affiché
	    _ds44_headerAnim.checkFocusPosition= function() {
	    	var header = document.querySelector(".ds44-header");
	    	if (header == undefined) return;
	    	
	    	document.addEventListener('keyup', (event) => {
	    		if (event.key === "Tab") {
	    			var activeElement = document.activeElement;
	    			if (header.contains(activeElement)) return;
	    			var threshold = header.classList.contains("hidden") ? header.getBoundingClientRect().bottom + 100 : header.getBoundingClientRect().bottom;
	    			if (activeElement.getBoundingClientRect().top < threshold) {
	    				window.scrollBy(0, (150 - activeElement.getBoundingClientRect().top) * -1);
	    			}
	    		}
	    	});
	    }

	    // Gérer le comportement du header en fonction des scrolls
	    // Source : https://codepen.io/tutsplus/pen/WNerWWp
	    _ds44_headerAnim.enableScrollActions = function() {
			var lastScroll = 0;
			var header = document.querySelector(".ds44-header");
			if (header == undefined) return;

	    	window.addEventListener("scroll", () =>{
	    		setTimeout(function() {
	    			const currentScroll = window.pageYOffset;

					if (currentScroll == 0) {
						header.classList.remove("hidden");
						header.removeAttribute("aria-hidden");
						if (document.activeElement == document.querySelector("html"))  {
							setTimeout(function() {
						      document.querySelector('.ds44-btn--menu').focus();
						    }, 100);
						}
						return;
					}

					if (currentScroll > lastScroll && !header.classList.contains("hidden")) {
						// Scroll vers le bas
						header.classList.add("hidden");
						header.setAttribute("aria-hidden", "true");
					} else if (currentScroll < lastScroll && header.classList.contains("hidden")) {
						// up
						header.classList.remove("hidden");
						header.removeAttribute("aria-hidden");
					}

					lastScroll = currentScroll;
	    		}, 100)
	    	});
	    }

	    return _ds44_headerAnim;
	}
	if (typeof (window.ds44_headerAnim) === 'undefined') {
        window.ds44_headerAnim = ds44_headerAnim();
    }
})(window);

if (document.querySelector(".ds44-blocBandeau") != undefined) {
ds44_headerAnim.checkFocusPosition();

function performAllRefreshes() {
	ds44_headerAnim.refreshBandeauWidth();
	ds44_headerAnim.refreshBodyPadding();
}

performAllRefreshes();

window.onresize = performAllRefreshes;

ds44_headerAnim.enableScrollActions();
}


