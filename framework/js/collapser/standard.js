class CollapserStandardClass {
    constructor () {
        Debug.log("CollapserStandard -> Constructor");
        this.objects = [];
    }

    initialise() {
        Debug.log("CollapserStandard -> Initialise");
        document
          .querySelectorAll('.ds44-collapser_button')
          .forEach((buttonElement) => {
              if(MiscComponent.checkAndCreate(buttonElement, "collapser")) {
                  this.create(buttonElement);
              }
          });
    }

    clearObject() {
        Debug.log("CollapserStandard -> Clear object");
        this.objects = [];
    }

    create (buttonElement) {
        if(
            buttonElement.getAttribute('role') !== 'heading' &&
            buttonElement.parentElement.getAttribute('role') === 'heading'
        ) {
            buttonElement = buttonElement.parentElement;
        }

        const object = {
            'id': MiscUtils.generateId(),
            'containerElement': buttonElement.closest('.ds44-collapser_element'),
            'buttonElement': buttonElement
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        this.hide(objectIndex);

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this, objectIndex));
        MiscEvent.addListener('click', this.showHide.bind(this, objectIndex), buttonElement);
    }

    showHide (objectIndex, evt) {
        const object = this.objects[objectIndex];
        evt.stopPropagation();
        evt.preventDefault();
        if (!object || !object.buttonElement) {
            return;
        }

        if (object.buttonElement.firstElementChild.classList.contains('show')) {
            // Hide
            this.hide(objectIndex);

            return;
        }

        // Show
        this.show(objectIndex);
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('COLLAPSE');
        }
        object.buttonElement.firstElementChild.classList.add('show');
        object.buttonElement.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = (panel.style.maxHeight ? null : panel.scrollHeight + 60 + 'px');
        MiscAccessibility.show(panel);
        panel.style.visibility = 'visible';
        setTimeout(()=>{
            panel.style.maxHeight = "none";
        }, 400);


        const icon = object.buttonElement.querySelector(".icon-collapser");
        if(icon)
        {
            icon.classList.remove("icon-down");
            icon.classList.add("icon-up");
        }

    }

    hide (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.buttonElement) {
            return;
        }

        const panel = object.buttonElement.nextElementSibling;
        const buttonLabel = object.buttonElement.querySelector('span.visually-hidden');
        if (buttonLabel) {
            buttonLabel.innerText = MiscTranslate._('EXPAND');
        }
        object.buttonElement.firstElementChild.classList.remove('show');
        object.buttonElement.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = panel.offsetHeight+"px";
        setTimeout(()=>{
            panel.style.maxHeight = null;
            MiscAccessibility.hide(panel);
            panel.style.visibility = 'hidden';
        }, 100);

        const icon = object.buttonElement.querySelector(".icon-collapser");
        if(icon)
        {
            icon.classList.remove("icon-up");
            icon.classList.add("icon-down");
        }
    }

    escape (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !document.activeElement ||
            !object.containerElement.contains(document.activeElement) ||
            !object.buttonElement
        ) {
            return;
        }

        MiscAccessibility.setFocus(object.buttonElement);

        this.hide(objectIndex);
    }
}
// Singleton
var CollapserStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CollapserStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new CollapserStandard();

