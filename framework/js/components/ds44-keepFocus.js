// supprime les éléments focusables ajoutés via JS
function deleteOtherFocus() {
	console.log("YAAAY");
	let hiddenFocusElems = document.querySelectorAll(".ds44-tmpFocusHidden");
	hiddenFocusElems.forEach((itFocusElem) => {
		itFocusElem.remove();
    });
    let firstFocusableElem = document.querySelector(".ds44-tmpFirstFocus");
    let lastFocusableElem = document.querySelector(".ds44-tmpLastFocus");
    if (!isNullOrUndefined(firstFocusableElem)) firstFocusableElem.classList.remove("ds44-tmpFirstFocus");
    if (!isNullOrUndefined(lastFocusableElem)) lastFocusableElem.classList.remove("ds44-tmpLastFocus");
}

// Fonction qui va forcer le focus à faire une boucle sur un élément
// en ajoutant deux inputs "hidden" qui peuvent être focus, au début
// et à la fin
function trapFocus(element) {
	deleteOtherFocus();

	var focusableEls = element.querySelectorAll(queryAllFocusableElements);

	if (focusableEls.length <= 0) return;

	let firstFocusableElem = focusableEls[0];
	let lastFocusableElem = focusableEls[focusableEls.length-1];

	firstFocusableElem.classList.add("ds44-tmpFirstFocus");
	lastFocusableElem.classList.add("ds44-tmpLastFocus");

	let tmpFocusBegin = document.createElement("a");
	tmpFocusBegin.classList.add("ds44-tmpFocusHidden");
	tmpFocusBegin.setAttribute("tabindex", "0");
	tmpFocusBegin.setAttribute("onfocus", "focusBackToElement('.ds44-tmpLastFocus');");

	let tmpFocusEnd = document.createElement("input");
	tmpFocusEnd.classList.add("ds44-tmpFocusHidden");
	tmpFocusEnd.setAttribute("tabindex", "0");
	tmpFocusEnd.setAttribute("onfocus", "focusBackToElement('.ds44-tmpFirstFocus');");

	element.prepend(tmpFocusBegin);
    element.appendChild(tmpFocusEnd);
}

// Remettre le focus sur un élément précis
function focusBackToElement(query) {
	let itElem = document.querySelector(query);
	if (!isNullOrUndefined(itElem)) itElem.focus();
}