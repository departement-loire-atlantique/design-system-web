class ResultStandard {
    constructor () {
        this.currentId = null;
        this.savedScrollTop = null;

        MiscEvent.addListener('search:update', this.fillList.bind(this));
        const listContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-list');
        if (listContainerElement) {
            MiscEvent.addListener('click', this.showMore.bind(this), listContainerElement);
        }
    }

    fillCard (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const cardContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-card');
        if (!cardContainerElement) {
            return;
        }

        let scrollTopElement = (document.documentElement || document.body);
        if (cardContainerElement.closest('.ds44-results--mapVisible')) {
            scrollTopElement = cardContainerElement.closest('.ds44-innerBoxContainer');
        }
        this.savedScrollTop = scrollTopElement.scrollTop;
        scrollTopElement.scrollTo({ 'top': 0 });

        MiscEvent.dispatch('loader:requestShow');

        this.currentId = evt.currentTarget.getAttribute('data-id');
        const url = cardContainerElement.getAttribute('data-url');
        MiscRequest.send(
            url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(this.currentId),
            this.fillCardSuccess.bind(this),
            this.fillCardError.bind(this)
        );
    }

    fillCardSuccess (result) {
        const cardContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-card');
        if (!cardContainerElement) {
            return;
        }

        cardContainerElement.innerHTML = result.content_html;

        const buttonElement = cardContainerElement.querySelector('button');
        if (buttonElement) {
            MiscEvent.addListener('click', this.showList.bind(this), buttonElement);
        }

        this.showCard();

        MiscEvent.dispatch('loader:requestHide');
    }

    fillCardError () {
        // TODO: Show error notification

        MiscEvent.dispatch('loader:requestHide');
    }

    showCard () {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const cardContainerElement = containerElement.querySelector('.ds44-js-results-card');
        if (cardContainerElement) {
            MiscAccessibility.show(cardContainerElement);

            const buttonElement = cardContainerElement.querySelector('button');
            if (buttonElement) {
                window.setTimeout(
                    () => {
                        MiscAccessibility.setFocus(null, '.ds44-results .ds44-js-results-container .ds44-js-results-card button');
                    },
                    600
                );
            }
        }

        containerElement.classList.add('ds44-js-show-card');
        this.focus();
    }

    showList () {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const cardContainerElement = containerElement.querySelector('.ds44-js-results-card');
        if (cardContainerElement) {
            MiscAccessibility.hide(cardContainerElement);
        }

        containerElement.classList.remove('ds44-js-show-card');
        this.blur();

        if (this.currentId) {
            const resultElement = document.querySelector('#search-result-' + this.currentId + ' a');
            if (resultElement) {
                MiscAccessibility.setFocus(resultElement);
            }
            this.currentId = null;
        }
        if (this.savedScrollTop) {
            let scrollTopElement = (document.documentElement || document.body);
            if (containerElement.closest('.ds44-results--mapVisible')) {
                scrollTopElement = containerElement.closest('.ds44-innerBoxContainer');
            }
            scrollTopElement.scrollTo({ 'top': this.savedScrollTop });

            this.savedScrollTop = null;
        }
    }

    showMore (evt) {
        if (
            !evt ||
            !evt.target ||
            !evt.target.closest('.ds44-js-search-button')
        ) {
            return;
        }

        MiscEvent.dispatch(
            'search:refresh',
            {
                'next': true
            });
    }

    fillList (evt) {
        const containerElement = document.querySelector('.ds44-results .ds44-js-results-container');
        if (!containerElement) {
            return;
        }

        const listContainerElement = containerElement.querySelector('.ds44-js-results-list');
        if (!listContainerElement) {
            return;
        }

        // Nb display results
        const nbDisplayedResults = (evt.detail.pageIndex + 1) * evt.detail.nbResultsPerPage;

        // Show hide empty results
        const parentElement = document.querySelector('.ds44-results');
        if(nbDisplayedResults > 0) {
            parentElement.classList.remove('ds44-results--empty');
        } else {
            parentElement.classList.add('ds44-results--empty');
        }

        // Manage legend
        const legendElement = listContainerElement.querySelector('.ds44-textLegend');
        if (legendElement) {
            if (nbDisplayedResults > evt.detail.maxResults) {
                legendElement.classList.remove('hidden');
            } else {
                legendElement.classList.add('hidden');
            }
        }

        // Manage title
        let newSearchElement = listContainerElement.querySelector('#ds44-results-new-search');
        if (newSearchElement) {
            newSearchElement.remove();
        }
        let titleElement = listContainerElement.querySelector('.h3-like');
        if (!titleElement) {
            titleElement = document.createElement('p');
            titleElement.className = 'h3-like mbs';
            titleElement.setAttribute('role', 'heading');
            titleElement.setAttribute('aria-level', '2');
            listContainerElement.appendChild(titleElement);
        }
        titleElement.innerText = evt.detail.nbResults + ' ';
        if(evt.detail.nbResults > 1) {
            titleElement.innerText += MiscTranslate._('RESULTS');
        } else {
            titleElement.innerText += MiscTranslate._('RESULT');
        }

        // Remove existing results
        let listElement = listContainerElement.querySelector('.ds44-list');
        if (listElement && !evt.detail.addUp) {
            listElement.remove();
            listElement = null;
        }
        if (!listElement) {
            listElement = document.createElement('ul');
            listElement.className = 'ds44-list ds44-list--results ds44-flex-container';
            listContainerElement.appendChild(listElement);
        }

        // Add new results
        let firstResultElement = null;
        const results = (evt.detail.addUp ? evt.detail.newResults : evt.detail.results);
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
            listItemElement.setAttribute('data-id', result.id);
            listItemElement.className = 'ds44-fg1 ds44-js-results-item';
            listItemElement.innerHTML = result.metadata.html_list;
            MiscEvent.addListener('mouseenter', this.focus.bind(this), listItemElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), listItemElement);
            const listLinkItemElement = listItemElement.querySelector('a');
            if (listLinkItemElement) {
                MiscEvent.addListener('focus', this.focus.bind(this), listLinkItemElement);
                MiscEvent.addListener('blur', this.blur.bind(this), listLinkItemElement);
            }
            if (containerElement.querySelector('.ds44-js-results-card')) {
                MiscEvent.addListener('click', this.fillCard.bind(this), listItemElement);
            }
            listElement.appendChild(listItemElement);

            if (!firstResultElement) {
                firstResultElement = listItemElement;
            }
        }

        // Add pager
        let pagerElement = listContainerElement.querySelector('.ds44-js-search-pager');
        if (
            pagerElement &&
            (
                !evt.detail.addUp ||
                nbDisplayedResults >= evt.detail.nbResults
            )
        ) {
            pagerElement.remove();
            pagerElement = null;
        }

        if (nbDisplayedResults < evt.detail.nbResults) {
            if(!pagerElement) {
                pagerElement = document.createElement('div');
                pagerElement.className = 'txtcenter center ds44--xl-padding-b ds44-js-search-pager';
                listContainerElement.appendChild(pagerElement);
                let pagerTitleElement = document.createElement('p');
                pagerTitleElement.setAttribute('id', 'idNbResults');
                pagerElement.appendChild(pagerTitleElement);
                let pagerButtonElement = document.createElement('button');
                pagerButtonElement.className = 'ds44-btnStd ds44-btn--invert ds44-js-search-button';
                pagerButtonElement.setAttribute('aria-describedby', 'idNbResults');
                pagerButtonElement.innerHTML = '<span class="ds44-btnInnerText">' + MiscTranslate._('MORE_RESULTS') + '</span><i class="icon icon-plus" aria-hidden="true"></i>';
                pagerElement.appendChild(pagerButtonElement);
            }

            let pagerTitleElement = pagerElement.querySelector('p');
            pagerTitleElement.innerText = nbDisplayedResults + MiscTranslate._('SEARCH_NB_RESULTS_OUT_OF') + evt.detail.nbResults;

            let pagerButtonElement = pagerElement.querySelector('button');
            pagerButtonElement.setAttribute('title', MiscTranslate._('MORE_SEARCH_RESULTS') + evt.detail.searchText);
        }

        this.showList();

        if (firstResultElement) {
            MiscEvent.dispatch('loader:setFocus', {'focusedElement': firstResultElement.querySelector('a')});
            MiscAccessibility.setFocus(firstResultElement.querySelector('a'));
        }
    }

    focus (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        const markerElement = document.querySelector('#search-marker-' + id);
        if (markerElement) {
            markerElement.classList.add('active');
        }
    }

    blur (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        const markerElement = document.querySelector('#search-marker-' + id);
        if (markerElement) {
            markerElement.classList.remove('active');
        }
    }
}

// Singleton
new ResultStandard();
