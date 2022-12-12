class ButtonSelectClass {
    constructor () {
        Debug.log("ButtonSelect -> Constructor");
    }
    initialise() {
        Debug.log("ButtonSelect -> Initialise");
        document
          .querySelectorAll('.ds44-js-select-button')
          .forEach((buttonElement) => {
              if(MiscComponent.checkAndCreate(buttonElement, "button-select"))
              {
                  this.switch(buttonElement, buttonElement.classList.contains("is-select"));
                  MiscEvent.addListener('click', this.executeSwitch.bind(this, buttonElement), buttonElement);
              }
          });
    }

    executeSwitch(buttonElement, evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if(buttonElement.dataset.url !== undefined) {
            MiscRequest.send(buttonElement.dataset.url, (response) => {
                if(response.enabled !== undefined) {
                    this.switch(buttonElement, response.enabled);
                }
                document
                  .querySelectorAll('*[data-nb-select]')
                  .forEach((element) => {
                      element.textContent = response.nbSelect;
                  });
                document
                  .querySelectorAll('*[data-link-has-select]')
                  .forEach((element) => {
                      if(response.nbSelect > 0 && element.tagName === "SPAN") {
                        MiscDom.changeTagName(element, "A");
                      }
                      else if(response.nbSelect === 0 && element.tagName === "A") {
                          MiscDom.changeTagName(element, "SPAN");
                      }
                  });
            });
        }
        return false;
    }

    switch(button, isSelect) {
        let title;
        let iconRemove;
        let iconAdd;
        let titles = JSON.parse(button.dataset.titles);
        let icons = JSON.parse(button.dataset.icons);
        if(isSelect) {
            if(titles && titles.enabled !== undefined) {
                title = titles.enabled;
            }
            if(icons && icons.enabled !== undefined) {
                iconAdd = icons.enabled;
                iconRemove = icons.disabled;
            }
        }
        else {
            if(titles && titles.disabled !== undefined) {
                title = titles.disabled;
            }
            if(icons && icons.disabled !== undefined) {
                iconAdd = icons.disabled;
                iconRemove = icons.enabled;
            }
        }
        button.title = title;
        button.querySelectorAll('*[data-entitled]')
          .forEach((entitled) => {
            entitled.textContent = title;
          });
        button.querySelectorAll('*[data-icon]')
          .forEach((icon) => {
              icon.classList.remove(iconRemove);
              icon.classList.add(iconAdd);
          });
    }



}
// Singleton
var ButtonSelect = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonSelectClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonSelect();
