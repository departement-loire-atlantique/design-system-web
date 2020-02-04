class MiscUrl {
    static getHashParameters() {
        const url = document.location.href;
        if (
            url.indexOf('#') === -1 ||
            url.indexOf('#') === (url.length - 1)
        ) {
            // No hash
            return null;
        }

        // Has a hash
        return url
            .slice(url.indexOf('#') + 1)
            .split('&')
            .reduce(
                (params, hash) => {
                    const split = hash.split('=');
                    const key = split.shift();
                    const value = split.join('=');
                    return Object.assign(
                        params,
                        {
                            [key]: (value ? window.decodeURIComponent(value) : null)
                        }
                    );
                },
                {}
            );
    }

    static setHashParameters(parameters = {}) {
        let newUrl = document.location.href.split('#')[0] + '#';

        const sortedParameters = {};
        Object.keys(parameters).sort().forEach(function (key) {
            sortedParameters[key] = parameters[key];
        });

        for (let key in sortedParameters) {
            let value = sortedParameters[key];

            newUrl += key.toLowerCase() + (value ? '=' + window.decodeURIComponent(value) : '') + '&';
        }
        document.location.href = newUrl.replace(/&$/, '');
    }
}
