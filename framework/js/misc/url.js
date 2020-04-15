class MiscUrl {
    static getHashParameters () {
        const urlParameters = window.location.href.split('#')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static getQueryParameters () {
        const urlParameters = window.location.href.split('#')[0].split('?')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static setHashParameters (parameters = {}) {
        document.location.href = document.location.href.split('#')[0] + '#' + MiscUrl.jsonToUrl(parameters);
    }

    static jsonToUrl (parameters) {
        const sortedParameters = {};
        Object.keys(parameters).sort().forEach(function (key) {
            sortedParameters[key] = parameters[key];
        });

        const urlParameters = new URLSearchParams();
        MiscUrl.buildUrlParameters(urlParameters, sortedParameters);
        return urlParameters;
    }

    static urlToJson (urlParameters) {
        const json = {};
        const urlParams = new URLSearchParams(urlParameters);
        for (const [key, value] of urlParams.entries()) {
            const matches = key.match(/\[[^\]]*\]/g);
            if (!matches) {
                json[key] = value;

                continue;
            }

            const fieldName = key.split('[')[0];
            if (!json[fieldName]) {
                json[fieldName] = {};
            }
            let nestedValue = json[fieldName];
            for (let i = 0; i < matches.length; i++) {
                const subKey = matches[i].replace('[', '').replace(']', '');
                if (i !== (matches.length - 1)) {
                    if (!nestedValue[subKey]) {
                        const nextSubKey = matches[(i + 1)].replace('[', '').replace(']', '');
                        if (nextSubKey == parseInt(nextSubKey, 10)) {
                            nestedValue[subKey] = [];
                        } else {
                            nestedValue[subKey] = {};
                        }
                    }
                    nestedValue = nestedValue[subKey];
                } else {
                    nestedValue[subKey] = value;
                }
            }
        }

        return json;
    }

    static buildUrlParameters (urlParameters, parameters, parentKey) {
        if (
            parameters &&
            typeof parameters === 'object' &&
            !(parameters instanceof Date) &&
            !(parameters instanceof File)
        ) {
            Object.keys(parameters).forEach(key => {
                MiscUrl.buildUrlParameters(urlParameters, parameters[key], parentKey ? `${parentKey}[${key}]` : key);
            });

            return;
        }

        const value = (parameters == null ? '' : parameters);
        urlParameters.append(parentKey, value);
    }
}
