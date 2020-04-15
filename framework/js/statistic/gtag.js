class StatisticGtag {
    constructor () {
        MiscEvent.addListener('statistic:gtag:event', this.sendEvent.bind(this));
        document.body.addEventListener('click', this.detectClick.bind(this), true);
    }

    sendEvent (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.data ||
            !evt.detail.statistic ||
            !evt.detail.statistic.name ||
            !evt.detail.statistic.category ||
            !evt.detail.statistic.action
        ) {
            return;
        }

        const gtagEvent = {
            'event': evt.detail.statistic.name,
            'eventCategory': evt.detail.statistic.category,
            'eventAction': this.populate(evt.detail.statistic.action, evt.detail.data)
        };
        if (evt.detail.statistic.label) {
            gtagEvent.eventLabel = this.populate(evt.detail.statistic.label, evt.detail.data);
        }

        this.send(gtagEvent);
    }

    send (gtagEvent) {
        if (MiscUtils.isInDevMode()) {
            console.log('Event gtag: ' + JSON.stringify(gtagEvent));
        } else {
            window.dataLayer.push(gtagEvent);
        }
    }

    populate (input, data) {
        const matches = input.match(/\$[a-zA-Z-_\|]+/g);
        if (!matches) {
            return input;
        }

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i].replace('$', '');

            let value = null;
            if (!match.includes('|')) {
                // Simple data key
                if (data[match]) {
                    value = data[match].value;
                }
            } else {
                // Nested data key
                let nestedValue = Object.assign({}, data);
                const dataKeys = match.split('|');
                for (let j = 0; j < dataKeys.length; j++) {
                    nestedValue = nestedValue[dataKeys[j]];

                    if (typeof nestedValue === 'undefined') {
                        nestedValue = null;
                        break;
                    }
                }
                value = nestedValue;
            }

            if (
                value !== null &&
                typeof value === 'object'
            ) {
                input = input.replace('$' + match, JSON.stringify(value));
            } else {
                input = input.replace('$' + match, (value || ''));
            }
        }

        return input;
    }

    detectClick (evt) {
        if (!evt.target) {
            return;
        }

        const statisticElement = evt.target.closest('[data-statistic]:not(form)')
        if (statisticElement) {
            try {
                const statistic = JSON.parse(statisticElement.getAttribute('data-statistic'));
                const gtagEvent = {
                    'event': statistic.name,
                    'eventCategory': statistic.category,
                    'eventAction': statistic.action
                };
                if (statistic.label) {
                    gtagEvent.eventLabel = statistic.label;
                }

                this.send(gtagEvent);
            } catch (ex) {
            }
        }
    }
}

// Singleton
new StatisticGtag();
