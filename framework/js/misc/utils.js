class Utils {
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
}
