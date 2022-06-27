class TimelineStandardClass {
    constructor () {
        MiscEvent.addListener('load', this.start.bind(this), window);
    }

    start () {
        if (document.querySelector('[data-aos]')) {
            AOS.init();
        }
    }
}
// Singleton
var TimelineStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new TimelineStandardClass();
        }
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new TimelineStandard();