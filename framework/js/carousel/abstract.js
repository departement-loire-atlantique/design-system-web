class CarouselAbstract {
    constructor (className, selector) {
        this.selector = selector;
        this.className = className;
        Debug.log(this.className+" -> Constructor");
        this.previousSlideMessage = MiscTranslate._('CAROUSEL_WATCH_PREVIOUS_CONTENT');
        this.nextSlideMessage = MiscTranslate._('CAROUSEL_WATCH_NEXT_CONTENT');
        this.queryTitreTuile = '.ds44-card__title a[href]:not([disabled])';
        this.objects = [];
        this.breakpoint = window.matchMedia('(max-width: 63.375em)');
        MiscEvent.addListener('resize', this.resize.bind(this), window);
        window.setTimeout(
          () => {
              MiscEvent.dispatch('resize', null, window);
          },
          1000
        );

        this.breakpoint.addListener(this.breakpointChecker.bind(this));
    }

    clearObject() {
        Debug.log(this.className+" -> Clear object");
        this.objects = [];
    }

    initialise()
    {
        Debug.log(this.className+" -> Initialise");
        document
          .querySelectorAll(this.selector)
          .forEach((wrapElement) => {
            if(MiscComponent.checkAndCreate(wrapElement, "carousel"))
            {
                this.create(wrapElement);
            }
        });
        this.breakpointChecker();
    }

    create (wrapElement) {
        const swiperElement = wrapElement.querySelector('.swiper-container');
        const wrapperElement = wrapElement.querySelector('.swiper-wrapper');
        if (
            !swiperElement ||
            !wrapperElement
        ) {
            return;
        }

        const slideElements = swiperElement.querySelectorAll('.swiper-slide');
        if (!slideElements.length) {
            return;
        }

        // Get nb visible slides
        const nbSlides = slideElements.length;
        const nbVisibleSlides = parseInt(wrapElement.getAttribute('data-nb-visible-slides'), 10);
        const mobileOnly = (wrapElement.getAttribute('data-mobile-only') === 'true');

        // Create object
        const object = {
            'wrapElement': wrapElement,
            'wrapperElement': wrapperElement,
            'swiperElement': swiperElement,
            'nbSlides': nbSlides,
            'nbVisibleSlides': nbVisibleSlides,
            'mobileOnly': mobileOnly,
            'isInitialized': false
        };

        const paginationElement = wrapElement.querySelector('.swiper-pagination');
        if (paginationElement && nbSlides > nbVisibleSlides) {
            object.paginationElement = paginationElement;
        }
        const previousElement = wrapElement.querySelector('.swiper-button-prev');
        if (previousElement) {
            object.previousElement = previousElement;
        }
        const nextElement = wrapElement.querySelector('.swiper-button-next');
        if (nextElement) {
            object.nextElement = nextElement;
        }
        const galleryElement = MiscDom.getNextSibling(swiperElement, '.swiper-thumbs');
        if (galleryElement) {
            object.galleryElement = galleryElement;
        }

        // Record object
        this.objects.push(object);
    }

    createSwipper (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || object.swiper) {
            return;
        }

        // Component initialization in full JS mode
        object.wrapperElement.classList.remove.apply(
            object.wrapperElement.classList,
            Array.from(object.wrapperElement.classList).filter(className => className.startsWith('grid-'))
        );

        object.swiper = new Swiper(
            object.swiperElement,
            this.getSwiperParameters(object)
        );

        object.swiper.on('slidePrevTransitionEnd', this.slide.bind(this, objectIndex, 'backward'));
        object.swiper.on('slideNextTransitionEnd', this.slide.bind(this, objectIndex, 'forward'));

        object.swiper.init();
        object.isInitialized = true;

        // Enable previous and next buttons
        if (object.previousElement && object.nextElement) {
            [object.previousElement, object.nextElement]
                .forEach(button => {
                    button.classList.remove('swiper-button-disabled');

                    const ua = navigator.userAgent;
                    if (!ua.includes('Edge/42')) {
                        button.classList.add('ds44-not-edge-42');
                    }
                });
        }

        if(object.galleryElement) {
            [].forEach.call(object.galleryElement.querySelectorAll('.swiper-slide'), (thumb, i) => {
                MiscEvent.addListener("keyup", (event) => {
                    if(event.key === "Enter") {
                        object.swiper.slideTo(i+1);
                    }
                }, thumb);
            });
        }
    }

    destroySwipper (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.swiper) {
            return;
        }

        object.swiper.destroy(true, true);
        object.swiper = null;
        object.isInitialized = false;

        object.wrapperElement.classList.add('grid-' + object.nbVisibleSlides + '-small-1');

        if (object.previousElement && object.nextElement) {
            [object.previousElement, object.nextElement]
                .forEach(button => {
                    button.classList.add('swiper-button-disabled');
                });
        }
    }

    getSwiperParameters (object) {
        const swiperParameters = {
            'init': false,
            'direction': 'horizontal',
            'spaceBetween': 16,
            'watchOverflow': true,
            'watchSlidesVisibility': true,
            'slidesPerView': 1,
            'loop': true,
            'breakpoints': {
                '768': {
                    'slidesPerView': object.nbVisibleSlides
                }
            },
            'a11y': {
                'enabled': false
            }
        };

        // Take reduced motion media query into account
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!mediaQuery || mediaQuery.matches) {
            swiperParameters.speed = 0;
        }

        if (object.paginationElement) {
            swiperParameters.pagination = {
                'el': object.paginationElement,
                'clickable': true,
                'renderBullet': (index, className) => {
                    const textElements = object.swiperElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) .ds44-diaporama-vignette-text');
                    if (textElements && textElements.length) {
                        return '<p id="' + MiscUtils.generateId() + '"><span class="' + className + '">' + textElements[index].innerHTML + '</span></p>';
                    }

                    if(object.paginationElement.classList.contains("bullet"))
                    {
                        const titleElement = object.swiperElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) .ds44-cardTitle');
                        if (titleElement && titleElement.length) {
                            return '<li class="' + className + '"><span class="entitled visually-hidden">' + titleElement[index].innerHTML + '</span></li>';
                        }
                    }

                    return "";
                }
            }
        }

        if (object.previousElement && object.nextElement) {
            swiperParameters.navigation = {
                'prevEl': object.previousElement,
                'nextEl': object.nextElement
            };
        }

        if (object.galleryElement) {
            const thumbsSwiperParameters = {
                'spaceBetween': 16,
                'slidesPerView': 'auto',
                'freeMode': true,
                'watchSlidesVisibility': true,
                'watchSlidesProgress': true
            }

            if (!mediaQuery || mediaQuery.matches) {
                thumbsSwiperParameters.speed = 0;
            }

            swiperParameters.thumbs = {
                'swiper': (new Swiper(
                    object.galleryElement.querySelector('.swiper-container'),
                    thumbsSwiperParameters
                ))
            };
        }

        return swiperParameters;
    }

    updatePreviousAndNextSlideMessage (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.previousElement || !object.nextElement) {
            return;
        }

        let titleElement = null;
        let titleCarousel = null;
        if(object.wrapElement.hasAttribute("data-swiper-title")) {
            titleCarousel = object.wrapElement.getAttribute("data-swiper-title");
        }
        else {
            let blocTitleElement = object.wrapElement.previousElementSibling;
            if (blocTitleElement) {
                // On est dans le composant simple
                titleElement = blocTitleElement;
            } else {
                // On est dans une page
                blocTitleElement = object.wrapElement.parentElement.previousElementSibling;
                if (blocTitleElement) {
                    titleElement = blocTitleElement.querySelector('.h2-like');
                }
            }
            titleCarousel = (titleElement &&  titleElement.innerText ? titleElement.innerText : 'Carousel n°' + (objectIndex + 1));
        }

        const indexPreviousElement = (object.swiper.realIndex === 0 ? object.nbSlides : object.swiper.realIndex);
        const nbVisibleSlides = object.swiperElement.querySelectorAll('.swiper-slide.swiper-slide-visible').length;
        let indexNextElement = object.swiper.realIndex + nbVisibleSlides + 1;
        if (indexNextElement > object.nbSlides) {
            indexNextElement -= object.nbSlides;
        }

        const titlePreviousElement = MiscAccessibility.flattenText(this.previousSlideMessage + ' : ' + titleCarousel + ' - ' + indexPreviousElement + '/' + object.nbSlides);
        object.previousElement.setAttribute('title', titlePreviousElement);
        const innerTextPreviousElement = object.previousElement.querySelector('.visually-hidden');
        if (innerTextPreviousElement) {
            innerTextPreviousElement.innerText = titlePreviousElement;
        }

        const titleNextElement = MiscAccessibility.flattenText(this.nextSlideMessage + ' : ' + titleCarousel + ' - ' + indexNextElement + '/' + object.nbSlides);
        object.nextElement.setAttribute('title', titleNextElement);
        const innerTextNextElement = object.nextElement.querySelector('.visually-hidden');
        if (innerTextNextElement) {
            innerTextNextElement.innerText = titleNextElement;
        }
    }

    // Met a jour la visibilite des tuiles en fonction du placement et du nombre de tuile visible
    updateCardAccessibility (objectIndex, direction) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.swiperElement
            .querySelectorAll('.swiper-slide')
            .forEach((slideElement) => {
                if (slideElement.classList.contains('swiper-slide-visible')) {
                    // Show slide
                    this.showSlide(slideElement);
                } else {
                    // Hide slide
                    this.hideSlide(slideElement);
                }
                if(slideElement.classList.contains('swiper-slide-active')) {
                    slideElement.setAttribute('aria-current', 'true');
                } else {
                    slideElement.removeAttribute('aria-current');
                }
            });

        if (object.isInitialized) {
            let slideElement = null;
            const visibleSlideElements = object.swiperElement.querySelectorAll('.swiper-slide.swiper-slide-visible');
            if (direction === 'backward') {
                slideElement = visibleSlideElements[0];
            } else {
                slideElement = visibleSlideElements[visibleSlideElements.length - 1];
            }
            if (slideElement) {
                MiscAccessibility.setFocus(slideElement.querySelector(this.queryTitreTuile));
            }
        }
    }

    showSlide (slideElement) {
        MiscAccessibility.show(slideElement);
    }

    hideSlide (slideElement) {
        MiscAccessibility.hide(slideElement);
    }

    slide (objectIndex, direction) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.previousElement && object.nextElement) {
            this.updatePreviousAndNextSlideMessage(objectIndex);
        }
        this.updateCardAccessibility(objectIndex, direction);
    }

    resize () {
        for (let objectIndex in this.objects) {
            if (!this.objects.hasOwnProperty(objectIndex)) {
                continue;
            }

            const object = this.objects[objectIndex];
            if (object && object.swiper && object.previousElement && object.nextElement) {
                this.updatePreviousAndNextSlideMessage(objectIndex);
            }
        }
    }

    breakpointChecker () {
        for (let objectIndex in this.objects) {
            if (!this.objects.hasOwnProperty(objectIndex)) {
                continue;
            }

            const object = this.objects[objectIndex];
            if (!object.mobileOnly) {
                this.createSwipper(objectIndex);

                continue;
            }

            if (this.breakpoint.matches === true) {
                // Below breakpoint
                this.createSwipper(objectIndex);
            } else {
                // Above breakpoint
                this.destroySwipper(objectIndex);
            }
        }
    }
}
