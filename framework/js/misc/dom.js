class MiscDom {
    static getAttribute (element, attributeName, defautValue = null) {
        return (element.hasAttribute(attributeName) === true ? element.getAttribute(attributeName) : defautValue);
    }

    static addClasses (element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            if (!classNames.hasOwnProperty(index)) {
                continue;
            }

            element.classList.add(classNames[index]);
        }
    }

    static removeClasses (element, classNames) {
        if (typeof classNames === 'string') {
            classNames = [classNames];
        }

        for (let index in classNames) {
            if (!classNames.hasOwnProperty(index)) {
                continue;
            }

            element.classList.remove(classNames[index]);
        }
    }

    static hasClass (element, className) {
        return element.classList !== undefined ? element.classList.contains(className) : false;
    }

    static getOffset (element) {
        let rect = element.getBoundingClientRect();
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            'top': rect.top + scrollTop,
            'left': rect.left + scrollLeft
        };
    }

    static getPreviousSibling (element, selector) {
        if (!element) {
            return null;
        }

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

    static getNextSibling (element, selector) {
        if (!element) {
            return null;
        }

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

    static getHeaderHeight (force = false) {
        const headerElement = document.querySelector('.ds44-header');
        if (
            !headerElement ||
            (
                headerElement.classList.contains('collapsed') &&
                !force
            )
        ) {
            return 0;
        }

        return headerElement.offsetHeight;
    };

    static changeTagName(element, newTag) {
        let newElement = document.createElement(newTag);
        element.getAttributeNames().forEach((name) => {
            newElement.setAttribute(name, element.getAttribute(name));
        });
        newElement.innerHTML = element.innerHTML;
        element.parentElement.replaceChild(newElement, element);
    }
}
