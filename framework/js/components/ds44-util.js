function getSiblings(elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};

// Détermine si une valeur est null ou undefined
function isNullOrUndefined(el) {
    return el == null || el == undefined || "null" == el || "undefined" == el;
}

// Ajoute la classe "show" sur un élément après un timer
function timerShow(elem, timer) {
    setTimeout(function() {
        elem.classList.add('show');
    }, timer);
}

// Ajoute le style css "display: none" sur un élément après un timer
function timerDisplayNone(elem, timer) {
    setTimeout(function() {
        elem.style.display = 'none';
    }, timer);
}

function timerClass(elem, className, value, timer) {
    setTimeout(function() {
        elem.style[className] = value;
    }, timer);
}

function getFirstFocusableElement() {
	var currentFocusable = document.querySelectorAll(queryCurrentFocusableElements);
	if (currentFocusable == undefined) return null;
	return currentFocusable[0];
}

function getLastFocusableElement() {
	var currentFocusable = document.querySelectorAll(queryCurrentFocusableElements);
	if (currentFocusable == undefined) return null;
	return currentFocusable[currentFocusable.length - 1];
}

function fusionneKeyPressedWithClicked(event) {
  if(event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    event.target.click();
  }
}
