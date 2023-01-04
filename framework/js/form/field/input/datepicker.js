class FormFieldInputDatepickerClass extends FormFieldInputAbstract {
    constructor () {
        super("FormFieldInputDatepicker", '.ds44-datepicker__shape', 'datepicker');

        this.lastInputValue = null;
        this.calendar = null;

        MiscEvent.addListener('keyUp:escape', this.escape.bind(this));
    }

    create (element) {
        super.create(element);

        let valueElement = element.parentNode.querySelector(".ds44-input-value");
        if(!valueElement)
        {
            // Create corresponding hidden input to store the value
            valueElement = document.createElement('input');
            valueElement.classList.add('ds44-input-value');
            valueElement.setAttribute('type', 'hidden');
            element.parentNode.insertBefore(valueElement, element);
        }

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.valueElement = valueElement;
        object.inputElements = element.querySelectorAll('input[type="text"]');
        object.calendarButtonElement = MiscDom.getNextSibling(element, '.ds44-calendar');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (object.isSubSubInitialized) {
                continue;
            }
            object.isSubSubInitialized = true;

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

            if (object.calendarButtonElement) {
                MiscEvent.addListener('click', this.showHideCalendar.bind(this, objectIndex), object.calendarButtonElement);
            }

            if(object.inputElements[0].value && object.inputElements[1].value && object.inputElements[2].value)
            {
                this.record(objectIndex);
            }
            else
            {
                object.element.classList.remove('show');
                object.inputElements[2].value = null;
                object.inputElements[1].value = null;
                object.inputElements[0].value = null;
            }

        }

    }

    write (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !object.textElement ||
            !object.textElement.contains(document.activeElement)
        ) {
            return;
        }

        this.record(objectIndex);
        this.showNotEmpty(objectIndex);
    }

    reset (objectIndex) {
        const object = this.objects[objectIndex];
        Debug.log("Reset Date");
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
            object.inputElements[2].value = null;
        }

        super.reset(objectIndex);
    }

    escape () {
        if (!this.calendar) {
            return;
        }

        const object = this.objects[this.calendar.index];
        this.hideCalendar();

        if (object && object.calendarButtonElement) {
            MiscAccessibility.setFocus(object.calendarButtonElement);
        }
    }

    disableElements (objectIndex, evt) {
        const object = this.objects[objectIndex];
        Debug.log("Disable Date");
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
            object.inputElements[2].value = null;
        }

        super.disableElements(objectIndex, evt);
    }

    focus (objectIndex) {
        this.lastInputValue = null;

        const object = this.objects[objectIndex];
        if (object && object.isEnabled && object.textElement) {
            object.textElement.classList.add('show');
        }

        super.focus(objectIndex);
    }

    blur (objectIndex) {
        this.lastInputValue = null;

        super.blur(objectIndex);
    }

    quit (objectIndex) {
        super.quit(objectIndex);

        const object = this.objects[objectIndex];
        if (object && object.textElement) {
            object.textElement.classList.remove('show');
        }
    }

    focusOut (objectIndex, evt) {
        if (
            !this.calendar ||
            this.calendar.index !== objectIndex
        ) {
            return;
        }

        const object = this.objects[objectIndex];
        if (
            !object ||
            !evt ||
            object.containerElement.contains(evt.target)
        ) {
            return;
        }

        this.hideCalendar();
    }

    keyDown (objectIndex, evt) {
        this.lastInputValue = evt.currentTarget.value;
    }

    keyPress (objectIndex, evt) {
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

    keyUp (objectIndex, evt) {
        if (
            !this.lastInputValue ||
            this.lastInputValue.length !== 1 ||
            evt.currentTarget.value.length !== 2
        ) {
            return;
        }

        // If two digits, go to next field
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (evt.currentTarget === object.inputElements[0]) {
            MiscAccessibility.setFocus(object.inputElements[1]);
        } else {
            MiscAccessibility.setFocus(object.inputElements[2]);
        }
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const dateYear = parseInt(object.inputElements[2].value, 10) || '';
        const dateMonth = parseInt(object.inputElements[1].value, 10) || '';
        const dateDay = parseInt(object.inputElements[0].value, 10) || '';
        if ((dateYear + '-' + dateMonth + '-' + dateDay) === '--') {
            return null;
        }

        return dateYear + '-' + (dateMonth + '').padStart(2, '0') + '-' + (dateDay + '').padStart(2, '0');
    }

    record (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

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

    isValid (objectIndex) {
        if (!super.isValid(objectIndex)) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data &&
            !this.isEmpty(objectIndex)
        ) {
            return false;
        }

        if (!this.checkChronology(objectIndex)) {
            return false;
        }

        if (!this.checkPastDates(objectIndex)) {
            return false;
        }

        if (!this.checkNextYearDates(objectIndex)) {
            return false;
        }

        return true;
    }

    checkChronology (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            !object.textElement.getAttribute('data-previous-date-id')
        ) {
            return true;
        }

        const previousDateValueElement = MiscDom.getPreviousSibling(
            document.querySelector('#' + object.textElement.getAttribute('data-previous-date-id')).parentNode,
            'input[type="hidden"]'
        );
        if (
            previousDateValueElement &&
            (new Date(data[object.name].value) < new Date(previousDateValueElement.value))
        ) {
            return false;
        }

        return true;
    }

    getDateText (date) {
        if (!date) {
            date = new Date();
        }
        return date.getFullYear() + '-' + ((date.getMonth() + 1) + '').padStart(2, '0') + '-' + (date.getDate() + '').padStart(2, '0');
    }

    checkPastDates (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            object.textElement.getAttribute('data-past-dates') !== 'false'
        ) {
            return true;
        }

        const nowText = this.getDateText();
        if (new Date(data[object.name].value).getTime() <= (new Date(nowText).getTime() - 1)) {
            return false;
        }

        return true;
    }

    checkNextYearDates (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return false;
        }

        const data = this.getData(objectIndex);
        if (
            !data ||
            object.textElement.getAttribute('data-next-year-dates') !== 'false'
        ) {
            return true;
        }

        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        const oneYearFromNowText = this.getDateText(oneYearFromNow);
        if (new Date(data[object.name].value).getTime() >= (new Date(oneYearFromNowText).getTime() + 1)) {
            return false;
        }

        return true;
    }

    showHideCalendar (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let showCalendar = !(this.calendar && this.calendar.id === object.id);
        if (!showCalendar) {
            this.hideCalendar();

            return;
        }

        this.showCalendar(objectIndex);
    }

    showCalendar (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        this.hideCalendar();

        this.calendar = {
            'id': object.id,
            'index': objectIndex,
            'object': new CalendarStandard({
                'element': object.containerElement.querySelector('.vanilla-calendar'),
                'onSelect': this.selectDate.bind(this, objectIndex)
            })
        };
    }

    hideCalendar () {
        if (this.calendar) {
            const object = this.objects[this.calendar.index];

            this.calendar.object.destroy();
            this.calendar = null;
        }
    }

    selectDate (objectIndex, data) {
        this.setDate(objectIndex, data.date);
        this.focusOnTextElement(objectIndex);
        this.record(objectIndex);
        this.showNotEmpty(objectIndex);

        // Let's roll some time so we can show with day is chosen
        window.setTimeout(this.hideCalendar.bind(this), 200);
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.textElement.classList.add('show');
    }

    setDate (objectIndex, date) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const selectedData = new Date(date);
        object.inputElements[0].value = (selectedData.getDate() + '').padStart(2, '0');
        object.inputElements[1].value = ((selectedData.getMonth() + 1) + '').padStart(2, '0');
        object.inputElements[2].value = (selectedData.getFullYear() + '').padStart(2, '0');

        Debug.log("Day : "+object.inputElements[0].value);
        Debug.log("Month : "+object.inputElements[1].value);
        Debug.log("Year : "+object.inputElements[2].value);
    }

    getErrorMessage (objectIndex) {
        if (!this.checkChronology(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE');
        }

        if (!this.checkPastDates(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_PAST_DATE_ERROR_MESSAGE');
        }

        if (!this.checkNextYearDates(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE');
        }

        if (this.getText(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE');
        }

        return this.formatErrorMessage(objectIndex);
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        if (data && data.value) {
            this.setDate(objectIndex, data.value);
            this.focus(objectIndex);
        }
    }
}
// Singleton
var FormFieldInputDatepicker = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldInputDatepickerClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldInputDatepicker();