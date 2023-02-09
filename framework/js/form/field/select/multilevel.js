class FormFieldSelectMultilevelClass extends FormFieldSelectCheckboxClass {
    constructor () {
        super(
            "FormFieldSelectMultilevel",
            '.ds44-selectDisplay.ds44-js-select-multilevel',
            'selectMultilevel'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubSubInitialized) {
                continue;
            }
            object.isSubSubSubInitialized = true;

            if (object.selectListElement) {
                object.selectListElement
                    .querySelectorAll('.ds44-select__categ input')
                    .forEach((listInputElement) => {
                        MiscEvent.addListener('change', this.selectCategory.bind(this), listInputElement);
                    });
            }

            // Remove data-url attribute as multilevel select do not exist yet
            //object.textElement.removeAttribute('data-url');
        }
    }

    select (objectIndex, evt) {
        super.select(objectIndex, evt);

        const selectListElement = evt.currentTarget.closest('.ds44-list');
        if (!selectListElement) {
            return;
        }

        // Manage categories checkboxes
        let allChecked = true;
        let allNotChecked = true;
        selectListElement
            .querySelectorAll('.ds44-select-list_elem input')
            .forEach((listInputElement) => {
                if (listInputElement.checked) {
                    allNotChecked = false;
                } else {
                    allChecked = false;
                }
            });

        // Check or uncheck category checkbox
        const collapserElement = selectListElement.closest('.ds44-collapser_element');
        if (!collapserElement) {
            return;
        }

        const collapserInputElement = collapserElement.querySelector('.ds44-select__categ input');
        if (!collapserInputElement) {
            return;
        }

        if (allChecked) {
            collapserInputElement.checked = true;
            collapserInputElement.classList.remove('ds44-chkInder');
        } else if (allNotChecked) {
            collapserInputElement.checked = false;
            collapserInputElement.classList.remove('ds44-chkInder');
        } else {
            collapserInputElement.checked = false;
            collapserInputElement.classList.add('ds44-chkInder');
        }
    }

    selectCategory (evt) {
        const categoryInputElement = evt.currentTarget;
        const collapserElement = categoryInputElement.closest('.ds44-collapser_element');
        if (!collapserElement) {
            return;
        }

        // Check or uncheck category checkbox
        categoryInputElement.classList.remove('ds44-chkInder');

        // Check or uncheck children checkbox
        collapserElement
            .querySelectorAll('.ds44-collapser_content .ds44-select-list_elem')
            .forEach((listElement) => {
                const listInputElement = listElement.querySelector('input');

                listInputElement.checked = categoryInputElement.checked;
                if (listInputElement.checked) {
                    listElement.classList.add('selected_option');
                } else {
                    listElement.classList.remove('selected_option');
                }
            });
    }

    getCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('.ds44-select__categ input');
    }

    getListElement (object, key, value, children, objectIndex) {
        let elementSelectListItem = super.getListElement(object, key, value);
        elementSelectListItem.classList.add('ds44-collapser_element');
        elementSelectListItem.classList.add('ds44-collapser--select');
        elementSelectListItem.querySelector(".ds44-form__container").classList.add('ds44-select__categ');

        MiscEvent.addListener('change', this.selectCategory.bind(this), elementSelectListItem.querySelector("input"));

        if(children)
        {
          elementSelectListItem.classList.add('ds44-collapser_element');

          let button = document.createElement("button");
          button.classList.add('ds44-collapser_button');
          button.classList.add('ds44-collapser_button--select');

          let span = document.createElement("span");
          span.classList.add('visually-hidden');
          button.appendChild(span);

          let icon = document.createElement("i");
          icon.classList.add('icon-down');
          icon.classList.add('icon');
          icon.classList.add('ds44-noLineH');
          button.appendChild(icon);

          elementSelectListItem.appendChild(button);
          let collapserContent = document.createElement("div");
          collapserContent.classList.add("ds44-collapser_content");

          let collapserContentUl = document.createElement("ul");
          collapserContentUl.classList.add("ds44-list");
          collapserContentUl.classList.add("ds44-collapser_content--level2");
          for (let key in children) {
            if (!children.hasOwnProperty(key)) {
                continue;
            }
            let subElementSelectListItem = super.getListElement(object, (children[key].id || key), children[key].value);
            this.setListElementEvents(subElementSelectListItem, objectIndex);
            collapserContentUl.appendChild(subElementSelectListItem);
          }
          collapserContent.appendChild(collapserContentUl);
          elementSelectListItem.appendChild(collapserContent);
        }
        return elementSelectListItem;
    }


}
// Singleton
var FormFieldSelectMultilevel = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldSelectMultilevelClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldSelectMultilevel();
