// effectue une transition des display:none sur les contenus des onglets
function processTransitionOnglets(tabClicked, allTabs) {
  allTabs.forEach((tab) => {

    let tabpanel = document.querySelector("#" + tab.getAttribute("aria-controls"));

    if (tabClicked == tab) {
      // On affiche le contenu immédiatement
      timerClass(tabpanel, "display", "block", 150);
      timerClass(tabpanel, "opacity", "1", 300);

    } else {
      // On cache le contenu avec un délai
      tabpanel.style["opacity"] = "0";
      timerDisplayNone(tabpanel, 150);
    }

  });
}

let allTabs = document.querySelectorAll(".js-tablist__link");
if (allTabs) {
  allTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => processTransitionOnglets(event.target, allTabs));
  });
}
