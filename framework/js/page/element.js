class PageElement {
    constructor () {
        this.visibilityCounter = 0;
        this.objects = []

        document
            .querySelectorAll('footer, main')
            .forEach((pageElement) => {
                this.create(pageElement);
            });
        
        document
            .querySelectorAll('a[href^="#"]')
            .forEach((link) => {
                link.addEventListener("click", this.scrollToHyperlink);
            });

    }

    create (pageElement) {
        const object = {
            'id': MiscUtils.generateId(),
            'element': pageElement
        };
        this.objects.push(object);
    }

    show () {
        this.visibilityCounter = Math.min(0, (this.visibilityCounter + 1));
        console.log(this.visibilityCounter);
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.show(this.objects[objectIndex].element, true, false);
            }
        }
    }

    hide () {
        if (this.visibilityCounter === 0) {
            for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
                MiscAccessibility.hide(this.objects[objectIndex].element, true, false);
            }
        }
        this.visibilityCounter--;
    }
        
    scrollToHyperlink(event) {
        event.preventDefault();
        const scrollTo = MiscUtils.getPositionY(document.getElementById(event.target.getAttribute('href').replace('#', '')));
        if (MiscUtils.getScrollTop() > scrollTo) {
            // Going up, the header will show
            MiscUtils.scrollTo(
                scrollTo - MiscDom.getHeaderHeight(true),
                400,
                'linear'
            );
        } else {
            // Going down, the header will hide
            MiscUtils.scrollTo(
                scrollTo,
                400,
                'linear'
            );
        }
    }
}

// Singleton
new PageElement();
