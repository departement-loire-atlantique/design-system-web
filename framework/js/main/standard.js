class MainStandard {
    constructor () {
        MiscEvent.addListener('overlay:show', this.show.bind(this));
        MiscEvent.addListener('overlay:hide', this.hide.bind(this));
        MiscEvent.addListener('menu:show', this.show.bind(this));
        MiscEvent.addListener('menu:hide', this.hide.bind(this));
        MiscEvent.addListener('loader:show', this.show.bind(this));
        MiscEvent.addListener('loader:hide', this.hide.bind(this));
    }

    show () {
        MiscAccessibility.hide(document.querySelector('main'));
    }

    hide () {
        MiscAccessibility.show(document.querySelector('main'));
    }
}

// Singleton
new MainStandard();
