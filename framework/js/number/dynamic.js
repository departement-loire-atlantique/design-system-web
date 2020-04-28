class NumberDynamic {
    constructor () {
        this.duration = 4000; // Seconds
        this.increment = 100;

        document
            .querySelectorAll('.ds44-js-dynamic-number')
            .forEach((dynamicNumberElement) => {
                if (dynamicNumberElement.getAttribute('data-stop')) {
                    this.create(dynamicNumberElement);
                }
            });
    }

    create (dynamicNumberElement) {
        const start = parseFloat(dynamicNumberElement.getAttribute('data-start') || 0);
        const stop = parseFloat(dynamicNumberElement.getAttribute('data-stop'));
        const languageIso = (MiscTranslate.getLanguage() === 'fr' ? 'fr-FR' : 'en-GB');
        const isInteger = (stop === parseInt(stop, 10));
        const fractionDigits = (isInteger ? 0 : 1);

        let value = start;
        for (let i = 0; i <= this.duration; i = (i + this.increment)) {
            window.setTimeout(
                ((dynamicNumberElement, value, languageIso, fractionDigits) => {
                    return () => {
                        dynamicNumberElement.innerText = new Intl.NumberFormat(
                            languageIso,
                            {
                                minimumFractionDigits: fractionDigits,
                                maximumFractionDigits: fractionDigits
                            }
                        ).format(value);
                    }
                })(dynamicNumberElement, value, languageIso, fractionDigits),
                i
            );

            value += (stop - start) / (this.duration / this.increment);
        }
    }
}

// Singleton
new NumberDynamic();
