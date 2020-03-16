class CarouselStandard extends CarouselAbstract {
    constructor () {
        super('.swipper-carousel-wrap:not(.swipper-carousel-slideshow)');
    }
}

// Singleton
new CarouselStandard();
