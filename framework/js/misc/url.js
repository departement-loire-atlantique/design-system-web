class MiscUrl {
    static getUrlParameters () {
        return window.location.href.split('#')[0].split('?')[0].split('/');
    }

    static getHashParameters () {
        const urlParameters = window.location.href.split('#')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static getQueryParameters () {
        const urlParameters = window.location.href.split('#')[0].split('?')[1];
        return MiscUrl.urlToJson(urlParameters);
    }

    static setHashParameters (parameters = {}) {
        document.location.href = document.location.href.split('#')[0].split('?')[0] + '#' + MiscUrl.jsonToUrl(parameters);
    }

    static getSeoHashParameters () {
        return (window.location.href.split('#')[1] || '').split('/');
    }

    static setSeoHashParameters (parameters = {}, parametersHash) {
        const urlParameters = [];
        const rawUrlParameters = MiscUrl.jsonToUrl(parameters);
        for (const [key, value] of rawUrlParameters.entries()) {
            if (key.match(/\[text\]$/)) {
                urlParameters.push(
                    value.trim()
                        .replace(/, /gi, ',')
                        .replace(/\(/gi, '')
                        .replace(/\)/gi, '')
                );
            }
        }
        urlParameters.push(parametersHash);
        document.location.href = document.location.href.split('#')[0] + '#' + urlParameters.join('/').replace(/ /gi, '-');
    }
	
	static parseBoolean(str) {
    	switch (str.toLowerCase ()) {
        case "true":
          return true;
        case "false":
          return false;
        default:
          return str;
      }
    }

    static jsonToUrl (parameters) {
        const urlParameters = new URLSearchParams();
        MiscUrl.buildUrlParameters(urlParameters, parameters);
        return urlParameters;
    }

    static urlToJson (urlParameters) {
        const json = {};
        const urlParams = new URLSearchParams(urlParameters);
        for (const [key, value] of urlParams.entries()) {
            const matches = key.match(/\[[^\]]*\]/g);
            if (!matches) {
                // No square brackets
                json[key] = {
                    'value':  MiscUrl.parseBoolean(value)
                };

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
                    nestedValue[subKey] =  MiscUrl.parseBoolean(value);
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
