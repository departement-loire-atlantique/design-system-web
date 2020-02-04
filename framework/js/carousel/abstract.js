class Carousel {
    constructor() {
        this.prevSlideMessageStr = 'Voir le contenu précédent';
        this.nextSlideMessageStr = 'Voir le contenu suivant';
        this.queryTitreTuile = '.ds44-card__title a[href]:not([disabled])';

        document
            .querySelectorAll('.swipper-carousel-wrap')
            .forEach((element, indexCarrousel) => {
                const nextEl = element.getElementsByClassName('swiper-button-next')[0];
                const innerTextNextEl = nextEl.getElementsByClassName('visually-hidden')[0];
                const prevEl = element.getElementsByClassName('swiper-button-prev')[0];
                const innerTextPrevEl = prevEl.getElementsByClassName('visually-hidden')[0];
                const swiper = element.getElementsByClassName('swiper-container')[0];
                const arrSlide = swiper.getElementsByClassName('swiper-slide');
                const nbrSlide = arrSlide.length;
                const wrapper = element.getElementsByClassName('swiper-wrapper')[0];
                let nbrMaxSlide = wrapper.classList.contains('grid-3-small-1') ? 3 : 4;

                const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                nbrMaxSlide = screenWidth >= 768 ? nbrMaxSlide : 1;

                let swiperObj = new Swiper(swiper, {
                    direction: 'horizontal',
                    spaceBetween: 16,
                    watchOverflow: true,
                    navigation: {
                        nextEl: nextEl,
                        prevEl: prevEl,
                    },
                    slidesPerView: nbrMaxSlide,
                    loop: screenWidth >= 768 ? (nbrSlide > nbrMaxSlide) : (nbrSlide > 1),
                });

                // si on loop, il faut gerer la navigation des tuiles avec les differents event de swiper
                // cela implique d'initialiser et mettre a jour l'apparence des boutons de navigation et des tuiles du carrousel
                if (swiperObj.params.loop) {

                    swiperObj.on('init', () => {
                        for (let i = 0; i < arrSlide.length; i++) {
                            let tuile = arrSlide[i];
                            tuile.style.margin = '0 8px';
                        }
                        arrSlide[0].style.margin = '0 8px 0 0';
                        arrSlide[arrSlide.length - 1].style.margin = '0 0 0 8px';

                        let spanNotif = element.getElementsByClassName('swiper-notification')[0];
                        if (spanNotif) {
                            spanNotif.remove();
                        }
                    });

                    let blocTitle = element.previousElementSibling;

                    let title = null;

                    if (blocTitle != null) { // on est dans le composant simple
                        title = blocTitle;
                    } else { // on est dans une page
                        blocTitle = element.parentElement.previousElementSibling;
                        if (blocTitle != null) {
                            title = blocTitle.querySelector('.h2-like');
                        }
                    }

                    const titleCarrousel = title != null ? title.innerText : 'Carrousel n°' + (indexCarrousel + 1);

                    const updatePrevAndNextSlideMessage = () => {

                        let indexPrevEl = swiperObj.realIndex === 0 ? nbrSlide : swiperObj.realIndex;
                        let indexNextEl = swiperObj.realIndex + nbrMaxSlide + 1 > nbrSlide ? swiperObj.realIndex + nbrMaxSlide + 1 - nbrSlide : swiperObj.realIndex + nbrMaxSlide + 1;

                        let titlePrevEl = this.prevSlideMessageStr + ' ' + titleCarrousel + ' - ' + indexPrevEl + '/' + nbrSlide;
                        let titleNextEl = this.nextSlideMessageStr + ' ' + titleCarrousel + ' - ' + indexNextEl + '/' + nbrSlide;

                        prevEl.setAttribute('title', titlePrevEl);
                        nextEl.setAttribute('title', titleNextEl);
                        innerTextPrevEl.innerText = titlePrevEl;
                        innerTextNextEl.innerText = titleNextEl;
                    };

                    updatePrevAndNextSlideMessage();

                    const getIndexDerniereTuileVisible = () => {
                        let nbrSlideWithDuplicated = arrSlide.length;

                        let index = swiperObj.activeIndex + (nbrMaxSlide - 1);
                        if (swiperObj.activeIndex + (nbrMaxSlide - 1) > nbrSlideWithDuplicated) {
                            index = swiperObj.activeIndex + (nbrMaxSlide - 1) - nbrSlideWithDuplicated;
                        }
                        return index;
                    }

                    this.updateVisibiliteTuiles(arrSlide, nbrSlide, swiperObj.activeIndex, getIndexDerniereTuileVisible());

                    [nextEl, prevEl]
                        .forEach(bouton => {
                            bouton.classList.remove('swiper-button-disabled');
                            bouton.removeAttribute('aria-label');
                            bouton.removeAttribute('role');

                            let ua = navigator.userAgent;
                            if (!ua.includes('Edge/42')) {
                                bouton.classList.add('ds44-not-edge-42');
                            }
                        });

                    swiperObj.on('slideChangeTransitionStart', () => {
                        for (let i = 0; i < arrSlide.length; i++) {
                            let tuile = arrSlide[i];
                            tuile.style.visibility = 'visible';
                        }
                    });

                    //pour que la methode ait lieu apres swipper
                    swiperObj.on('slideChangeTransitionEnd', updatePrevAndNextSlideMessage);

                    //pour que la methode ait lieu apres l'animation de scroll
                    swiperObj.on('slidePrevTransitionEnd', () => {

                        let tuileActive = arrSlide[swiperObj.activeIndex];
                        let titreTuileActive = tuileActive.querySelector(this.queryTitreTuile);

                        this.updateVisibiliteTuiles(arrSlide, nbrSlide, swiperObj.activeIndex, getIndexDerniereTuileVisible());
                        titreTuileActive.focus();
                    });

                    //pour que la methode ait lieu apres l'animation de scroll
                    swiperObj.on('slideNextTransitionEnd', () => {

                        let indexDerniereTuile = getIndexDerniereTuileVisible();

                        let tuileActive = arrSlide[indexDerniereTuile];
                        let titreTuileActive = tuileActive.querySelector(this.queryTitreTuile);

                        this.updateVisibiliteTuiles(arrSlide, nbrSlide, swiperObj.activeIndex, indexDerniereTuile);
                        titreTuileActive.focus();
                    });

                    swiperObj.on('touchStart', (evt) => {
                        if (evt.buttons === 1) {
                            for (let i = 0; i < arrSlide.length; i++) {
                                let tuile = arrSlide[i];
                                tuile.style.visibility = 'visible';
                            }
                        }
                    });

                    swiperObj.on('touchEnd', (evt) => {

                        let tuileActive = arrSlide[swiperObj.activeIndex];
                        let titreTuileActive = tuileActive.querySelector(this.queryTitreTuile);

                        this.updateVisibiliteTuiles(arrSlide, nbrSlide, swiperObj.activeIndex, getIndexDerniereTuileVisible());
                        titreTuileActive.focus();
                    });

                }
            });
        // besoin de garder les classes pour l'initialisation des caroussel avec js, donc on les enleve qu'a la fin
        this.removeAffichageSansJs();
    }

    // Met a jour la visibilite des tuiles en fonction du placement et du nombre de tuile visible
    updateVisibiliteTuiles(arrSlide, nbrSlide, indexPremiereTuileVisible, indexDerniereTuileVisible) {

        // format mobile - 1 seule tuile d'affiche avec la tuile precedente et la tuile suivante visibles partiellement
        if (indexDerniereTuileVisible === indexPremiereTuileVisible) {
            let indexTuileVisible = indexDerniereTuileVisible;
            let indexTuilePrecedente = indexTuileVisible != 0 ? indexTuileVisible - 1 : nbrSlide;
            let indexTuileSuivante = indexTuileVisible != nbrSlide ? indexTuileVisible + 1 : 0;

            for (let index = 0; index < arrSlide.length; index++) {
                let slide = arrSlide[index];

                // c'est la tuile visible totalement
                if (index === indexTuileVisible) {
                    slide.removeAttribute('aria-hidden');
                    slide.style.visibility = 'visible';
                    let allElementsFocusables = slide.querySelectorAll(Accessibility.getEnabledElementsSelector());
                    for (let element of allElementsFocusables) {
                        element.removeAttribute('tabindex');
                    }

                    // c'est la tuile precedente ou suivante, qui sont visibles partiellement
                } else if (
                    index === indexTuilePrecedente ||
                    index === indexTuileSuivante
                ) {
                    slide.setAttribute('aria-hidden', 'true');
                    let allElementsFocusables = slide.querySelectorAll(Accessibility.getEnabledElementsSelector());
                    for (let element of allElementsFocusables) {
                        element.setAttribute('tabindex', '-1');
                    }

                    // c'est une tuile a masquer
                } else {
                    slide.setAttribute('aria-hidden', 'true');
                    slide.style.visibility = 'hidden';
                    let allElementsFocusables = slide.querySelectorAll(Accessibility.getEnabledElementsSelector());
                    for (let element of allElementsFocusables) {
                        element.removeAttribute('tabindex');
                    }
                }
            }


            // format desktop - les tuiles visibles sont au milieu de la liste
        } else if (indexDerniereTuileVisible >= indexPremiereTuileVisible) {
            for (let index = 0; index < arrSlide.length; index++) {
                let slide = arrSlide[index];

                // la tuile est a rendre visible
                if (
                    index >= indexPremiereTuileVisible &&
                    index <= indexDerniereTuileVisible
                ) {
                    slide.removeAttribute('aria-hidden');
                    slide.style.visibility = 'visible';

                    // la tuile est a masquer
                } else {
                    slide.setAttribute('aria-hidden', 'true');
                    slide.style.visibility = 'hidden';
                }
            }


            // format desktop - les tuiles visibles sont aux deux extremes de la liste
        } else {
            for (let index = 0; index < arrSlide.length; index++) {
                let slide = arrSlide[index];

                // la tuile est a rendre visible
                if (
                    (
                        index >= indexPremiereTuileVisible &&
                        index < arrSlide.length
                    ) ||
                    (
                        index <= indexDerniereTuileVisible &&
                        index >= 0
                    )
                ) {
                    slide.removeAttribute('aria-hidden');
                    slide.removeAttribute('style');

                    // la tuile est a masquer
                } else {
                    slide.setAttribute('aria-hidden', 'true');
                    slide.setAttribute('style', 'display:none;');
                }
            }
        }
    }

    // enleve les classes css de l'affichage sans js
    removeAffichageSansJs() {
        const allWrapper = document.getElementsByClassName('swiper-wrapper');
        for (let index = 0; index < allWrapper.length; index++) {
            let wrapper = allWrapper[index];
            wrapper.classList.remove('ds44-carousel-swiper');
            wrapper.classList.remove('grid-4-small-1');
            wrapper.classList.remove('grid-3-small-1');
        }
    }
}

// Singleton
new Carousel();
