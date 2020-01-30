'use strict';

class Utils {

    constructor() {}

    static fusionneKeyPressedWithClicked(event) {
      if(event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        event.target.click();
      }
    }

    static getPositionY(element) {
        var yPosition = 0;

        while(element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }

    static accessibilityHide(element) {
        if (!element) return;
        element.setAttribute('aria-hidden', 'true');
        TabIndex.disableTabIndex(element);
    }

    static accessibilityShow(element) {
        if (!element) return;
        element.removeAttribute('aria-hidden');
        TabIndex.enableTabIndex(element);
    }

    // Ajoute le style css "display: none" sur un élément après un timer
    static timerDisplayNone(elem, timer) {
        setTimeout(function() {
            elem.style.display = 'none';
        }, timer);
    }

    static timerClass(elem, className, value, timer) {
        setTimeout(function() {
            elem.style[className] = value;
        }, timer);
    }

}