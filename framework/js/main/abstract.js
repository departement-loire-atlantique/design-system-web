class Main {
    constructor() {
        MiscEvent.addListener('overlay:show', this.show.bind(this));
        MiscEvent.addListener('overlay:hide', this.hide.bind(this));
        MiscEvent.addListener('menu:show', this.show.bind(this));
        MiscEvent.addListener('menu:hide', this.hide.bind(this));
    }

    show() {
        MiscEvent.dispatch('accessibility:hide', {'element': document.querySelector('main')});
    }

    hide() {
        MiscEvent.dispatch('accessibility:show', {'element': document.querySelector('main')});
    }
}

// Singleton
new Main();
