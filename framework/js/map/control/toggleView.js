class MapControlToggleView {
    onAdd (map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this.container.innerHTML = `<button type="button" title="Masquer la carte" aria-label="Masquer la carte" class="mapboxgl-ctrl-toggle-view ds44-btnStd ds44-btn--invert">
            <span class="ds44-btnInnerText">Masquer la carte</span><i class="icon icon-map" aria-hidden="true"></i>
        </button>`;
        return this.container;
    }

    onRemove () {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}
