'use strict';

class Onglet {

  constructor() {
    let allTabs = document.querySelectorAll('.js-tablist__link');
    allTabs.forEach((tab) => {
        tab.addEventListener('click', this.processTransitionOnglets.bind(this));
        tab.addEventListener('keypress', window.fusionneKeyPressedWithClicked);

        if(tab.hasAttribute('aria-current')) {
          tab.classList.add('ds44-tabs__linkSelected');
        }

        let hrefTag = this.getTagFromHref(tab.getAttribute('href'));

        let tabPanel = document.querySelector(hrefTag);
        if(!tabPanel || !tabPanel.children.length) {
            return;
        }
        let tabPanelExit = tabPanel.children[tabPanel.children.length-1];

        tabPanelExit.addEventListener('click', this.scrollVersOnglet.bind(this));
        tabPanelExit.addEventListener('keypress', window.fusionneKeyPressedWithClicked);

        if(tab.getAttribute('aria-current') === 'true') {
          tab.focus();
          tabPanel.style['display'] = 'block';
          window.timerClass(tabPanel, 'opacity', '1', 150);
        }

    });
  }

  // effectue une transition des display:none sur les contenus des onglets
  processTransitionOnglets() {

    let allTabs = document.querySelectorAll('.js-tablist__link');
    allTabs.forEach((tab) => {

      let hrefTag = this.getTagFromHref(tab.getAttribute('href'));

      let tabPanel = document.querySelector(hrefTag);
      if(!tabPanel) {
          return;
      }

      if (tab.classList.contains("ds44-tabs__linkSelected")) {
        tab.classList.add('ds44-tabs__linkSelected');

        timerClass(tabPanel, 'display', 'block', 150);
        timerClass(tabPanel, 'opacity', '1', 300);

        let tabPanelAnchor = tabPanel.children[0];
        if(!tabPanelAnchor) {
            return;
        }
        tabPanelAnchor.focus();

      } else {
        tab.classList.remove('ds44-tabs__linkSelected');

        tabPanel.style['opacity'] = 0;
        window.timerDisplayNone(tabPanel, 150);
      }

    });
  }

  scrollVersOnglet(evt) {
      evt.preventDefault();

      let tabDestination = null;
      let allTabs = document.querySelectorAll('.js-tablist__link');
      allTabs.forEach((tab) => {
          if (tab.classList.contains("ds44-tabs__linkSelected")) {
              tabDestination = tab;
          }
      }
      if(!tabDestination) {
          return;
      }
      tabDestination.focus();

      let header = document.querySelector('header .ds44-header');
      if(!header) {
          return;
      }
      let distanceToScroll = header.offsetHeight;
      let distanceEntreTabPanelExitEtTab = getPositionY(evt.target) - getPositionY(tabDestination) + distanceToScroll;
      let distanceEntreTabPanelExitEtHautEcran = getPositionY(evt.target) - document.scrollingElement.scrollTop;
      if(distanceEntreTabPanelExitEtTab >= distanceEntreTabPanelExitEtHautEcran) { //si le tab est au dessus de l'ecran visible
          document.scrollingElement.scrollBy(0, -distanceToScroll * 2);
      }
  }

  // Récupère le tag ID d'un HREF, s'il existe
  getTagFromHref(href) {
    if (href.indexOf('#') !== -1) {
      return href.slice(href.indexOf('#'));
    }

    return '#';
  }

}

// Singleton
new Onglet();
