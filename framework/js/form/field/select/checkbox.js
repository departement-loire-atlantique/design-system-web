class FormFieldSelectCheckboxClass extends FormFieldSelectAbstract {
    constructor (className, selector, category) {
        if (selector && category) {
            super(
              className,
                selector,
                category
            );

            return;
        }

        super(
            "FormFieldSelectCheckbox",
            '.ds44-selectDisplay.ds44-js-select-checkbox',
            'selectCheckbox'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;
            this.initByChecked(objectIndex);
            const flexContainerElement = object.containerElement.querySelector('.ds44-flex-container');
            const checkAllElement = flexContainerElement.querySelector('button:first-child');
            if (checkAllElement) {
                MiscEvent.addListener('click', this.checkAll.bind(this, objectIndex), checkAllElement);
            }
            const uncheckAllElement = flexContainerElement.querySelector('button:last-child');
            if (uncheckAllElement) {
                MiscEvent.addListener('click', this.uncheckAll.bind(this, objectIndex), uncheckAllElement);
            }
        }
    }

    initByChecked(objectIndex) {
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        var value = [];
        var texts = [];
        checkboxElements.forEach((checkboxElement) => {
            if(checkboxElement.checked) {
                value.push(checkboxElement.value);
                let labelText = "";
                var label = MiscDom.getNextSibling(checkboxElement, 'label');
                if (label) {
                    labelText = label.innerText.replace(/\*$/, '')
                }
                texts.push(labelText);
            }
        });
        if(value.length > 0)
        {
            this.setData(
              objectIndex,
              {
                  'value': value,
                  'text': texts.join(', '),
              }
            );
            this.enter(objectIndex);
        }
    }

    setListElementEvents (listElement, objectIndex) {
        const listInputElement = listElement.querySelector('input');
        if (!listInputElement) {
            return;
        }

        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listInputElement);
    }

    selectAfterShow (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.containerElement) {
            return;
        }

        // Select "Check all"
        const checkAllElement = object.containerElement.querySelector('.ds44-flex-container button:first-child');
        if (checkAllElement) {
            MiscAccessibility.setFocus(checkAllElement);
            return;
        }

        super.selectAfterShow(objectIndex);
    }

    getListItems (parentElement) {
        let previousItem = null;
        let nextItem = null;
        const selectedListItem = parentElement.querySelector('.ds44-select-list_elem input:focus');
        if (selectedListItem) {
            previousItem = MiscDom.getPreviousSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (previousItem) {
                previousItem = previousItem.querySelector('input');
            }
            nextItem = MiscDom.getNextSibling(selectedListItem.closest('.ds44-select-list_elem'));
            if (nextItem) {
                nextItem = nextItem.querySelector('input');
            }
        }
        return {
            'first': parentElement.querySelector('.ds44-select-list_elem:first-child input'),
            'selected': selectedListItem,
            'last': parentElement.querySelector('.ds44-select-list_elem:last-child input'),
            'next': nextItem,
            'previous': previousItem
        };
    }

    getListElement (object, key, value) {
        let elementSelectListItem = super.getListElement(object, key, value);
        elementSelectListItem.removeAttribute('tabindex');
        elementSelectListItem.innerHTML = null;

        let containerElement = document.createElement('div');
        containerElement.classList.add('ds44-form__container');
        containerElement.classList.add('ds44-checkBox-radio_list');
        elementSelectListItem.appendChild(containerElement);

        const id = 'name-check-form-element-' + MiscUtils.generateId();
        let inputElement = document.createElement('input');
        inputElement.classList.add('ds44-checkbox');
        inputElement.setAttribute('id', id);
        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('value', key);
        containerElement.appendChild(inputElement);

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.classList.add('ds44-boxLabel');
        labelElement.innerHTML = value;
        containerElement.appendChild(labelElement);

        return elementSelectListItem;
    }

    select (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.selectListElement
        ) {
            return;
        }

        const currentItem = evt.currentTarget.closest('.ds44-select-list_elem');
        const currentListInputElement = currentItem.querySelector('input');

        object.selectListElement
            .querySelectorAll('.ds44-select-list_elem')
            .forEach((listElement) => {
                let listInputElement = listElement.querySelector('input');
                let listChildElement = listElement.querySelector('.ds44-select-list_elem_child');
                if (
                    (
                        evt.type === 'mousedown' &&
                        (
                            (
                                listInputElement === currentListInputElement &&
                                !listInputElement.checked
                            ) ||
                            (
                                listInputElement !== currentListInputElement &&
                                listInputElement.checked
                            )
                        )
                    ) ||
                    (
                        evt.type === 'change' &&
                        listInputElement.checked
                    )
                ) {
                    // Is checked
                    listElement.classList.add('selected_option');
                    listElement.setAttribute('aria-selected', 'true');
                    if (listChildElement) {
                        listChildElement.classList.remove('hidden');
                    }
                } else {
                    // Is not checked
                    listElement.classList.remove('selected_option');
                    listElement.removeAttribute('aria-selected');
                    if (listChildElement) {
                        listChildElement.classList.add('hidden');
                    }
                }
            });
        super.changeTitle(objectIndex, object.buttonElement);
    }

    selectFromValue (objectIndex) {
        const checkboxElements = this.getValueCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if (typeof values !== 'object') {
                values = [values];
            }
        }

        checkboxElements.forEach((checkboxElement) => {
            if (values.constructor === ({}).constructor) {
                // Values is JSON
                const childFieldName = Object.keys(values)[0];
                const childFieldElement = checkboxElement.closest('.ds44-select-list_elem').querySelector('[name="' + childFieldName + '"], [data-name="' + childFieldName + '"]');
                if (childFieldElement) {
                    checkboxElement.checked = true;
                    MiscEvent.dispatch('change', null, checkboxElement);
                }
            } else {
                checkboxElement.checked = (
                    values.includes(checkboxElement.value) ||
                    values.includes(parseInt(checkboxElement.value, 10))
                );
                MiscEvent.dispatch('change', null, checkboxElement);
            }
        });
    }

    getDomData (listElement) {
        return {
            'value': listElement.querySelector('input').getAttribute('value'),
            'text': listElement.querySelector('label').textContent
        };
    }

    checkAll (objectIndex) {
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        checkboxElements.forEach((checkboxElement) => {
            checkboxElement.checked = true;
            MiscEvent.dispatch('change', null, checkboxElement);
        });
    }

    uncheckAll (objectIndex) {
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        checkboxElements.forEach((checkboxElement) => {
            checkboxElement.checked = false;
            MiscEvent.dispatch('change', null, checkboxElement);
        });
    }

    getCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }

    getValueCheckboxElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }
}
// Singleton
var FormFieldSelectCheckbox = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldSelectCheckboxClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldSelectCheckbox();
