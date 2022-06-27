class AsideSummaryClass {
    constructor () {
        Debug.log("AsideSummary -> Constructor");
        this.menu = null;
        this.borderTop = 20;
        this.isMoving = false;
        this.isGoingTo = false;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.eventWindowListenerInit = false;
    }

    initialise()
    {
        this.containerElement = document.querySelector('.ds44-js-aside-summary');
        if (!this.containerElement) {
            return;
        }
        this.summaryElement = this.containerElement.querySelector('.ds44-box');
        if (!this.summaryElement) {
            return;
        }
        Debug.log("AsideSummary -> Initialise");

        if(MiscComponent.checkAndCreate(this.containerElement, "aside-summary") &&
          MiscComponent.checkAndCreate(this.summaryElement, "aside-summary")) {
            this.menu = document.querySelector('#summaryMenu');
            MiscAccessibility.hide(this.menu);

            const aElements = new Set([
                ...this.summaryElement.querySelectorAll('.ds44-list--puces a'),
                ...document.querySelectorAll('#summaryMenu .ds44-list--puces a')
            ]);
            aElements
              .forEach((aElement) => {
                  MiscEvent.addListener('click', this.goTo.bind(this), aElement);
              });
            const showModalButtonElement = document.querySelector('#ds44-summary-button');
            if (showModalButtonElement) {
                MiscEvent.addListener('click', this.showMenu.bind(this), showModalButtonElement);
            }
            const hideModalButtonElement = document.querySelector('#summaryMenu .ds44-btnOverlay--closeOverlay');
            if (hideModalButtonElement) {
                MiscEvent.addListener('click', this.hideMenu.bind(this), hideModalButtonElement);
            }
        }

        if(!this.eventWindowListenerInit)
        {
            this.eventWindowListenerInit = true;
            this.resize();
            MiscEvent.addListener('scroll', this.scroll.bind(this), window);
            MiscEvent.addListener('resize', this.resize.bind(this), window);
            MiscEvent.addListener('load', this.resize.bind(this), window);
            MiscEvent.addListener('keyUp:escape', this.hideMenu.bind(this));
            window.setTimeout(this.resize.bind(this), 1000);
        }
    }

    scroll () {
        const scrollTop = MiscUtils.getScrollTop();
        const top = this.getTop();

        if (this.lastScrollTop > scrollTop) {
            this.scrollDirection = 'up';
        } else {
            this.scrollDirection = 'down';
        }
        this.lastScrollTop = scrollTop;

        if (scrollTop > MiscUtils.getPositionY(this.containerElement) - top) {
            if (!this.isMoving) {
                this.summaryElement.style.width = this.containerElement.offsetWidth + 'px';
                this.isMoving = true;
            }

            if (scrollTop > this.getMaximumTop()) {
                this.summaryElement.style.position = 'absolute';
            } else {
                this.summaryElement.style.position = 'fixed';
            }

            this.summaryElement.style.top = top + 'px';
        } else if (this.isMoving) {
            this.isMoving = false;

            this.summaryElement.style.top = null;
            this.summaryElement.style.position = 'static';
            this.summaryElement.style.width = null;
        }

        if (!this.isGoingTo) {
            this.calculateChapter();
        }
    }

    calculateChapter () {
        // Highlight sections
        let activeAElement = null;
        const cursorPosition = this.getCursorPosition();
        this.summaryElement
            .querySelectorAll('.ds44-list--puces a')
            .forEach((aElement) => {
                aElement.classList.remove('active');
                aElement.removeAttribute('aria-current');
                aElement.removeAttribute('tabindex');
                if (!activeAElement) {
                    activeAElement = aElement
                }

                const sectionId = aElement.getAttribute('href').replace(/^#/, '');
                const sectionElement = document.querySelector('#' + sectionId);
                if (sectionElement) {
                    const sectionElementStyle = sectionElement.currentStyle || window.getComputedStyle(sectionElement);
                    const startTop = MiscUtils.getPositionY(sectionElement) + parseInt(sectionElementStyle.marginTop, 10);
                    if (cursorPosition >= startTop) {
                        activeAElement = aElement
                    }
                }
            });
        if (activeAElement) {
            activeAElement.classList.add('active');
            activeAElement.setAttribute('aria-current', 'true');
            activeAElement.setAttribute('tabindex', '-1');
        }
    }

    resize () {
        if (this.isMoving) {
            this.summaryElement.style.width = this.containerElement.offsetWidth + 'px';
        }

        this.scroll();
    }

    getCursorPosition () {
        if (this.scrollDirection === 'up') {
            return MiscUtils.getScrollTop() + MiscDom.getHeaderHeight(true);
        }

        return MiscUtils.getScrollTop() + (window.innerHeight || document.documentElement.clientHeight);
    }

    getTop () {
        if (MiscUtils.getScrollTop() > this.getMaximumTop()) {
            return this.containerElement.offsetHeight - this.summaryElement.offsetHeight;
        }

        return Math.min(this.getMaximumTop(), this.borderTop + MiscDom.getHeaderHeight());
    }

    getMaximumTop () {
        return (MiscUtils.getPositionY(this.containerElement) + this.containerElement.offsetHeight - this.summaryElement.offsetHeight) - (this.borderTop + MiscDom.getHeaderHeight());
    }

    goTo (evt) {
        this.isGoingTo = true;

        evt.stopPropagation();
        evt.preventDefault();

        this.hideMenu();

        // Deselect all bullets
        this.summaryElement
            .querySelectorAll('.ds44-list--puces a')
            .forEach((aElement) => {
                aElement.classList.remove('active');
                aElement.removeAttribute('aria-current');
                aElement.removeAttribute('tabindex');
            });

        // Select active bullets
        const aElement = evt.currentTarget;
        aElement.classList.add('active');
        aElement.setAttribute('aria-current', 'true');
        aElement.setAttribute('tabindex', '-1');

        const sectionId = aElement.getAttribute('href').replace(/^#/, '');
        const sectionElement = document.querySelector('#' + sectionId);
        if (sectionElement) {
            const scrollTo = MiscUtils.getPositionY(sectionElement);
            if (MiscUtils.getScrollTop() > scrollTo) {
                // Going up, the header will show
                MiscUtils.scrollTo(
                    scrollTo - MiscDom.getHeaderHeight(true),
                    400,
                    'linear',
                    this.afterGoTo.bind(this)
                );
            } else {
                // Going up, the header will hide
                MiscUtils.scrollTo(
                    scrollTo,
                    400,
                    'linear',
                    this.afterGoTo.bind(this)
                );
            }

            const titleElement = sectionElement.querySelector('h2');
            if (titleElement) {
                if(titleElement.getAttribute('tabindex') === undefined || !titleElement.getAttribute('tabindex')) {
                    titleElement.setAttribute('tabindex', 1);
                }
                MiscAccessibility.setFocus(titleElement);
            }
        }
    }

    afterGoTo () {
        window.setTimeout(
            () => {
                this.isGoingTo = false;
            },
            100
        );
    }

    showMenu () {

        if (!this.menu) {
            return;
        }

        // Get corresponding close button
        const closeButton = this.menu.querySelector('.ds44-btnOverlay--closeOverlay');
        if (!closeButton) {
            return;
        }

        document.body.style.overflow = 'hidden';
        MiscEvent.dispatch('resize', null, window);
        this.menu.classList.add('show');
        MiscAccessibility.show(this.menu);
        MiscAccessibility.setFocus(closeButton);
        MiscAccessibility.addFocusLoop(this.menu);

        MiscEvent.dispatch('menu:show', { 'element': this.menu });
    }

    hideMenu (evt) {
        if (!this.menu) {
            return;
        }

        const showModalButtonElement = document.querySelector('#ds44-summary-button');
        if (!showModalButtonElement) {
            return;
        }

        MiscAccessibility.removeFocusLoop();
        document.body.style.overflow = null;
        MiscEvent.dispatch('resize', null, window);
        this.menu.classList.remove('show');
        MiscAccessibility.hide(this.menu);

        if (evt) {
            // Focus on button only if close button clicked
            MiscAccessibility.setFocus(showModalButtonElement);
        }

        MiscEvent.dispatch('menu:hide');
    }
}
// Singleton
var AsideSummary = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new AsideSummaryClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new AsideSummary();

