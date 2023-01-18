class ResultStandardClass {
    constructor () {
        Debug.log("ResultStandard -> Constructor");
        this.currentId = null;
        this.savedScrollTop = null;
        this.hasSearched = false;
        this.results = {};

        MiscEvent.addListener('search:update', this.fillList.bind(this));
        MiscEvent.addListener('search:focus', this.resultFocus.bind(this));
        MiscEvent.addListener('search:blur', this.resultBlur.bind(this));
        MiscEvent.addListener('search:select', this.resultSelect.bind(this));

    }

    initialise() {
        Debug.log("ResultStandard -> Initialise");
        const listContainerElement = document.querySelector('.ds44-results .ds44-js-results-container .ds44-js-results-list');
        if (listContainerElement && MiscComponent.checkAndCreate(listContainerElement, "result")) {
            MiscEvent.addListener('click', this.showMore.bind(this), listContainerElement);
            window.setTimeout(this.initialize.bind(this), 1000);
        }
    }

    initialize () {
        if (!this.hasSearched) {
            // Show initial message
            let newSearchElement = document.querySelector('#ds44-results-new-search');
            if (newSearchElement) {
                newSearchElement.style.display = 'block';
            }
        }
    }

    fillCard (evt) {

        let viewCard = true;
        if(evt.target.tagName === "A" && evt.target.getAttribute("href") && evt.target.closest(".ds44-card") && !evt.target.classList.contains("ds44-card__globalLink"))
        {
            viewCard = false;
        }
        if(viewCard)
        {
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

            this.currentId = evt.currentTarget.getAttribute('data-id');
            var sendRequest = true;
            var currentResult = null;
            if (this.results.hasOwnProperty(this.currentId)) {
                currentResult = this.results[this.currentId];
                if(currentResult.metadata.url === undefined && currentResult.metadata.content_html) {
                    sendRequest = false;
                }
            }

            MiscEvent.dispatch('loader:requestShow', {"currentResult": currentResult});
            if(sendRequest) {
                const url = cardContainerElement.getAttribute('data-url');
                MiscRequest.send(
                  url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(this.currentId),
                  this.fillCardSuccess.bind(this),
                  this.fillCardError.bind(this)
                );
            }
            else if(currentResult && currentResult.metadata.url === undefined && currentResult.metadata.content_html) {
                this.fillCardSuccess({"content_html": currentResult.metadata.content_html});
            }
        }
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

    redirectCard (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const listItemElement = evt.currentTarget;
        const aElement = listItemElement.querySelector('a');
        if (!aElement) {
            return;
        }

        let url = (
            listItemElement.getAttribute('data-redirect-url') ||
            aElement.getAttribute('href')
        );
        if (!url) {
            return;
        }

        const isInNewTab = (
            listItemElement.getAttribute('data-redirect-target') === '_blank' ||
            aElement.getAttribute('target') === '_blank'
        );

        // url += (url.indexOf('?') !== -1 ? '&' : '?') + 'previousPage=' + encodeURIComponent(window.location.href);
        if (isInNewTab === true) {
            window.open(url);
            return;
        }

        document.location.href = url;
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

        const listContainerElement = containerElement.querySelector('.ds44-js-results-list');
        let titleElement = listContainerElement.querySelector('.h3-like');
        if(titleElement.getAttribute("role") === "heading" && titleElement.getAttribute("aria-level") === "2")
        {
            [].forEach.call(containerElement.querySelectorAll(".ds44-js-results-item [aria-level]"), (el) => {
                let currentLevel = parseInt(el.getAttribute("aria-level"))
                el.setAttribute("aria-level", currentLevel+1);
            });
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
            MiscEvent.dispatch('loader:requestShowList', {"currentId": this.currentId});
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
        if(evt.detail === undefined || evt.detail == null) {
            return;
        }

        this.hasSearched = true;

        // Nb display results
        const nbDisplayedResults = evt.detail.pageIndex * evt.detail.nbResultsPerPage;

        // Show hide empty results
        const parentElement = document.querySelector('.ds44-results');
        if (nbDisplayedResults > 0) {
            parentElement.classList.remove('ds44-results--empty');
        } else {
            parentElement.classList.add('ds44-results--empty');
        }

        // Remove initial message
        let newSearchElement = listContainerElement.querySelector('#ds44-results-new-search');
        if (newSearchElement) {
            newSearchElement.remove();
        }

        // Manage legend
        let legendElement = listContainerElement.querySelector('.ds44-textLegend');
        if (
            legendElement &&
            evt.detail.nbResults <= evt.detail.maxNbResults
        ) {
            legendElement.remove();
        } else if (
            !legendElement &&
            evt.detail.nbResults > evt.detail.maxNbResults
        ) {
            legendElement = document.createElement('p');
            legendElement.className = 'ds44-textLegend mbs';
            legendElement.innerText = MiscTranslate._('RESULTS_MAX_RESULTS', { maxNbResults: evt.detail.maxNbResults });
            listContainerElement.appendChild(legendElement);
        }

        // Manage title
        let focusElement = null;
        let titleElement = listContainerElement.querySelector('.h3-like');
        if (!titleElement) {
            titleElement = document.createElement('div');
            titleElement.className = 'h3-like mbs';
            titleElement.setAttribute('role', 'heading');
            titleElement.setAttribute('aria-level', '2');
            titleElement.setAttribute('aria-live', 'polite');
            titleElement.setAttribute('aria-atomic', 'true');
            listContainerElement.prepend(titleElement);
        }
        // Ne pas changer le titre de la page avec un paramètre précis
        let elemCancellingRename = document.querySelector('[data-keep-tab-name="true"]');


        let siteName = document.body.dataset.sitename !== undefined ? document.body.dataset.sitename : "Loire-atlantique.fr"
        // Sinon, changer le nom de page pour afficher le nb de résultats
        if (!evt.detail.nbResults) {
            let titleElementHtml = MiscTranslate._('NO_RESULTS_FOR_SEARCH:') + ' ' + evt.detail.searchText + '.<br>' + MiscTranslate._('NO_RESULTS_NEW_SEARCH') + '.';
            titleElement.innerHTML = titleElementHtml;
            if (!elemCancellingRename) {
                document.title = titleElementHtml + ' - '+siteName;
                titleElement.setAttribute('tabindex', '-1');
                focusElement = titleElement;
            }
        } else {
            let titleElementHtml = evt.detail.nbResults;
            if (evt.detail.nbResults > 1) {
                titleElementHtml += ' ' + MiscTranslate._('RESULTS');
            } else {
                titleElementHtml += ' ' + MiscTranslate._('RESULT');
            }
            let accessibleSentence = MiscTranslate._('NB_RESULTS_FOR_SEARCH:') + ' ' + (evt.detail.searchText === '' ? MiscTranslate._('EMPTY_SEARCH_CRITERIA') : evt.detail.searchText);
            titleElement.innerHTML = titleElementHtml + ' <p class="visually-hidden" tabindex="-1">&nbsp;' + accessibleSentence + '</p>';
            if (!elemCancellingRename) {
                document.title = titleElementHtml + ' ' + accessibleSentence + ' - '+siteName;
                titleElement.removeAttribute('tabindex');
                focusElement = titleElement.querySelector('.visually-hidden');
            }
        }

        if(evt.detail.nbResultHtml !== undefined && evt.detail.nbResultHtml)
        {
            let htmlResult = listContainerElement.querySelector('.ds44-js-html-result');
            if (!htmlResult) {
                htmlResult = document.createElement('div');
                htmlResult.className = 'ds44-js-html-result';
                listContainerElement.appendChild(htmlResult);
            }
            htmlResult.innerHTML = evt.detail.nbResultHtml;
            titleElement.classList.add("hidden");
        }
        else if(titleElement.classList.contains("hidden")) {
            titleElement.classList.remove("hidden");
        }
        

        // Remove existing results
        let listElement = listContainerElement.querySelector('.ds44-list');
        if (listElement && !evt.detail.addUp) {
            listElement.remove();
            listElement = null;

            MiscEvent.dispatch('result:destroyed');
        }
        if (!listElement) {
            listElement = document.createElement('ul');
            listElement.className = 'ds44-list ds44-list--results ds44-flex-container';
            listContainerElement.appendChild(listElement);
        }

        // Add new results
        let isFirstResult = true;
        const results = (evt.detail.addUp ? evt.detail.newResults : evt.detail.results);

        this.results = {};
        this.resultsBySNMs = {};
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

            let hasRedirectDisplayMode = false;
            const listItemElement = document.createElement('li');
            listItemElement.setAttribute('id', 'search-result-' + result.id);
            listItemElement.setAttribute('data-id', result.id);

            this.results[result.id] = result;
            if(result.snm !== undefined) {
                if(this.resultsBySNMs[result.snm] === undefined) {
                    this.resultsBySNMs[result.snm] = [];
                }
                this.resultsBySNMs[result.snm].push(listItemElement);
            }
            let elementClickEnabled = true;
            if (result.metadata.click !== undefined && result.metadata.click === false) {
                elementClickEnabled = false;
            }
            if (
              result.redirectUrl === true &&
              result.metadata.url
            ) {
                hasRedirectDisplayMode = true;
                listItemElement.setAttribute('data-redirect-url', result.metadata.url);
                if (result.target) {
                    listItemElement.setAttribute('data-redirect-target', result.target);
                }
            }


            listItemElement.className = 'ds44-fg1 ds44-js-results-item';
            listItemElement.innerHTML = result.metadata.html_list;
            MiscEvent.addListener('mouseenter', this.focus.bind(this), listItemElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), listItemElement);
            const listLinkItemElement = listItemElement.querySelector('a');
            if (listLinkItemElement) {
                MiscEvent.addListener('focus', this.focus.bind(this), listLinkItemElement);
                MiscEvent.addListener('blur', this.blur.bind(this), listLinkItemElement);
            }

            let multiLink = false;
            if(listContainerElement.hasAttribute('data-multi-links'))
            {
                multiLink = listContainerElement.getAttribute('data-multi-links');
            }
            if (elementClickEnabled && !multiLink) {
                if (
                  hasRedirectDisplayMode === false &&
                  listContainerElement.getAttribute('data-display-mode') === 'inline'
                ) {
                    if (listItemElement.getAttribute('data-id') != '-1') {
                        MiscEvent.addListener('click', this.fillCard.bind(this), listItemElement);
                    }
                    const aElement = listItemElement.querySelector('a');
                    if (aElement) {
                        aElement.setAttribute('role', 'button');
                        aElement.setAttribute('tabindex', '0');
                    }
                } else {
                    MiscEvent.addListener('click', this.redirectCard.bind(this), listItemElement);
                }
            }
            listElement.appendChild(listItemElement);

            if (evt.detail.addUp && isFirstResult) {
                isFirstResult = false;

                focusElement = listItemElement.querySelector('a');
                if (!focusElement) {
                    listItemElement.setAttribute('tabindex', '0');
                    focusElement = listItemElement;
                }
            }
        }
        ButtonSelect.getInstance().initialise();

        if(this.resultsBySNMs) {
            for (const [key, resultsBySNM] of Object.entries(this.resultsBySNMs)) {
                if(resultsBySNM.length > 1) {
                    for (let currentSNM in resultsBySNM) {
                        let element = resultsBySNM[currentSNM];
                        if(currentSNM === 0) {
                            element.classList.add("first");
                        }
                        else if(currentSNM >= (resultsBySNM.length-1)) {
                            element.classList.add("last");
                        }
                        else {
                            element.classList.add("middle");
                        }
                    }
                }
            }
        }

        // Add pager
        let pagerElement = listContainerElement.querySelector('.ds44-js-search-pager');
        if (
            pagerElement &&
            (
                !evt.detail.addUp ||
                evt.detail.maxNbResults ||
                nbDisplayedResults >= evt.detail.nbResults
            )
        ) {
            pagerElement.remove();
            pagerElement = null;
        }

        if (
            !evt.detail.maxNbResults &&
            nbDisplayedResults < evt.detail.nbResults
        ) {
            if (!pagerElement) {
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
            pagerTitleElement.innerText = nbDisplayedResults + ' ' + MiscTranslate._('SEARCH_NB_RESULTS_OUT_OF') + ' ' + evt.detail.nbResults;

            let pagerButtonElement = pagerElement.querySelector('button');
            pagerButtonElement.setAttribute('title', MiscTranslate._('MORE_SEARCH_RESULTS:') + evt.detail.searchText);
        }

        this.showList();

        if (focusElement) {
            MiscEvent.dispatch('loader:setFocus', { 'focusedElement': focusElement });
            MiscAccessibility.setFocus(focusElement);
        }

        MiscEvent.dispatch('result:created');
    }

    focus (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        MiscEvent.dispatch('search:focus', { 'id': id });
    }

    blur (evt = null) {
        const id = (this.currentId || (evt && evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id')));
        if (!id) {
            return;
        }

        MiscEvent.dispatch('search:blur', { 'id': id });
    }

    resultFocus (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id + ' .ds44-card');
        if (resultElement) {
            resultElement.classList.add('active');
        }
    }

    resultBlur (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id + ' .ds44-card');
        if (resultElement) {
            resultElement.classList.remove('active');
        }
    }

    resultSelect (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        const resultElement = document.querySelector('#search-result-' + evt.detail.id);
        if (resultElement) {
            MiscEvent.dispatch('click', null, resultElement);
        }
    }
}
// Singleton
var ResultStandard = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ResultStandardClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ResultStandard();
