'use strict';

class Onglet {

  constructor() {
    let allTabs = document.querySelectorAll('.js-tablist__link');
    allTabs.forEach((tab) => {
        tab.addEventListener('click', this.processTransitionOnglets.bind(this));
        tab.addEventListener('keypress', Utils.fusionneKeyPressedWithClicked);

        if(tab.hasAttribute('aria-current')) {
          tab.classList.add('ds44-tabs__linkSelected');
        }

        let hrefTag = this.getTagFromHref(tab.getAttribute('href'));

        let tabPanel = document.querySelector(hrefTag);
        if(!tabPanel || !tabPanel.children.length) {
            return;
        }
        let tabPanelExit = tabPanel.children[tabPanel.children.length-1];

        tabPanelExit.addEventListener('click', this.retourneVersOnglet.bind(this));
        tabPanelExit.addEventListener('keypress', Utils.fusionneKeyPressedWithClicked);

        if(tab.getAttribute('aria-current') === 'true') {
          tab.focus();
          tabPanel.style['display'] = 'block';
          Utils.timerClass(tabPanel, 'opacity', '1', 150);
        }

    });
  }

  // effectue une transition des display:none sur les contenus des onglets
  processTransitionOnglets(evt) {

    let allTabs = document.querySelectorAll('.js-tablist__link');
    allTabs.forEach((tab) => {

      let hrefTag = this.getTagFromHref(tab.getAttribute('href'));

      let tabPanel = document.querySelector(hrefTag);
      if(!tabPanel) {
          return;
      }

      if (tab === evt.target) {
        tab.classList.add('ds44-tabs__linkSelected');

        Utils.timerClass(tabPanel, 'display', 'block', 150);
        Utils.timerClass(tabPanel, 'opacity', '1', 300);

        let tabPanelAnchor = tabPanel.children[0];
        if(!tabPanelAnchor) {
            return;
        }
        tabPanelAnchor.focus();

      } else {
        tab.classList.remove('ds44-tabs__linkSelected');

        tabPanel.style['opacity'] = 0;
        Utils.timerDisplayNone(tabPanel, 150);
      }

    });
  }

  retourneVersOnglet(evt) {
      evt.preventDefault();

      let tabDestination = null;
      let allTabs = document.querySelectorAll('.js-tablist__link');
      allTabs.forEach((tab) => {
          if (tab.classList.contains("ds44-tabs__linkSelected")) {
              tabDestination = tab;
          }
      });
      if(tabDestination != null) {
          tabDestination.focus();
      }

      let header = document.querySelector('header .ds44-header');
      if(!header) {
          return;
      }
      let distanceToScroll = header.offsetHeight;
      let distanceEntreTabPanelExitEtTab = Utils.getPositionY(evt.target) - Utils.getPositionY(tabDestination) + distanceToScroll;
      let distanceEntreTabPanelExitEtHautEcran = Utils.getPositionY(evt.target) - document.scrollingElement.scrollTop;
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
