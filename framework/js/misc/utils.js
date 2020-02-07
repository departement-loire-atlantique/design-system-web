class MiscUtils {
    static getPositionY(element) {
        let yPosition = 0;

        while (element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }

    static timerClass(element, className, value, timer) {
        setTimeout(function () {
            element.style[className] = value;
        }, timer);
    }

    static generateId() {
        return 'id' + Math.random().toString(36).substring(2, 15);
    }
}
