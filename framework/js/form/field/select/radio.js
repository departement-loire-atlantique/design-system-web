class FormFieldSelectRadio extends FormFieldSelectAbstract {
    constructor () {
        super(
            '.ds44-selectDisplay.ds44-js-select-radio',
            'selectRadio'
        );
    }

    setListElementEvents (listElement, objectIndex) {
        const listInputElement = listElement.querySelector('input');
        if (!listInputElement) {
            return;
        }

        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listInputElement);
    }

    nextOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return;
        }
        if (!object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (!listItems.selected) {
            // Select first
            MiscAccessibility.setFocus(listItems.first);
        }
    }

    previousOption (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return;
        }
        if (!object.isExpanded) {
            return;
        }

        const listItems = this.getListItems(object.selectListElement);
        if (!listItems.selected) {
            // Select last
            MiscAccessibility.setFocus(listItems.last);
        }
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
        inputElement.classList.add('ds44-radio');
        inputElement.setAttribute('id', id);
        inputElement.setAttribute('name', object.id);
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('value', key);
        containerElement.appendChild(inputElement);

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', id);
        labelElement.classList.add('ds44-radioLabel');
        labelElement.innerHTML = value;
        containerElement.appendChild(labelElement);

        return elementSelectListItem;
    }

    select (objectIndex, evt) {
        evt.preventDefault();

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.selectListElement) {
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
                    if (listChildElement) {
                        listChildElement.classList.remove('hidden');
                    }
                } else {
                    // Is not checked
                    listElement.classList.remove('selected_option');
                    if (listChildElement) {
                        listChildElement.classList.add('hidden');
                    }
                }
            });
    }

    selectFromValue (objectIndex) {
        const radioElements = this.getRadioElements(objectIndex);
        if (!radioElements) {
            return;
        }

        const object = this.objects[objectIndex];
        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if (typeof values !== 'object') {
                values = [values];
            }
        }

        radioElements.forEach((radioElement) => {
            if (values.constructor === ({}).constructor) {
                // Values is JSON
                const childFieldName = Object.keys(values)[0];
                const childFieldElement = radioElement.closest('.ds44-select-list_elem').querySelector('[name="' + childFieldName + '"], [data-name="' + childFieldName + '"]');
                if (childFieldElement) {
                    radioElement.checked = true;
                    MiscEvent.dispatch('change', null, radioElement);
                }
            } else {
                radioElement.checked = (
                    values.includes(radioElement.value) ||
                    values.includes(parseInt(radioElement.value, 10))
                );
                MiscEvent.dispatch('change', null, radioElement);
            }
        });
    }

    getDomData (listElement) {
        return {
            'value': listElement.querySelector('input').getAttribute('value'),
            'text': listElement.querySelector('label').innerText
        };
    }

    getRadioElements (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }
}

// Singleton
new FormFieldSelectRadio();
