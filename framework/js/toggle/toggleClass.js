class ToggleClassClass {
    constructor () {
        Debug.log("ToggleClass -> Constructor");
        this.objects = [];
    }

    initialise() {
        Debug.log("ToggleClass -> Initialise");
        document
          .querySelectorAll('*[data-toggle-class]')
          .forEach((element) => {
              if(MiscComponent.checkAndCreate(element, "toggle-class")) {
                  this.create(element);
              }
          });
    }

    clearObject() {
        Debug.log("ToggleClass -> Clear object");
        this.objects = [];
    }

    create (element) {

        let limitName = element.getAttribute("data-toggle-limit");
        let limitElement = document.querySelector(limitName);

        const object = {
            'id': MiscUtils.generateId(),
            'element': element,
            "class":   element.getAttribute("data-toggle-class"),
            "limit": {
                "name": limitName,
                "element": limitElement
            }
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        MiscEvent.addListener('scroll', this.toggle.bind(this, objectIndex), window);
    }

    toggle (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.element || !object.limit.element) {
            return;
        }
        let limitY = MiscUtils.getPositionY(object.limit.element) + object.limit.element.offsetHeight;
        if(limitY > window.scrollY)
        {
            object.element.classList.add(object.class);
        }
        else
        {
            object.element.classList.remove(object.class);
        }

    }

}
// Singleton
var ToggleClass = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ToggleClassClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ToggleClass();