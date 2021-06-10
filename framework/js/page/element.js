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
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    MiscUtils.scrollTo(link.getAttribute('href'));
                });
            });

        MiscEvent.addListener('overlay:show', this.hide.bind(this));
        MiscEvent.addListener('overlay:hide', this.show.bind(this));
        MiscEvent.addListener('menu:show', this.hide.bind(this));
        MiscEvent.addListener('menu:hide', this.show.bind(this));
        MiscEvent.addListener('loader:show', this.hide.bind(this));
        MiscEvent.addListener('loader:hide', this.show.bind(this));
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
}

// Singleton
new PageElement();
