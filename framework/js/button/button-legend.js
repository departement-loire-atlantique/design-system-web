class ButtonLegend {
  constructor () {
    const buttonLegends = document.querySelectorAll('button[type="button"]');
    [].forEach.call(buttonLegends, (buttonLegend) => {
      if (buttonLegend.closest("figure")) {
        MiscEvent.addListener('focus', this.focusParent.bind(this), buttonLegend);
        MiscEvent.addListener('focusout', this.unFocusParent.bind(this), buttonLegend);
      }
    });
  }

  focusParent (evt) {
    evt.target.closest("figure").classList.add("focus");
  }

  unFocusParent (evt) {
    evt.target.closest("figure").classList.remove("focus");
  }
}

// Singleton
new ButtonLegend();
