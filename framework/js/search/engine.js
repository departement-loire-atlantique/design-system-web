// Import : MiscEvent
// Import : MiscRequest
// Import : MiscUrl

class SearchEngine {
    constructor() {
        // Variables
        this.url = '/plugins/ChartePlugin/types/PortletQueryForeach/displayResult.jsp';
        this.element = 'body';
        this.parameters = {};
        this.results = [];

        // Bind events
        MiscEvent.addListener('search:refresh', this.search.bind(this));

        // Initialization
        if (!this.loadFromUrl()) {
            this.loadFromDom();
        }
    }

    loadFromUrl() {
        // Get the data from the url
        const hashParameters = MiscUrl.getHashParameters();
        if (hashParameters) {
            // Save search parameters for further refinements
            this.parameters = hashParameters;

            // Ask other modules to set the parameters
            MiscEvent.dispatch('search:set-parameters', this.parameters);

            return true;
        }

        return false;
    }

    loadFromDom() {
        // Get the data from the dom
        if (window.searchData) {
            if (window.searchData.parameters) {
                // Save search parameters for further refinements
                this.parameters = window.searchData.parameters;

                // Ask other modules to set the parameters
                MiscEvent.dispatch('search:set-parameters', this.parameters);

                // Set url with the search parameters
                MiscUrl.setHashParameters(this.parameters);

                return true;
            }

            // Reset search parameters
            this.parameters = {};

            // Save results
            this.results = window.searchData.results;

            // Show results straight away, without starting a search
            this.showResults();
        }

        return false;
    }

    search(evt) {
        // Show loader
        MiscEvent.dispatch('loader:show', {'parent': this.element});

        // Manage parameters
        if (
            evt.detail &&
            evt.detail.parameters
        ) {
            if (evt.detail.reset === true) {
                // New search
                this.parameters = evt.detail.parameters;
            } else {
                // Mix current and new search
                this.parameters = Object.assign({}, this.parameters, evt.detail.parameters);
            }
        }

        // Set url with the search parameters
        MiscUrl.setHashParameters(this.parameters);

        // Get the results from the back office
        MiscRequest.send(
            this.url,
            this.searchSuccess.bind(this),
            this.searchError.bind(this),
            this.parameters,
            'POST'
        )
    }

    searchSuccess(response) {
        // Save results
        this.results = response.results;

        this.showResults();
        MiscEvent.dispatch('loader:hide', {'parent': this.element});
    }

    searchError() {
        MiscEvent.dispatch('loader:hide', {'parent': this.element});
    }

    showResults() {
        MiscEvent.dispatch('search:update', this.results);
    }
}

new SearchEngine();
