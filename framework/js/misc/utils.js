class MiscUtils {
    static getPositionY (element) {
        let yPosition = 0;

        while (element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }

    static generateId () {
        return 'id' + Math.random().toString(36).substring(2, 15);
    }

    static isInDevMode () {
        return (document.location.hostname === 'localhost');
    }


}
