class MiscEvent {
    static dispatch(type, data, target = document) {
        target.dispatchEvent(new CustomEvent(type, (data ? {'detail': data} : null)));
    }

    static addListener(type, callback, target = document) {
        target.addEventListener(type, callback, false);
    }

    static removeListener(type, callback, target = document) {
        target.removeEventListener(type, callback, false);
    }
}
