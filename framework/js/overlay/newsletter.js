class OverlayNewsletterClass {
    constructor () {
        Debug.log("OverlayNewsletter -> Constructor");
    }

    initialise() {
        Debug.log("OverlayNewsletter -> Initialise");
        const buttonsElements = document.querySelectorAll('#overlay-newsletter-buttons button');
        if (buttonsElements.length === 0) {
            return;
        }

        MiscEvent.addListener('click', this.checkAll.bind(this), buttonsElements[0]);
        MiscEvent.addListener('click', this.uncheckAll.bind(this), buttonsElements[1]);
    }

    checkAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = true;
            })
    }

    uncheckAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = false;
            })
    }
}
// Singleton
var OverlayNewsletter = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new OverlayNewsletterClass("OverlayNewsletter", '[data-js="ds44-modal"][data-target="#overlay-mosaique"]');
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new OverlayNewsletter();


class OverlayNewsletterArchivesClass {
    constructor () {
        Debug.log("OverlayNewsletterArchives -> Constructor");
    }

    initialise() {
        Debug.log("OverlayNewsletterArchives -> Initialise");
        const buttonsElements = document.querySelectorAll('#overlay-newsletter-buttons-archives button');
        if (buttonsElements.length === 0) {
            return;
        }

        MiscEvent.addListener('click', this.checkAll.bind(this), buttonsElements[0]);
        MiscEvent.addListener('click', this.uncheckAll.bind(this), buttonsElements[1]);
    }

    checkAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = true;
            })
    }

    uncheckAll (evt) {
        evt.currentTarget.closest('form')
            .querySelectorAll('input[type="checkbox"]')
            .forEach((checkboxElement) => {
                checkboxElement.checked = false;
            })
    }
}
// Singleton
var OverlayNewsletterArchives = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new OverlayNewsletterArchivesClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new OverlayNewsletterArchives();
