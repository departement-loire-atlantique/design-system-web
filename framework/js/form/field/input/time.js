class FormFieldInputTimeClass extends FormFieldInputAbstract {
    constructor () {
        super("FormFieldInputTime", '.ds44-time__shape', 'time');
        this.lastInputValue = null;
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
            element.append(valueElement);
        }

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.valueElement = valueElement;
        object.inputElements = element.querySelectorAll('input[type="text"]');
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

            if(object.inputElements[0].value && object.inputElements[1].value)
            {
                this.record(objectIndex);
                this.showHideResetButton(objectIndex);
            }
            else
            {
                object.inputElements[0].value = null;
                object.inputElements[1].value = null;
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

    reset (objectIndex, evt) {
        const object = this.objects[objectIndex];
        Debug.log("Reset Time");
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
        }

        super.reset(objectIndex, evt);
    }

    disableElements (objectIndex, evt) {
        const object = this.objects[objectIndex];
        Debug.log("Disable Time");
        if (object) {
            object.inputElements[0].value = null;
            object.inputElements[1].value = null;
        }

        super.disableElements(objectIndex, evt);
    }

    focus (objectIndex) {
        this.lastInputValue = null;

        const object = this.objects[objectIndex];
        super.focus(objectIndex);
    }

    blur (objectIndex) {
        this.lastInputValue = null;

        super.blur(objectIndex);
    }

    quit (objectIndex) {
        super.quit(objectIndex);

        const object = this.objects[objectIndex];
    }

    focusOut (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (
            !object ||
            !evt ||
            object.containerElement.contains(evt.target)
        ) {
            return;
        }
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
        }
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return null;
        }

        const minute = parseInt(object.inputElements[1].value, 10) || '';
        const hour = parseInt(object.inputElements[0].value, 10) || '';

        if ((hour + ':' + minute) === ':') {
            return null;
        }

        return (hour + '').padStart(2, '0') + ':' + (minute + '').padStart(2, '0');
    }

    record (objectIndex, evt) {
        if (evt) {
            evt.preventDefault();
        }

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const timeText = this.getText(objectIndex);

        if (
            !timeText ||
            !timeText.match(/^(?:[01]\d|2[0-3])|(?:[0-5]\d)$/)
        ) {
            // Not nicely formatted
            this.empty(objectIndex);
            return;
        }

        let minute = parseInt(object.inputElements[1].value, 10);
        let hour = parseInt(object.inputElements[0].value, 10);

        const minuteStr = ""+minute;
        if(object.inputElements[1].value.length !== 2)
        {
            minute = minute+"0";
        }
        const dateNow = new Date();
        const date = new Date(dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDay()+" "+hour+":"+minute);


        console.log(date.getHours(), date.getMinutes(), hour, minute);

        if (
          date.getHours() !== hour ||
          date.getMinutes() !== minute
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
                'value': timeText
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

        return true;
    }

    showNotEmpty (objectIndex) {
        super.showNotEmpty(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
    }

    setTime (objectIndex, time) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const dateNow = new Date();
        const selectedData = new Date(dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDay()+" "+time);
        object.inputElements[0].value = (selectedData.getHours() + '').padStart(2, '0');
        object.inputElements[1].value = ((selectedData.getMinutes()) + '').padStart(2, '0');

        Debug.log("Hour : "+object.inputElements[0].value);
        Debug.log("Minute : "+object.inputElements[1].value);
    }

    getErrorMessage (objectIndex) {
        if (this.getText(objectIndex)) {
            return this.formatErrorMessage(objectIndex, 'FIELD_VALID_TIME_FORMAT_ERROR_MESSAGE');
        }

        return this.formatErrorMessage(objectIndex);
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);
        console.log(data);
        if (data && data.value) {
            this.setTime(objectIndex, data.value);
            this.focus(objectIndex);
        }
    }
}
// Singleton
var FormFieldInputTime = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new FormFieldInputTimeClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new FormFieldInputTime();