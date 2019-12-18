const allCarousel = document.getElementsByClassName("swipper-carousel-wrap");
let allSwiper = [];
var i = 0;

for(let element of allCarousel) {
  i++;

  const nextEl = element.getElementsByClassName("swiper-button-next")[0];
  const prevEl = element.getElementsByClassName("swiper-button-prev")[0];
  const swiper = element.getElementsByClassName("swiper-container")[0];
  const arrSlide = swiper.getElementsByClassName("swiper-slide")
  const nbrSlide = arrSlide.length;
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
      firstSlideMessage: 'Ceci est le premier contenu',
      lastSlideMessage: 'Ceci est le dernier contenu',
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

  const prevSlideMessageStr = 'Voir le contenu précédent';
  const nextSlideMessageStr = 'Voir le contenu suivant';

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

  var indexTuileActive = 1;
  var indexTuileActiveSwipper = 1;
  const maxIndexTuileActiveSwipper = nbrSlide+1 - nbrMaxSlide;

  disableAllTabIndexes(element);
  prevEl.setAttribute("tabindex", "1");
  nextEl.setAttribute("tabindex", "3");
  arrSlide[indexTuileActive-1].setAttribute("tabindex", "2");

  var updatePrevAndNextSlideMessage = function() {
    prevEl.setAttribute("title", prevSlideMessageStr+" "+titleCarrousel+" - "+indexTuileActive+"/"+nbrSlide);
    nextEl.setAttribute("title", nextSlideMessageStr+" "+titleCarrousel+" - "+indexTuileActive+"/"+nbrSlide);
  };

  updatePrevAndNextSlideMessage();

  prevEl.addEventListener("click", function() {
    if(indexTuileActive > 1 || indexTuileActiveSwipper > 1) {
      arrSlide[indexTuileActive-1].setAttribute("tabindex", "-1");
      if(indexTuileActive > 1) {
        indexTuileActive--;
      }
      if(indexTuileActiveSwipper > 1) {
        indexTuileActiveSwipper--;
      }
      arrSlide[indexTuileActive-1].setAttribute("tabindex", "2");
      arrSlide[indexTuileActive-1].focus();
      arrSlide[indexTuileActive-1].select();
    }
  }, false);

  nextEl.addEventListener("click", function(event) {
    if(indexTuileActive < nbrSlide || indexTuileActiveSwipper < maxIndexTuileActiveSwipper) {
      arrSlide[indexTuileActive-1].setAttribute("tabindex", "-1");
      if(indexTuileActive < nbrSlide) {
        indexTuileActive++;
      }
      if(indexTuileActiveSwipper < maxIndexTuileActiveSwipper) {
        indexTuileActiveSwipper++;
      }
      arrSlide[indexTuileActive-1].setAttribute("tabindex", "2");
      arrSlide[indexTuileActive-1].focus();
      arrSlide[indexTuileActive-1].select();
    }
  }, false);

  var removeAriaDisabledFalse = function(button) {
    if(button.getAttribute("aria-disabled") == "false") button.removeAttribute("aria-disabled");
  }

  var updateVisibilityPrevAndNext = function(){
    if(indexTuileActiveSwipper == 1 && indexTuileActive > 1) {
      //cas ou la fleche prev n'est pas visible de la meme maniere pour les utilisateurs voyants et malvoyants
      prevEl.classList.remove("swiper-button-disabled");
      prevEl.classList.add("swiper-button-hidden");
    } else {
      prevEl.classList.remove("swiper-button-hidden");
      if(indexTuileActive == 1) {
        prevEl.classList.add("swiper-button-disabled");
      }
    }
    if(indexTuileActiveSwipper == maxIndexTuileActiveSwipper && indexTuileActive < nbrSlide) {
      //cas ou la fleche next n'est pas visible de la meme maniere pour les utilisateurs voyants et malvoyants
      nextEl.classList.remove("swiper-button-disabled");
      nextEl.classList.add("swiper-button-hidden");
    } else {
      nextEl.classList.remove("swiper-button-hidden");
      if(indexTuileActive == nbrSlide) {
        nextEl.classList.add("swiper-button-disabled");
      }
    }
  }

  const allButtonElement = [nextEl, prevEl];
  for(var button of allButtonElement) {
    removeAriaDisabledFalse(button);
    button.addEventListener("click", function() {
      setTimeout(function(){ //pour que la methode ait lieu apres swipper
        allButtonElement.forEach(button2 => removeAriaDisabledFalse(button2));

        updateVisibilityPrevAndNext();

        updatePrevAndNextSlideMessage();
      }, 5);
    }, false);

    button.addEventListener("keypress", button2 => function(event, button2){
      if(event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        button2.click();
      }
    });
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
