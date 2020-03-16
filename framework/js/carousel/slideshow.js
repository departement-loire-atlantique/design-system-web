class CarouselSlideshow extends CarouselAbstract {
    constructor () {
        super('.swipper-carousel-wrap.swipper-carousel-slideshow');
    }

    create (wrapElement) {
        super.create(wrapElement);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.isPlaying = true;

        MiscEvent.addListener('mouseenter', this.hoverStop.bind(this, objectIndex), object.wrapElement);
        MiscEvent.addListener('mouseleave', this.hoverStart.bind(this, objectIndex), object.wrapElement);

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

        return swiperParameters;
    }

    hoverStart (objectIndex, evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.isPlaying) {
            return;
        }

        this.start(objectIndex);
    }

    hoverStop (objectIndex, evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.isPlaying) {
            return;
        }

        this.stop(objectIndex);
    }

    startStop (objectIndex) {
        const object = this.objects[objectIndex];

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
        // Get all slideshows in the same section
        const objects = [];
        const parentElement = (this.objects[objectIndex].wrapElement.closest('section') || this.objects[objectIndex].wrapElement.parentElement);
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
                    spanElement.innerText = spanElement.innerText.replace('Lancer ', 'Arrêter ');
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
                    spanElement.innerText = spanElement.innerText.replace('Arrêter ', 'Lancer ');
                }
            }
        }
    }
}

// Singleton
new CarouselSlideshow();
