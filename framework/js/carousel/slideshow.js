class CarouselSlideshowClass extends CarouselAbstract {
    constructor () {
        super("CarouselSlideshow", '.swipper-carousel-wrap.swipper-carousel-slideshow');
    }

    create (wrapElement) {
        super.create(wrapElement);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isPlaying = true;

        object.autoplayButtonElement = object.wrapElement.querySelector('button');
        if (object.autoplayButtonElement) {
            MiscEvent.addListener('click', this.startStop.bind(this, objectIndex), object.autoplayButtonElement);
        }
    }

    getSwiperParameters (object) {
        const swiperParameters = super.getSwiperParameters(object);
        swiperParameters.effect = 'fade';
        swiperParameters.speed = 3000;
        swiperParameters.allowTouchMove = false;
        swiperParameters.autoplay = {
            'delay': 5000
        }

        // Take reduced motion media query into account
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!mediaQuery || mediaQuery.matches) {
            swiperParameters.speed = 0;
        }

        return swiperParameters;
    }

    startStop (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.isPlaying) {
            const objects = this.getSectionObjects(objectIndex);
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];

                object.isPlaying = false;
            }
            this.stop(objectIndex);

            return;
        }

        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.isPlaying = true;
        }
        this.start(objectIndex);
    }

    getSectionObjects (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return [];
        }

        // Get all slideshows in the same section
        const objects = [];
        const parentElement = (object.wrapElement.closest('section') || object.wrapElement.parentElement);
        parentElement
            .querySelectorAll('.swipper-carousel-slideshow')
            .forEach((wrapElement) => {
                for (let objectIndex in this.objects) {
                    if (!this.objects.hasOwnProperty(objectIndex)) {
                        continue;
                    }

                    const object = this.objects[objectIndex];
                    if (object.wrapElement === wrapElement) {
                        objects.push(object);
                    }
                }
            });

        return objects;
    }

    start (objectIndex) {
        // Get all slideshows in the same section
        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.swiper.autoplay.start();

            if (object.autoplayButtonElement) {
                const iconElement = object.autoplayButtonElement.querySelector('i');
                if (iconElement) {
                    iconElement.classList.add('icon-pause');
                    iconElement.classList.remove('icon-play');
                }

                const spanElement = object.autoplayButtonElement.querySelector('span');
                if (spanElement) {
                    spanElement.innerText = spanElement.innerText.replace(MiscTranslate._('START') + ' ', MiscTranslate._('STOP') + ' ');
                }
            }
        }
    }

    stop (objectIndex) {
        // Get all slideshows in the same section
        const objects = this.getSectionObjects(objectIndex);
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.swiper.autoplay.stop();

            if (object.autoplayButtonElement) {
                const iconElement = object.autoplayButtonElement.querySelector('i');
                if (iconElement) {
                    iconElement.classList.add('icon-play');
                    iconElement.classList.remove('icon-pause');
                }

                const spanElement = object.autoplayButtonElement.querySelector('span');
                if (spanElement) {
                    spanElement.innerText = spanElement.innerText.replace(MiscTranslate._('STOP') + ' ', MiscTranslate._('START') + ' ');
                }
            }
        }
    }
}
// Singleton
var CarouselSlideshow = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CarouselSlideshowClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new CarouselSlideshow();