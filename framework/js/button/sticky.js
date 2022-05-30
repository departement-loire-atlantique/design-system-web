class ButtonSticky {
    constructor () {
        this.buttons = [];
        this.isInitialized = false;
        document
            .querySelectorAll('.ds44-js-button-sticky')
            .forEach((buttonElement) => {
                if(MiscComponent.checkAndCreate(buttonElement, "button-sticky")) {
                    this.buttons.push({
                        'element': buttonElement,
                        'isDelayed': (buttonElement.getAttribute('data-is-delayed') === 'true'),
                        'isMoving': false
                    });
                }
            });
        if (this.buttons.length === 0) {
            return;
        }

        this.footerElement = document.querySelector('footer');
        if (!this.footerElement) {
            return;
        }

        if(!this.isInitialized)
        {
            this.isInitialized = true;
            this.scroll();

            MiscEvent.addListener('scroll', this.scroll.bind(this), window);
            MiscEvent.addListener('resize', this.scroll.bind(this), window);
            MiscEvent.addListener('load', this.scroll.bind(this), window);
            window.setTimeout(this.scroll.bind(this), 1000);
        }
    }

    scroll () {
        const minimumTop = (window.innerHeight / 2);
        const maximumTop = document.body.offsetHeight - window.innerHeight - this.footerElement.offsetHeight;
        const scrollTop = MiscUtils.getScrollTop();
        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];

            if (scrollTop > maximumTop) {
                button.isMoving = true;
                button.element.style.bottom = -(maximumTop - scrollTop) + 'px';
            } else if (
                button.isDelayed &&
                scrollTop < minimumTop
            ) {
                button.isMoving = true;
                button.element.style.bottom = -(minimumTop - scrollTop) + 'px';
            } else if (button.isMoving) {
                button.isMoving = false;
                button.element.style.bottom = '0px';
            }
        }
    }
}

// Singleton
new ButtonSticky();
