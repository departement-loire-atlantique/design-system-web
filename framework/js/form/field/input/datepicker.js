class FormFieldInputDatepicker extends FormFieldInputAbstract {
    constructor() {
        super('.ds44-datepicker__shape', 'datepicker');

        this.lastInputValue = null;
        this.calendar = null;
        this.invalidFormatMessage = 'Date invalide. Merci de respecter le format d’exemple.';

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this));
    }

    create(element) {
        super.create(element);

        // Create corresponding hidden input to store the value
        let valueElement = document.createElement('input');
        valueElement.classList.add('ds44-input-value');
        valueElement.setAttribute('type', 'hidden');
        element.parentNode.insertBefore(valueElement, element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];

        object.valueElement = valueElement;
        object.inputElements = element.querySelectorAll('input[type="text"]');

        object.inputElements.forEach((inputElement) => {
            MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), inputElement);
            MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), inputElement);
        });

        MiscEvent.addListener('keydown', this.keyDown.bind(this, objectIndex), object.inputElements[0]);
        MiscEvent.addListener('keydown', this.keyDown.bind(this, objectIndex), object.inputElements[1]);
        MiscEvent.addListener('keyup', this.keyUp.bind(this, objectIndex), object.inputElements[0]);
        MiscEvent.addListener('keyup', this.keyUp.bind(this, objectIndex), object.inputElements[1]);

        MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[0]);
        MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[1]);
        MiscEvent.addListener('keypress', this.keyPress.bind(this, objectIndex), object.inputElements[2]);

        MiscEvent.addListener('click', this.focusOut.bind(this, objectIndex), document.body);

        object.calendarButton = MiscDom.getNextSibling(element, '.ds44-calendar');
        if (object.calendarButton) {
            MiscEvent.addListener('click', this.showHideCalendar.bind(this, objectIndex), object.calendarButton);
        }
    }

    write(objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }
        if (!object.textElement.contains(document.activeElement)) {
            return;
        }

        this.record(objectIndex);
        this.showHideResetButton(objectIndex);
        this.enableDisableLinkedField(objectIndex);
    }

    reset(objectIndex) {
        const object = this.objects[objectIndex];

        object.inputElements[0].value = null;
        object.inputElements[1].value = null;
        object.inputElements[2].value = null;

        super.reset(objectIndex);
    }

    escape() {
        if (!this.calendar) {
            return;
        }

        const object = this.objects[this.calendar.index];
        this.hideCalendar();

        if (object && object.calendarButton) {
            MiscAccessibility.setFocus(object.calendarButton);
        }
    }

    disableElements(objectIndex) {
        const object = this.objects[objectIndex];

        object.inputElements[0].value = null;
        object.inputElements[1].value = null;
        object.inputElements[2].value = null;

        super.disableElements(objectIndex);
    }

    focus(objectIndex) {
        this.lastInputValue = null;

        const object = this.objects[objectIndex];
        if (!object.isEnabled || !object.textElement) {
            return;
        }

        super.focus(objectIndex);

        object.textElement.classList.add('show');
    }

    blur(objectIndex) {
        this.lastInputValue = null;

        super.blur(objectIndex);

        if (!this.isEmpty(objectIndex)) {
            return;
        }

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        object.textElement.classList.remove('show');
    }

    focusOut(objectIndex, evt) {
        if (
            !this.calendar ||
            this.calendar.index !== objectIndex
        ) {
            return;
        }

        const object = this.objects[objectIndex];
        if (
            !evt ||
            object.containerElement.contains(evt.target)
        ) {
            return;
        }

        this.hideCalendar();
    }

    keyDown(objectIndex, evt) {
        this.lastInputValue = evt.currentTarget.value;
    }

    keyPress(objectIndex, evt) {
        // Test if it is a number or a letter
        if (
            evt.code.substr(0, 3) !== 'Key' &&
            evt.code.substr(0, 5) !== 'Digit'
        ) {
            return true;
        }

        // Test if the result is a numeric value
        const currentValue = evt.currentTarget.value;
        const selectionIndex = evt.currentTarget.selectionStart;
        const key = evt.key;
        const futureValue = currentValue.slice(0, selectionIndex) + key + currentValue.slice(selectionIndex);
        if (
            futureValue &&
            !futureValue.match(/^[0-9]+$/gi)
        ) {
            evt.stopPropagation();
            evt.preventDefault();

            return false;
        }
    }

    keyUp(objectIndex, evt) {
        if (
            !this.lastInputValue ||
            this.lastInputValue.length !== 1 ||
            evt.currentTarget.value.length !== 2
        ) {
            return;
        }

        // If two digits, go to next field
        const object = this.objects[objectIndex];
        if (evt.currentTarget === object.inputElements[0]) {
            MiscAccessibility.setFocus(object.inputElements[1]);
        } else {
            MiscAccessibility.setFocus(object.inputElements[2]);
        }
    }

    getText(objectIndex) {
        const object = this.objects[objectIndex];

        const dateYear = parseInt(object.inputElements[2].value, 10) || '';
        const dateMonth = parseInt(object.inputElements[1].value, 10) || '';
        const dateDay = parseInt(object.inputElements[0].value, 10) || '';
        const text = dateYear + '-' + dateMonth + '-' + dateDay;
        if (text === '--') {
            return null;
        }

        return text;
    }

    record(objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        const dateText = this.getText(objectIndex);
        if (
            !dateText ||
            !dateText.match(/^(19|20)\d\d([- /.])(0?[1-9]|1[012])\2(0?[1-9]|[12][0-9]|3[01])$/)
        ) {
            // Not nicely formatted
            this.empty(objectIndex);

            return;
        }

        const dateYear = parseInt(object.inputElements[2].value, 10);
        const dateMonth = (parseInt(object.inputElements[1].value, 10) - 1);
        const dateDay = parseInt(object.inputElements[0].value, 10);
        const date = new Date(dateYear, dateMonth, dateDay);
        if (
            date.getTime() !== date.getTime() ||
            date.getFullYear() !== dateYear ||
            date.getMonth() !== dateMonth ||
            date.getDate() !== dateDay
        ) {
            // If the date object is invalid it
            // will return 'NaN' on getTime()
            // and NaN is never equal to itself.
            this.empty(objectIndex);

            return;
        }

        this.setData(
            objectIndex,
            {
                'value': dateText
            }
        )
    }

    showHideCalendar(objectIndex) {
        const object = this.objects[objectIndex];

        let showCalendar = !(this.calendar && this.calendar.id === object.id);
        if (!showCalendar) {
            this.hideCalendar();

            return;
        }

        this.showCalendar(objectIndex);
    }

    showCalendar(objectIndex) {
        const object = this.objects[objectIndex];

        this.hideCalendar();

        this.calendar = {
            'id': object.id,
            'index': objectIndex,
            'object': new CalendarStandard({
                'element': object.containerElement.querySelector('.vanilla-calendar'),
                'onSelect': this.selectDate.bind(this, objectIndex)
            })
        };
        if (object.calendarButton) {
            object.calendarButton.setAttribute('aria-expanded', 'true');
        }
    }

    hideCalendar() {
        if (this.calendar) {
            const object = this.objects[this.calendar.index];

            this.calendar.object.destroy();
            this.calendar = null;

            if (object && object.calendarButton) {
                object.calendarButton.setAttribute('aria-expanded', 'false');
            }
        }
    }

    selectDate(objectIndex, data) {
        const object = this.objects[objectIndex];
        const selectedData = new Date(data.date);
        object.inputElements[0].value = (selectedData.getDate() + '').padStart(2, '0');
        object.inputElements[1].value = ((selectedData.getMonth() + 1) + '').padStart(2, '0');
        object.inputElements[2].value = (selectedData.getFullYear() + '').padStart(2, '0');

        this.hideCalendar();
        this.focusOnTextElement(objectIndex);
        this.record(objectIndex);
        this.showHideResetButton(objectIndex);
        this.enableDisableLinkedField(objectIndex);
    }

    getErrorMessage(objectIndex) {
        if (this.getText(objectIndex)) {
            return this.invalidFormatMessage;
        }

        return this.errorMessage;
    }
}

// Singleton
new FormFieldInputDatepicker();
