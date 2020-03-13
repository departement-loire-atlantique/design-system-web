class MapControlToggleView {
    onAdd(map) {
        this.map = map;
        this.container = document.createElement('button');
        this.container.className = 'ds44-btnStd ds44-btn--invert ds44-mt1 ds44-mr1';
        this.container.innerHTML = '<span class="ds44-btnInnerText">Button inverted</span><i class="icon icon-long-arrow-right" aria-hidden="true"></i>';
        return this.container;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}
