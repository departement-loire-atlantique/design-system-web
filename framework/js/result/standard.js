class ResultStandard {
    constructor () {
        MiscEvent.addListener('search:update', this.show.bind(this));
    }

    show (evt) {
        const containerElement = document.querySelector('.ds44-results .ds44-innerBoxContainer');
        if (!containerElement) {
            return;
        }

        // Manage legend
        const legendElement = containerElement.querySelector('.ds44-textLegend');
        if (legendElement) {
            if (evt.detail.nbResults > evt.detail.maxResults) {
                legendElement.classList.remove('hidden');
            } else {
                legendElement.classList.add('hidden');
            }
        }

        // Manage title
        let titleElement = containerElement.querySelector('.h3-like');
        if (!titleElement) {
            titleElement = document.createElement('p');
            titleElement.className = 'h3-like mbs';
            titleElement.setAttribute('role', 'heading');
            titleElement.setAttribute('aria-level', '2');
            containerElement.appendChild(titleElement);
        }
        titleElement.innerText = evt.detail.nbResults + ' résultat' + (evt.detail.nbResults > 1 ? 's' : '');

        // Remove existing results
        let listElement = containerElement.querySelector('.ds44-list');
        if (listElement) {
            listElement.remove();
        }
        listElement = document.createElement('ul');
        listElement.className = 'ds44-list ds44-list--results ds44-flex-container';
        containerElement.appendChild(listElement);

        // Add new results
        const results = evt.detail.results;
        for (let resultIndex in results) {
            if (!results.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = results[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.html_list
            ) {
                continue;
            }

            const listItemElement = document.createElement('li');
            listItemElement.setAttribute('id', 'search-result-' + result.id);
            listItemElement.className = 'ds44-fg1';
            listItemElement.innerHTML = result.metadata.html_list;
            MiscEvent.addListener('mouseenter', this.focus.bind(this), listItemElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), listItemElement);
            listElement.appendChild(listItemElement);
        }
    }

    focus (evt) {
        const markerId = evt.currentTarget.getAttribute('id').replace('search-result-', 'search-marker-');
        const markerElement = document.querySelector('#' + markerId);
        if(markerElement) {
            markerElement.classList.add('active');
        }
    }

    blur (evt) {
        const markerId = evt.currentTarget.getAttribute('id').replace('search-result-', 'search-marker-');
        const markerElement = document.querySelector('#' + markerId);
        if(markerElement) {
            markerElement.classList.remove('active');
        }
    }
}

// Singleton
new ResultStandard();
