class StoreLocation {
    constructor () {
        window.addEventListener('load', (evt) => {
            let cityValue = window.sessionStorage.getItem('city');
            if (cityValue) {
                try {
                    cityValue = JSON.parse(cityValue);
                    document
                        .querySelectorAll('[name="commune"]')
                        .forEach((cityElement) => {
                            MiscEvent.dispatch('field:set', cityValue, cityElement.closest('.ds44-form__checkbox_container, ds44-form__radio_container, .ds44-form__container'));
                        });
                } catch (ex) {
                }
            }

            let addressValue = window.sessionStorage.getItem('address');
            if (addressValue) {
                try {
                    addressValue = JSON.parse(addressValue);
                    document
                        .querySelectorAll('[name="adresse"]')
                        .forEach((addressElement) => {
                            MiscEvent.dispatch('field:set', addressValue, addressElement.closest('.ds44-form__checkbox_container, ds44-form__radio_container, .ds44-form__container'));
                        });
                } catch (ex) {
                }
            }
        });
    }
}

// Singleton
new StoreLocation();
