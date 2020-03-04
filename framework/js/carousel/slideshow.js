class CarouselSlideshow extends CarouselAbstract {
    constructor() {
        super('.swipper-carousel-wrap.swipper-carousel-slideshow');
    }

    create(wrapElement) {
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

    getSwiperParameters(object) {
        const swiperParameters = super.getSwiperParameters(object);
        swiperParameters.effect = 'fade';
        swiperParameters.autoplay = {
            'delay': 5000
        }

        return swiperParameters;
    }

    hoverStart(objectIndex, evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.isPlaying) {
            return;
        }

        this.start(objectIndex);
    }

    hoverStop(objectIndex, evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.isPlaying) {
            return;
        }

        this.stop(objectIndex);
    }

    startStop(objectIndex) {
        const object = this.objects[objectIndex];

        if (object.isPlaying) {
            object.isPlaying = false;
            this.stop(objectIndex);

            return;
        }

        object.isPlaying = true;
        this.start(objectIndex);
    }

    start(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.autoplayButtonElement) {
            return;
        }

        object.swiper.autoplay.start();

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

    stop(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.autoplayButtonElement) {
            return;
        }

        object.swiper.autoplay.stop();

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

// Singleton
new CarouselSlideshow();
