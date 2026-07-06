class CarouselStandardClass extends CarouselAbstract {
    constructor () {
        super("CarouselStandard",'.swipper-carousel-wrap:not(.swipper-carousel-slideshow)');
    }

    showSlide (slideElement) {
        super.showSlide(slideElement);

        const aElement = slideElement.querySelector('a');
        if (!aElement) {
            slideElement.setAttribute('tabindex', '0');
        }
    }

    hideSlide (slideElement) {
        super.hideSlide(slideElement);

        const aElement = slideElement.querySelector('a');
        if (!aElement) {
            slideElement.removeAttribute('tabindex');
        }
    }
}
// Singleton
var CarouselStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CarouselStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new CarouselStandard();
