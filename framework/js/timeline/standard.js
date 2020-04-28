class TimelineStandard {
    constructor () {
        MiscEvent.addListener('load', this.start.bind(this), window);
    }

    start () {
        if (document.querySelector('[data-aos]')) {
            AOS.init();
        }
    }
}

// Singleton
new TimelineStandard();
