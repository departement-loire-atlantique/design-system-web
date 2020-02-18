class Carousel {
    constructor() {
        this.previousSlideMessage = 'Voir le contenu précédent';
        this.nextSlideMessage = 'Voir le contenu suivant';
        this.queryTitreTuile = '.ds44-card__title a[href]:not([disabled])';
        this.carousels = [];
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        document
            .querySelectorAll('.swipper-carousel-wrap')
            .forEach((wrapElement, carouselIndex) => {
                const previousElement = wrapElement.querySelector('.swiper-button-prev');
                const nextElement = wrapElement.querySelector('.swiper-button-next');
                const wrapperElement = wrapElement.querySelector('.swiper-wrapper');
                const swiperElement = wrapElement.querySelector('.swiper-container');
                if (
                    !previousElement ||
                    !nextElement ||
                    !wrapperElement ||
                    !swiperElement
                ) {
                    return;
                }

                const slides = swiperElement.querySelectorAll('.swiper-slide');
                if (!slides.length) {
                    return;
                }

                const nbSlides = slides.length;
                let nbVisibleSlides = 1;
                let hasLoop = (nbSlides > 1);
                if (screenWidth >= 768) {
                    nbVisibleSlides = wrapperElement.classList.contains('grid-3-small-1') ? 3 : 4;
                    hasLoop = (nbSlides > nbVisibleSlides);
                }

                wrapperElement.classList.remove('ds44-carousel-swiper');

                const notification = wrapperElement.querySelector('.swiper-notification');
                if (notification) {
                    notification.remove();
                }

                // Create swiper
                this.carousels[carouselIndex] = {
                    'wrapElement': wrapElement,
                    'nextElement': nextElement,
                    'previousElement': previousElement,
                    'swiperElement': swiperElement,
                    'slides': slides,
                    'nbSlides': nbSlides,
                    'nbVisibleSlides': nbVisibleSlides,
                    'setFocus': false,
                    'swiper': new Swiper(
                        swiperElement,
                        {
                            init: false,
                            direction: 'horizontal',
                            spaceBetween: 16,
                            watchOverflow: true,
                            watchSlidesVisibility: true,
                            navigation: {
                                nextEl: nextElement,
                                prevEl: previousElement,
                            },
                            slidesPerView: nbVisibleSlides,
                            loop: hasLoop,
                        }
                    )
                };

                // si on loop, il faut gerer la navigation des tuiles avec les differents event de swiper
                // cela implique d'initialiser et mettre a jour l'apparence des boutons de navigation et des tuiles du carousel
                if (hasLoop) {
                    wrapperElement.classList.remove('grid-4-small-1');
                    wrapperElement.classList.remove('grid-3-small-1');
                    this.carousels[carouselIndex].swiper.on(
                        'init',
                        this.startSwiper.bind(this, carouselIndex)
                    );
                    this.carousels[carouselIndex].swiper.on(
                        'slideChangeTransitionEnd',
                        ((carouselIndex) => {
                            this.updatePreviousAndNextSlideMessage(carouselIndex);
                            this.updateCardAccessibility(carouselIndex);
                        }).bind(this, carouselIndex)
                    );

                    this.carousels[carouselIndex].swiper.init();
                }
            });
    }

    startSwiper(carouselIndex) {
        const carousel = this.carousels[carouselIndex];
        [carousel.nextElement, carousel.previousElement]
            .forEach(button => {
                button.classList.remove('swiper-button-disabled');
                button.removeAttribute('aria-label');
                button.removeAttribute('role');

                const ua = navigator.userAgent;
                if (!ua.includes('Edge/42')) {
                    button.classList.add('ds44-not-edge-42');
                }
            });
    }

    updatePreviousAndNextSlideMessage(carouselIndex) {
        const carousel = this.carousels[carouselIndex];

        let titleElement = null;
        let blocTitleElement = carousel.wrapElement.previousElementSibling;
        if (blocTitleElement) {
            // on est dans le composant simple
            titleElement = blocTitleElement;
        } else {
            // on est dans une page
            blocTitleElement = carousel.wrapElement.parentElement.previousElementSibling;
            if (blocTitleElement) {
                titleElement = blocTitleElement.querySelector('.h2-like');
            }
        }

        const titleCarousel = (titleElement ? titleElement.innerText : 'Carousel n°' + (carouselIndex + 1));
        const indexPreviousElement = (carousel.swiper.realIndex === 0 ? carousel.nbSlides : carousel.swiper.realIndex);
        let indexNextElement = carousel.swiper.realIndex + carousel.nbVisibleSlides + 1;
        if (indexNextElement > carousel.nbSlides) {
            indexNextElement -= carousel.nbSlides;
        }

        const titlePreviousElement = this.previousSlideMessage + ' ' + titleCarousel + ' - ' + indexPreviousElement + '/' + carousel.nbSlides;
        const titleNextElement = this.nextSlideMessage + ' ' + titleCarousel + ' - ' + indexNextElement + '/' + carousel.nbSlides;
        carousel.previousElement.setAttribute('title', titlePreviousElement);
        carousel.nextElement.setAttribute('title', titleNextElement);

        const innerTextNextElement = carousel.nextElement.querySelector('.visually-hidden');
        if (innerTextNextElement) {
            innerTextNextElement.innerText = titleNextElement;
        }
        const innerTextPreviousElement = carousel.previousElement.querySelector('.visually-hidden');
        if (innerTextPreviousElement) {
            innerTextPreviousElement.innerText = titlePreviousElement;
        }
    }

    // Met a jour la visibilite des tuiles en fonction du placement et du nombre de tuile visible
    updateCardAccessibility(carouselIndex) {
        const carousel = this.carousels[carouselIndex];

        let isFirstVisibleSlide = true;
        carousel.swiperElement
            .querySelectorAll('.swiper-slide')
            .forEach((slide) => {
                if (slide.classList.contains('swiper-slide-visible')) {
                    // Show slide
                    MiscAccessibility.show(slide, true);
                    if (carousel.setFocus && isFirstVisibleSlide) {
                        isFirstVisibleSlide = false;
                        MiscAccessibility.setFocus(slide.querySelector(this.queryTitreTuile));
                    }
                } else {
                    // Hide slide
                    MiscAccessibility.hide(slide, true);
                }
            });

        carousel.setFocus = true;
    }
}

// Singleton
new Carousel();
