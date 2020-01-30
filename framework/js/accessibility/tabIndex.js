'use strict';

class TabIndex {

	constructor() {
		this.performAccessibilityChecks();
	}

	performAccessibilityChecks() {
		let allAriaHiddenElements = document.querySelectorAll('[aria-hidden="true"]');
		if (!allAriaHiddenElements) return;

		allAriaHiddenElements.forEach((itInput) => {
			TabIndex.disableTabIndex(itInput);
		});
	}

	static disableTabIndex(elem) {
		if (!elem) return;

		elem.setAttribute('tabindex', '-1');

		if (!elem.children) return;

		Array.prototype.slice.call(elem.children).forEach((itChild) => {
			TabIndex.disableTabIndex(itChild);
		});
	}

	static enableTabIndex(elem) {
		if (!elem) return;
		if (elem.getAttribute('aria-hidden') == 'true') return;

		elem.removeAttribute('tabindex');

		if (!elem.children) return;

		Array.prototype.slice.call(elem.children).forEach((itChild) => {
			TabIndex.enableTabIndex(itChild);
		});
	}

}

// Singleton
new TabIndex();