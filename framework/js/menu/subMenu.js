class SubMenuClass {
    constructor () {
        Debug.log("SubMenu -> Constructor");
        this.objects = [];
    }

    initialise() {Debug.log("SubMenu -> Initialise");
        document
          .querySelectorAll("*[data-sub-menu]")
          .forEach((subMenu) => {
              if(MiscComponent.checkAndCreate(subMenu, "sub-menu"))
              {
                  this.create(subMenu);
              }
          });
    }

    create(subMenu)
    {
        let subMenuId = subMenu.getAttribute("id");
        // Create object
        const object = {
            'element': subMenu,
            'id': subMenuId,
            "currentButton": null
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);


        this.hideMenu.bind(this, objectIndex);
        MiscEvent.addListener('keyUp:escape', this.hideMenu.bind(this, objectIndex));
        document.querySelectorAll("*[data-open-sub-menu='#"+subMenuId+"']").forEach((button) => {
            MiscEvent.addListener("click", (evt) => {
                if(button.classList.contains("is-open"))
                {
                    this.hideMenu(objectIndex, evt);
                }
                else
                {
                    this.showMenu(objectIndex, button, evt);
                }
            }, button);
        });

        MiscEvent.addListener("resize", (evt) => {
            if(object.element.classList.contains("view"))
            {
                let buttonEnabled = document.querySelector("*[data-open-sub-menu='#"+subMenuId+"'].is-open");
                this.positionMenuByButton(objectIndex, buttonEnabled);
            }
        }, window);

    }

    showMenu(objectIndex, button, evt)
    {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        if (evt) {
            evt.stopPropagation();
        }

        this.positionMenuByButton(objectIndex, button);

        MiscAccessibility.show(object.element);
        MiscAccessibility.addFocusLoop(object.element);

        let links = object.element.querySelectorAll("a");
        if(links[0] !== undefined) {
            window.setTimeout(MiscAccessibility.setFocus.bind(this, links[0]), 100);
        }

        this.transformButton(button, true);
        object.element.classList.add("view");

        MiscEvent.addListener('click', this.clickOut.bind(this, objectIndex), document.body);
        this.objects[objectIndex]['currentButton'] = button;
    }

    positionMenuByButton(objectIndex, button)
    {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let buttonPosition = MiscDom.getOffset(button);
        let limitLeft = buttonPosition["left"]+object.element.clientWidth;

        object.element.style.top = (buttonPosition["top"]+button.innerHeight)+"px";
        if(window.innerWidth < limitLeft)
        {
            object.element.style.right = "1rem";
            object.element.style.left = "auto";
        }
        else
        {
            object.element.style.left = buttonPosition["left"]+"px";
            object.element.style.right = "auto";
        }
    }

    hideMenu(objectIndex, evt)
    {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        if (evt) {
            evt.stopPropagation();
        }
        object.element.classList.remove("view");
        document.querySelectorAll("*[data-open-sub-menu='#"+object.id+"']").forEach((button) => {
            this.transformButton(button, false);
        });
        MiscAccessibility.hide(object.element);
        MiscEvent.removeListener('click', this.clickOut.bind(this, objectIndex), document.body);

        let currentButton = this.objects[objectIndex]['currentButton'];
        if(currentButton) {
            MiscAccessibility.show(currentButton); // nécessaire pour empêcher l'apparition d'un tabindex -1 sur l'élément déclencheur
            MiscAccessibility.setFocus(currentButton);
            this.objects[objectIndex]['currentButton'] = null;
        }

    }

    clickOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        if (evt.target && object.element.contains(evt.target)) {
            return;
        }
        this.hideMenu(objectIndex);
    }

    transformButton(button, toOpen)
    {
        if(toOpen) {
            button.classList.add("is-open");
            button.querySelector(".icon-toggle").classList.remove("icon-down");
            button.querySelector(".icon-toggle").classList.add("icon-up");
        }
        else {
            button.classList.remove("is-open");
            button.querySelector(".icon-toggle").classList.add("icon-down");
            button.querySelector(".icon-toggle").classList.remove("icon-up");
        }
    }

}
// Singleton
var SubMenu = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new SubMenuClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
// Singleton
new SubMenu();
