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
            'nbElements': cartManage.querySelectorAll("*[data-cart-element]").length
        };

        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);
        cartManage.querySelectorAll("*[data-cart-remove-url]").forEach((button) => {
            MiscEvent.addListener("click", (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                MiscRequest.send(button.getAttribute("data-cart-remove-url"), () =>{
                    let removeElement = button.closest("*[data-cart-element]");
                    let nbElements = this.objects[objectIndex]["nbElements"];
                    if(removeElement)
                    {
                        this.remove(objectIndex, removeElement);
                        nbElements--;
                    }
                    else
                    {
                        cartManage.querySelectorAll("*[data-cart-element]").forEach((removeElement) => {
                            this.remove(objectIndex, removeElement);
                            nbElements--;
                        });
                    }
                    this.objects[objectIndex]["nbElements"] = nbElements;
                    let title = this.objects[objectIndex]['element'].querySelector("*[data-cart-title]");
                    if(title)
                    {
                        if(nbElements <= 0)
                        {
                            title.innerText = MiscTranslate._("ASSMAT_SELECTED_EMPTY");
                        }
                        else
                        {
                            title.innerText = MiscTranslate._("ASSMAT_SELECTED").replace("__NB__", nbElements);
                        }
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
