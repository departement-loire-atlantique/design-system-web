class TabStandardClass extends TabAbstract {
    constructor () {
        super("TabStandard", '.js-tabs:not(.ds44-choiceYN)');
    }
}
// Singleton
var TabStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new TabStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new TabStandard();
