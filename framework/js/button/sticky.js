class ButtonStickyClass {

    constructor () {
        Debug.log("ButtonSticky -> Constructor");
        this.buttons = [];

        MiscEvent.addListener('scroll', this.scroll.bind(this), window);
        MiscEvent.addListener('resize', this.scroll.bind(this), window);
        MiscEvent.addListener('load', this.scroll.bind(this), window);
        window.setTimeout(this.scroll.bind(this), 1000);
    }

    initialise () {
        Debug.log("ButtonSticky -> Initialise");
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

        this.footerElement = document.querySelector('footer');
        this.scrollToInit = true;
        this.scroll(true);
        this.scrollToInit = false;
    }

    clearObject() {
        Debug.log("ButtonSticky -> Clear object");
        this.buttons = [];
    }

    scroll (isInitScroll = false) {
        if (this.buttons.length === 0 && this.footerElement && ((this.scrollToInit && isInitScroll) || !this.scrollToInit)) {
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
}
// Singleton
var ButtonSticky = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ButtonStickyClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ButtonSticky();
