class MiscDom {
    static getAttribute(element, attributeName, defautValue = null) {
        return (element.hasAttribute(attributeName) === true ? element.getAttribute(attributeName) : defautValue);
    }

    static addClasses(element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            element.classList.add(classNames[index]);
        }
    }

    static removeClasses(element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            element.classList.remove(classNames[index]);
        }
    }

    static hasClass(element, className) {
        return element.classList.contains(className);
    }

    static getOffset(element) {
        let rect = element.getBoundingClientRect();
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            'top': rect.top + scrollTop,
            'left': rect.left + scrollLeft
        };
    }

    static getPreviousSibling(element, selector) {
        let sibling = element.previousElementSibling;
        if (!selector) {
            return sibling;
        }

        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
    };

    static getNextSibling(element, selector) {
        let sibling = element.nextElementSibling;
        if (!selector) {
            return sibling;
        }

        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.nextElementSibling;
        }
    };
}
