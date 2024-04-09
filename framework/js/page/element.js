class PageElementClass {
    constructor () {
        Debug.log("PageElement -> Constructor");
        this.visibilityCounter = 0;
        this.objects = []
    }

    initialise() {
        Debug.log("PageElement -> Initialise");
        document
          .querySelectorAll('footer, main')
          .forEach((pageElement) => {
              if(MiscComponent.checkAndCreate(pageElement, "page-element")) {
                  this.create(pageElement);
              }
          });

        document
          .querySelectorAll('a[href^="#"]')
          .forEach((link) => {
              if(MiscComponent.checkAndCreate(link, "link-scroll")) {
                  if(!link.classList.contains(".ds44-tabs__link"))
                  {
                      MiscEvent.addListener("click", (event) => {
                          this.scrollToHyperlink(event, link);
                      }, link);
                  }
                  MiscEvent.addListener("scroll.element", (event) => {
                      this.scrollToHyperlink(event, link);
                  }, link);
              }
          });
    }

    clearObject() {
        Debug.log("PageElement -> Clear object");
        this.objects = [];
    }

    create (pageElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'element': pageElement
        };
        this.objects.push(object);
    }

    show () {
        this.visibilityCounter = Math.min(0, (this.visibilityCounter + 1));
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.show(this.objects[objectIndex].element, true, false);
            }
        }
    }

    hide () {
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.hide(this.objects[objectIndex].element, true, false);
            }
        }
        this.visibilityCounter--;
    }
        
    scrollToHyperlink(event, button) {
        event.preventDefault();
        var targetHref = event.detail.target !== undefined ? event.detail.target : button.getAttribute('href');
        if(targetHref)
        {
            let elementToScroll = document.getElementById(targetHref.replace('#', ''));
            if(elementToScroll.style.display !== "none")
            {
                const scrollTo = MiscUtils.getPositionY(elementToScroll);
                if (MiscUtils.getScrollTop() > scrollTo) {
                    // Going up, the header will show
                    MiscUtils.scrollTo(
                      scrollTo - MiscDom.getHeaderHeight(true),
                      400,
                      'linear'
                    );
                } else {
                    // Going down, the header will hide
                    MiscUtils.scrollTo(
                      scrollTo,
                      400,
                      'linear'
                    );
                }
                // Create first hidden focus element
                const fakeElement = document.createElement('span');
                fakeElement.classList.add('ds44-tmpFocusHidden');
                fakeElement.setAttribute('tabindex', '-1');
                elementToScroll.prepend(fakeElement);
                fakeElement.focus();
                MiscEvent.addListener("blur", (event) => {
                    fakeElement.remove();
                }, fakeElement);
            }
        }
    }
}
// Singleton
var PageElement = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new PageElementClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new PageElement();
