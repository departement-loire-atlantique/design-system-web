class MiscRequest {
    static send (url, successCallback, errorCallback, parameters = null, method = 'GET') {
        if (parameters && method.toLowerCase() === 'get') {
            url += (url.includes('?') ? '&' : '?') + MiscUrl.jsonToUrl(parameters).toString();
            parameters = null;
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url, true);
        xhr.onreadystatechange = () => {
            try {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.response(xhr, successCallback);

                        return;
                    }

                    this.response(xhr, errorCallback);
                }
            } catch (ex) {
                console.log(ex);

                this.response(xhr, errorCallback);
            }
        };

        if (parameters) {
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(parameters));
        } else {
            xhr.send();
        }

        return xhr;
    }

    static response (xhr, callback) {
        if (xhr && callback) {
            if (!xhr.getResponseHeader('content-type')) {
                callback(xhr.response);

                return;
            }

            const responseHeaders = xhr.getResponseHeader('content-type').toLowerCase().split(';');
            if (responseHeaders.indexOf('application/json') !== -1) {
                callback(JSON.parse(xhr.response));

                return;
            }

            callback(xhr.response);
        }
    }
}
