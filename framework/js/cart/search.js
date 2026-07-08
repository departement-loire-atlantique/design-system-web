class CartSearchClass {
    constructor () {
        this.manageListener = this.manage.bind(this);

        MiscEvent.addListener('result:destroyed', this.unload.bind(this));
        MiscEvent.addListener('result:created', this.load.bind(this));

        this.refreshTotal();
    }

    unload (evt) {
        document
            .querySelectorAll('.ds44-card .ds44-cardSelect[data-initialized]')
            .forEach((cardSelectElement) => {
                MiscEvent.removeListener('click', this.manageListener, cardSelectElement);
            });
    }

    load (evt) {
        const bookmarks = this.getBookmarks();
        document
            .querySelectorAll('.ds44-card .ds44-cardSelect:not([data-initialized])')
            .forEach((cardSelectElement) => {
                MiscEvent.addListener('click', this.manageListener, cardSelectElement);
                cardSelectElement.setAttribute('data-initialized', 'true');

                const resultItemElement = cardSelectElement.closest('.ds44-js-results-item');
                if(resultItemElement) {
                    const resultItemId = resultItemElement.getAttribute('data-id');
                    if (bookmarks.indexOf(resultItemId) !== -1) {
                        const buttonElement = cardSelectElement.querySelector('button .icon');
                        if (buttonElement) {
                            buttonElement.classList.add('icon-star-full');
                            buttonElement.classList.remove('icon-star-empty');
                        }
                    }
                }

            });

        this.refreshTotal();
    }

    manage (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        let isSelected = false;
        const buttonElement = evt.currentTarget.querySelector('button .icon');
        if (buttonElement.classList.contains('icon-star-empty')) {
            buttonElement.classList.add('icon-star-full');
            buttonElement.classList.remove('icon-star-empty');
            isSelected = true;
        } else {
            buttonElement.classList.add('icon-star-empty');
            buttonElement.classList.remove('icon-star-full');
        }

        const resultItemId = evt.currentTarget.closest('.ds44-js-results-item').getAttribute('data-id');
        const bookmarks = this.getBookmarks();
        if (isSelected) {
            if (bookmarks.indexOf(resultItemId) === -1) {
                bookmarks.push(resultItemId)
            }
        } else {
            if (bookmarks.indexOf(resultItemId) !== -1) {
                bookmarks.splice(bookmarks.indexOf(resultItemId), 1)
            }
        }
        this.setBookmarks(bookmarks);

        this.refreshTotal();
    }

    getBookmarks () {
        const bookmarkName = this.getBookmarksName();
        let bookmarks = window.sessionStorage.getItem(bookmarkName);
        if (!bookmarks) {
            bookmarks = [];
        } else {
            bookmarks = JSON.parse(bookmarks);
        }
        return bookmarks;
    }

    setBookmarks (bookmarks) {
        const bookmarkName = this.getBookmarksName();
        window.sessionStorage.setItem(bookmarkName, JSON.stringify(bookmarks));
    }

    getBookmarksName () {
        const urlParameters = MiscUrl.getUrlParameters();
        return 'bookmarks_' + urlParameters.pop();
    }

    refreshTotal () {
        const buttonElement = document.querySelector('#bookmarks-search');
        if (!buttonElement) {
            return;
        }

        const bookmarks = this.getBookmarks();
        buttonElement.innerHTML = buttonElement.innerHTML.replace(/ ?\([0-9]+\)/, '') + ' (' + bookmarks.length + ')';
    }
}
// Singleton
var CartSearch = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new CartSearchClass();
        }
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new CartSearch();
