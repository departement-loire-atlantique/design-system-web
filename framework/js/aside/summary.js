class AsideSummary {
    constructor () {
        this.containerElement = document.querySelector('.ds44-js-aside-summary');
        if (!this.containerElement) {
            return;
        }
        this.summaryElement = this.containerElement.querySelector('.ds44-box');
        if (!this.summaryElement) {
            return;
        }

        this.menu = null;
        this.borderTop = 20;
        this.isMoving = false;
        this.maximumTop = null;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';

        this.resize();
        this.calculateChapter();

        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('resize', this.resize.bind(this), window);
        MiscEvent.addListener('load', this.resize.bind(this), window);
        window.setTimeout(this.resize.bind(this), 1000);

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

    scroll () {
        let calculateChapter = false;
        const scrollTop = this.getScrollTop();
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
            calculateChapter = true;
        } else if (this.isMoving) {
            this.isMoving = false;

            this.summaryElement.style.top = null;
            this.summaryElement.style.position = 'static';
            this.summaryElement.style.width = null;
            calculateChapter = true;
        }

        if (calculateChapter) {
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
                aElement.removeAttribute('aria-location');
                if (!activeAElement) {
                    activeAElement = aElement
                }

                const sectionId = aElement.getAttribute('href').replace(/^#/, '');
                const sectionElement = document.querySelector('#' + sectionId);
                if (sectionElement) {
                    const sectionElementStyle = sectionElement.currentStyle || window.getComputedStyle(sectionElement);
                    const startTop = MiscUtils.getPositionY(sectionElement) + parseInt(sectionElementStyle.marginTop, 10);
                    const stopTop = startTop + sectionElement.offsetHeight + parseInt(sectionElementStyle.marginBottom, 10);
                    if (cursorPosition >= startTop) {
                        activeAElement = aElement
                    }
                }
            });
        if (activeAElement) {
            activeAElement.classList.add('active');
            activeAElement.setAttribute('aria-location', 'true');
        }
    }

    resize () {
        if (this.isMoving) {
            this.summaryElement.style.width = this.containerElement.offsetWidth + 'px';
        }
        this.maximumTop = MiscUtils.getPositionY(this.containerElement) + this.containerElement.offsetHeight - this.summaryElement.offsetHeight;

        this.scroll();
    }

    getScrollTop () {
        return (document.documentElement.scrollTop || document.body.scrollTop);
    }

    getCursorPosition () {
        if (this.scrollDirection === 'up') {
            return this.getScrollTop();
        }

        return this.getScrollTop() + window.screen.height;
    }

    getTop () {
        if (this.getScrollTop() > this.getMaximumTop()) {
            return this.containerElement.offsetHeight - this.summaryElement.offsetHeight;
        }

        return Math.min(this.getMaximumTop(), this.borderTop + MiscDom.getHeaderHeight());
    }

    getMaximumTop () {
        return this.maximumTop - (this.borderTop + MiscDom.getHeaderHeight());
    }

    goTo (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.hideMenu();

        const aElement = evt.currentTarget;
        const sectionId = aElement.getAttribute('href').replace(/^#/, '');
        const sectionElement = document.querySelector('#' + sectionId);
        if (sectionElement) {
            const scrollTo = MiscUtils.getPositionY(sectionElement);
            if (this.getScrollTop() > scrollTo) {
                // Going up, the header will show
                MiscUtils.scrollTo(scrollTo - MiscDom.getHeaderHeight(true));
            } else {
                // Going up, the header will hide
                MiscUtils.scrollTo(scrollTo);
            }

            const titleElement = sectionElement.querySelector('h2');
            if (titleElement) {
                MiscAccessibility.setFocus(titleElement);
            }
        }
    }

    showMenu () {
        this.menu = document.querySelector('#summaryMenu');
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
new AsideSummary();
