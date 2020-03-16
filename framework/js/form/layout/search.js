class FormLayoutSearch {
    constructor () {
        this.objects = [];

        document
            .querySelectorAll('.ds44-facette form')
            .forEach((element) => {
                this.create(element);
            });
    }

    create (element) {
        const object = {
            'id': MiscUtils.generateId(),
            'formElement': element,
            'parameters': {},
            'searchData': {},
            'hasSearched': false
        };
        this.objects.push(object);
        const objectIndex = (this.objects.length - 1);

        // Bind events
        MiscEvent.addListener('form:submit', this.submit.bind(this, objectIndex), object.formElement);
        MiscEvent.addListener('search:refresh', this.search.bind(this, objectIndex));

        // Initialization
        if (!this.loadFromUrl(objectIndex)) {
            this.loadFromDom(objectIndex);
        }
    }

    submit (objectIndex, evt) {
        if (!evt) {
            evt = {};
        }
        if (!evt.detail) {
            evt.detail = {};

        }
        evt.detail.reset = true;

        const object = this.objects[objectIndex];
        object.hasSearched = true;
        this.search(objectIndex, evt);
    }

    loadFromUrl (objectIndex) {
        const object = this.objects[objectIndex];

        // Get the data from the url
        const hashParameters = MiscUrl.getHashParameters();
        if (hashParameters) {
            // Save search parameters for further refinements
            object.parameters = hashParameters;

            // Ask other modules to set the parameters
            MiscEvent.dispatch('search:set-parameters', object.parameters);

            // Start search
            object.hasSearched = true;
            this.search(objectIndex, {'detail': {'parameters': object.parameters}});

            return true;
        }

        return false;
    }

    loadFromDom (objectIndex) {
        const object = this.objects[objectIndex];

        // Get the data from the dom
        if (window.searchData) {
            if (window.searchData.parameters) {
                // Save search parameters for further refinements
                object.parameters = window.searchData.parameters;

                // Ask other modules to set the parameters
                MiscEvent.dispatch('search:set-parameters', object.parameters);

                // Set url with the search parameters
                MiscUrl.setHashParameters(object.parameters);

                // Start search
                object.hasSearched = true;
                this.search(objectIndex, {'detail': {'parameters': object.parameters}});

                return true;
            }

            // Reset search parameters
            object.parameters = {};

            // Save response data
            object.searchData = this.formatSearchData(window.searchData);

            // Show search data straight away, without starting a search
            object.hasSearched = true;
            this.showSearchData(objectIndex);
        }

        return false;
    }

    search (objectIndex, evt) {
        const object = this.objects[objectIndex];

        if (!object.hasSearched) {
            return;
        }

        if (
            !evt ||
            !evt.detail ||
            !evt.detail.parameters
        ) {
            return;
        }

        // Show loader
        MiscEvent.dispatch('loader:requestShow');

        // Manage parameters
        const options = {};
        if (evt.detail.reset === true) {
            // New search
            object.parameters = evt.detail.parameters;
            options.zoom = true;
        } else {
            // Mix current and new search
            object.parameters = Object.assign({}, object.parameters, evt.detail.parameters);
        }

        // Set url with the search parameters
        MiscUrl.setHashParameters(object.parameters);

        // Get the search data from the back office
        MiscRequest.send(
            object.formElement.getAttribute('action'),
            this.searchSuccess.bind(this, objectIndex, options),
            this.searchError.bind(this, objectIndex, options),
            object.parameters,
            (MiscUtils.isInDevMode() ? 'GET' : 'POST')
        )
    }

    searchSuccess (objectIndex, options, response) {
        const object = this.objects[objectIndex];

        // Save search data
        object.searchData = this.formatSearchData(response);

        this.showSearchData(objectIndex, options);
        MiscEvent.dispatch('loader:requestHide');
    }

    searchError (objectIndex, options) {
        MiscEvent.dispatch('loader:requestHide');
    }

    showSearchData (objectIndex, options = {}) {
        const object = this.objects[objectIndex];

        MiscEvent.dispatch('search:update', Object.assign({}, object.searchData, options));
    }

    formatSearchData (response) {
        return {
            'nbResults': response['nb-result'],
            'maxResults': response['max-result'],
            'results': response['result']
        };
    }
}

new FormLayoutSearch();
