const allCarousel = document.getElementsByClassName("swipper-carousel-wrap");
let allSwiper = [];
var i = 0;

for(let element of allCarousel) {
  i++;

  const nextEl = element.getElementsByClassName("swiper-button-next")[0];
  const prevEl = element.getElementsByClassName("swiper-button-prev")[0];
  const swiper = element.getElementsByClassName("swiper-container")[0];
  const arrSlide = swiper.getElementsByClassName("swiper-slide");
  const nbrSlide = arrSlide.length;
  const wrapper = element.getElementsByClassName("swiper-wrapper")[0];
  const nbrMaxSlide = wrapper.classList.contains("grid-3-small-1") ? 3 : 4;

  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var swiperObj = new Swiper (swiper, {
    direction: 'horizontal',
    spaceBetween: 10,
    watchOverflow: true,
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
    },
    a11y: {
      firstSlideMessage: 'Ceci est le premier contenu',
      lastSlideMessage: 'Ceci est le dernier contenu',
    },
    slidesPerView: screenWidth >= 768 ? nbrMaxSlide : 1,
    loop: screenWidth >= 768 ? (nbrSlide > nbrMaxSlide) : (nbrSlide > 1),
  });

  allSwiper.push(swiperObj);

  if(swiperObj.params.loop) {

    nextEl.classList.remove("swiper-button-disabled");
    prevEl.classList.remove("swiper-button-disabled");

    var parent = element;
    var title = null;
    while(parent) {
      for(var sibling of getSiblings(parent)){
        if(sibling && sibling.classList.contains("h2-like")) {
          title = sibling;
          break;
        }
      };
      parent = parent.parentElement;
    }
    const titleCarrousel = title ? title.innerText : "Carrousel n°"+i;

    disableAllTabIndexes(element);
    prevEl.setAttribute("tabindex", "1");
    nextEl.setAttribute("tabindex", "3");

    const prevSlideMessageStr = 'Voir le contenu précédent';
    const nextSlideMessageStr = 'Voir le contenu suivant';

    var updatePrevAndNextSlideMessage = function() {
      prevEl.setAttribute("title", prevSlideMessageStr+" "+titleCarrousel+" - "+(swiperObj.realIndex+1)+"/"+nbrSlide);
      nextEl.setAttribute("title", nextSlideMessageStr+" "+titleCarrousel+" - "+(swiperObj.realIndex+1)+"/"+nbrSlide);
    };

    updatePrevAndNextSlideMessage();

    var titreTuileActive = arrSlide[swiperObj.activeIndex].querySelector(".ds44-card__title a[href]:not([disabled])");
    titreTuileActive.setAttribute("tabindex", "2");

    for(var button of [nextEl, prevEl]) {
      button.addEventListener("click", function(event) {
        titreTuileActive.setAttribute("tabindex", "-1");
        titreTuileActive = arrSlide[swiperObj.activeIndex].querySelector(".ds44-card__title a[href]:not([disabled])");
        titreTuileActive.setAttribute("tabindex", "2");

        setTimeout(function(){ //pour que la methode ait lieu apres swipper
          updatePrevAndNextSlideMessage();
        }, 5);
        setTimeout(function(){ //pour que la methode ait lieu apres l'animation de scroll
          titreTuileActive.focus();
        }, 150);
      }, false);

    }

    prevEl.addEventListener("keypress", function(event){
      if(event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        prevEl.click();
      }
    });

    nextEl.addEventListener("keypress", function(event){
      if(event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        nextEl.click();
      }
    });

  } else {

    disableAllTabIndexes(element);
    var index = 1;
    for(var slide of arrSlide) {
    slide.querySelector(".ds44-card__title a[href]:not([disabled])").setAttribute("tabindex", index);
      index++;
    }

  }

}

// enleve les classes css de l'affichage sans js
// besoin de garder les classes pour l'initialisation des caroussel avec js, donc on les enleve a la fin
const allWrapper = document.getElementsByClassName("swiper-wrapper");
for(let wrapper of allWrapper){
  wrapper.classList.remove("ds44-carousel-swiper");
  wrapper.classList.remove("grid-4-small-1");
  wrapper.classList.remove("grid-3-small-1");
}
