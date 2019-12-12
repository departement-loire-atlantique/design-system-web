// enleve les classes css des boutons presentes pour l'affichage sans js
const allButtonCarousel = document.querySelectorAll('.swiper-button-prev,.swiper-button-next');
for(let button of allButtonCarousel){
  button.classList.remove("swiper-button-disabled");
}

const allCarousel = document.getElementsByClassName("swipper-carousel-wrap");
let allSwiper = [];

for(let element of allCarousel) {

  const nextEl = element.getElementsByClassName("swiper-button-next")[0];
  const prevEl = element.getElementsByClassName("swiper-button-prev")[0];
  const swiper = element.getElementsByClassName("swiper-container")[0];
  const nbrSlide = swiper.getElementsByClassName("swiper-slide").length;
  const wrapper = element.getElementsByClassName("swiper-wrapper")[0];
  const nbrMaxSlide = wrapper.classList.contains("grid-3-small-1") ? 3 : 4;

  allSwiper.push(new Swiper (swiper, {
    direction: 'horizontal',
    spaceBetween: 10,
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
    },
    a11y: {
      prevSlideMessage: 'Voir le contenu précédent',
      nextSlideMessage: 'Voir le contenu suivant',
    },
    breakpoints: {
      576: {
        loop: nbrSlide > 1,
        slidesPerView: 1,
      },
      768: {
        slidesPerView: nbrMaxSlide,
      },
    }
  }));
}

// enleve les classes css des presentes pour l'affichage sans js
// besoin de garder les classes pour l'initialisation des caroussel avec js, donc on les enleve a la fin
const allWrapper = document.getElementsByClassName("swiper-wrapper");
for(let wrapper of allWrapper){
  wrapper.classList.remove("ds44-carousel-swiper");
  wrapper.classList.remove("grid-4-small-1");
  wrapper.classList.remove("grid-3-small-1");
}
