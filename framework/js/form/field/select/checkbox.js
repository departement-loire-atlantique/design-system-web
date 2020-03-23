class FormFieldSelectCheckbox extends FormFieldSelectAbstract {
    constructor (selector, category) {
        if (selector && category) {
            super(
                selector,
                category
            );

            return;
        }

        super(
            '.ds44-selectDisplay.ds44-js-select-checkbox',
            'selectCheckbox'
        );
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

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

    setListElementEvents (listElement, objectIndex) {
        const listInputElement = listElement.querySelector('input');
        if (!listInputElement) {
            return;
        }

        MiscEvent.addListener('change', this.select.bind(this, objectIndex), listInputElement);
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
        const checkboxElements = this.getCheckboxElements(objectIndex);
        if (!checkboxElements) {
            return;
        }

        const object = this.objects[objectIndex];
        const data = this.getData(objectIndex);
        let values = [];
        if (data && data[object.name].value) {
            values = data[object.name].value;
            if(typeof values !== 'object') {
                values = [values];
            }
        }

        checkboxElements.forEach((checkboxElement) => {
            checkboxElement.checked = (values.includes(checkboxElement.value));
            MiscEvent.dispatch('change', null, checkboxElement);
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
        if (!object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('input');
    }
}

// Singleton
new FormFieldSelectCheckbox();
