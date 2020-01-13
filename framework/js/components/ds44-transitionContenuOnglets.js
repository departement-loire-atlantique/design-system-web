// effectue une transition des display:none sur les contenus des onglets
function processTransitionOnglets(tabClicked, allTabs) {

  allTabs.forEach((tab) => {

    let tabpanel = document.querySelector(tab.getAttribute("href"));

    if (tabClicked == tab) {
      tab.setAttribute("aria-selected", "true");

      timerClass(tabpanel, "display", "block", 150);
      timerClass(tabpanel, "opacity", "1", 300);

      let tabpanelAnchor = tabpanel.children[0];
      tabpanelAnchor.focus();

    } else {
      tab.setAttribute("aria-selected", "false");

      tabpanel.style["opacity"] = "0";
      timerDisplayNone(tabpanel, 150);
    }

  });
}

let allTabs = document.querySelectorAll(".js-tablist__link");
if (allTabs) {
  allTabs.forEach((tab) => {
    tab.addEventListener('click', () => processTransitionOnglets(tab, allTabs));
    tab.addEventListener("keypress", (event) => fusionneKeyPressedWithClicked(event));

    let tabpanel = document.querySelector(tab.getAttribute("href"));
    let tabpanelExit = tabpanel.children[tabpanel.children.length-1];

    tabpanelExit.addEventListener('click', (event) => { event.preventDefault(); tab.focus(); });
    tabpanelExit.addEventListener("keypress", (event) => fusionneKeyPressedWithClicked(event));

    if(tab.getAttribute("aria-current") == "true") {
      tab.focus();
      tabpanel.style["display"] = "block";
      timerClass(tabpanel, "opacity", "1", 150);
    }

  });
}
