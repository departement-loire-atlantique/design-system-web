class CartManageClass {
    constructor () {
        this.objects = [];
    }

    initialise() {
        Debug.log("SubMenu -> Initialise");
        document
          .querySelectorAll("*[data-cart-manage]")
          .forEach((cartManage) => {
              if(MiscComponent.checkAndCreate(cartManage, "cart-manage"))
              {
                  this.create(cartManage);
              }
          });
    }


    create(cartManage)
    {
        Debug.log("SubMenu -> Create");
        const object = {
            'element': cartManage,
        };

        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);
        cartManage.querySelectorAll("*[data-cart-remove-url]").forEach((button) => {
            MiscEvent.addListener("click", (evt) => {
                MiscRequest.send(button.getAttribute("data-cart-remove-url"), () =>{
                    let removeElement = button.closest("*[data-cart-element]");
                    if(removeElement)
                    {
                        this.remove(objectIndex, removeElement);
                    }
                    else
                    {
                        cartManage.querySelectorAll("*[data-cart-element]").forEach((removeElement) => {
                            this.remove(objectIndex, removeElement);
                        });
                    }
                }, (response) => {
                    console.log(response);
                });
            }, button);
        });
    }

    remove(objectIndex, element)
    {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        element.remove();
    }



}
// Singleton
var CartManage = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CartManageClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
// Singleton
new CartManage();
