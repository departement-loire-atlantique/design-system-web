class FormFieldSelectMultilevel extends FormFieldSelectCheckbox {
    constructor() {
        super(
            '.ds44-selectDisplay.ds44-js-select-multilevel',
            'selectMultilevel'
        );
    }

    initialize() {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            if (object.selectListElement) {
                object.selectListElement
                    .querySelectorAll('.ds44-select__categ input')
                    .forEach((listInputElement) => {
                        MiscEvent.addListener('change', this.selectCategory.bind(this), listInputElement);
                    });
            }

            // Remove data-url attribute as multilevel select do not exist yet
            object.textElement.removeAttribute('data-url');
        }
    }

    select(objectIndex, evt) {
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

    selectCategory(evt) {
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

    getCheckboxElements(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.selectListElement) {
            return null;
        }

        return object.selectListElement.querySelectorAll('.ds44-select__categ input');
    }
}

// Singleton
new FormFieldSelectMultilevel();
