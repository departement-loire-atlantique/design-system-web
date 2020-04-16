class MiscForm {
    static getValidationCategories () {
        return {
            'inputStandard': null,
            'inputFile': null,
            'inputAutocomplete': null,
            'textarea': null,
            'checkbox': null,
            'radio': null,
            'selectStandard': null,
            'selectRadio': null,
            'selectCheckbox': null,
            'selectMultilevel': null,
            'datepicker': null
        };
    }

    static buildFormData (formData, data, parentKey) {
        if (
            data &&
            typeof data === 'object' &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach(key => {
                MiscForm.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });

            return;
        }

        const value = (data == null ? '' : data);
        formData.append(parentKey, value);
    }

    static jsonToFormData (data) {
        const formData = new FormData();
        MiscForm.buildFormData(formData, data);
        return formData;
    }

    static checkValidity (validationCategories) {
        // Check if the components are all valid
        let isValid = true;
        let data = {};
        for (let category in validationCategories) {
            if (!validationCategories.hasOwnProperty(category)) {
                continue;
            }

            if (
                !validationCategories[category] ||
                validationCategories[category].isValid !== true
            ) {
                isValid = false;
            } else if (validationCategories[category].data) {
                data = Object.assign(data, validationCategories[category].data);
            }
        }

        return {
            'isValid': isValid,
            'data': data
        };
    }

    static isEmail (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    static isPhone (value) {
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value);
    }

    static isPostcode (value) {
        return /^(?:(?:0[1-9]|[1-8]\d|9[0-5]|9[7-8])\d{3})$/.test(value);
    }
}
