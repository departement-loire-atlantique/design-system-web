class MiscRequest {
    static send (url, successCallback, errorCallback, parameters = null, method = 'GET') {
        if (!url) {
            return null;
        }

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
            try {
                const responseJson = JSON.parse(xhr.response);
                callback(responseJson);

                return;
            } catch (ex) {
            }

            callback(xhr.response);
        }
    }
}
