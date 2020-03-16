class MapSearch extends MapAbstract {
    constructor () {
        super('.ds44-js-map');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.results = null;
        object.zoom = false;

        MiscEvent.addListener('search:update', this.search.bind(this, objectIndex));
    }

    afterLoad (objectIndex) {
        const object = this.objects[objectIndex];

        object.map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
        object.map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-left');
        object.map.addControl(new MapControlToggleView(), 'top-right');

        const mapToggleViewElement = document.querySelector('.mapboxgl-ctrl-toggle-view');
        if (mapToggleViewElement) {
            MiscEvent.addListener('click', this.toggleView.bind(this, objectIndex), mapToggleViewElement);
        }

        object.map.on('moveend', this.move.bind(this, objectIndex));
        if (object.results) {
            this.show(objectIndex);
        }
    }

    search (objectIndex, evt) {
        const object = this.objects[objectIndex];
        object.results = evt.detail.results;
        object.zoom = evt.detail.zoom;

        if (object.isMapReady) {
            this.show(objectIndex);
        }
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];

        // Remove existing markers
        for (let i = 0; i < object.markers.length; i++) {
            object.markers[i].remove();
        }
        object.markers = [];

        // Add new markers
        const lngLats = [];
        for (let resultIndex in object.results) {
            if (!object.results.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.results[resultIndex];
            if (
                !result.metadata ||
                !result.metadata.lat ||
                !result.metadata.long ||
                !result.metadata.html_marker
            ) {
                continue;
            }

            // Create a marker
            const lngLat = [
                result.metadata.long,
                result.metadata.lat
            ];
            const markerElement = document.createElement('div');
            markerElement.setAttribute('id', 'search-marker-' + result.id);
            markerElement.className = 'ds44-map-marker';
            MiscEvent.addListener('mouseenter', this.focus.bind(this), markerElement);
            MiscEvent.addListener('mouseleave', this.blur.bind(this), markerElement);
            object.markers.push(
                new window.mapboxgl
                    .Marker(markerElement)
                    .setLngLat(lngLat)
                    .setPopup(
                        new window.mapboxgl
                            .Popup({offset: 25})
                            .setHTML(result.metadata.html_marker)
                    )
                    .addTo(object.map)
            );
            lngLats.push([
                result.metadata.long,
                result.metadata.lat
            ]);
        }

        if (object.zoom) {
            // Zoom the map
            object.zoom = false;
            object.map.fitBounds(
                lngLats,
                {
                    'maxZoom': 10
                }
            );
        }
    }

    move (objectIndex, evt) {
        if (!evt.originalEvent) {
            return;
        }

        const object = this.objects[objectIndex];

        const mapBounds = object.map.getBounds();
        MiscEvent.dispatch(
            'search:refresh',
            {
                'parameters': {
                    'map': {
                        'nw': mapBounds.getNorthWest().toArray(),
                        'sw': mapBounds.getSouthWest().toArray(),
                        'ne': mapBounds.getNorthEast().toArray(),
                        'se': mapBounds.getSouthEast().toArray()
                    }
                }
            });
    }

    toggleView (objectIndex, evt) {
        const object = this.objects[objectIndex];

        const resultsElement = object.mapElement.closest('.ds44-results')
        if (resultsElement) {
            if (resultsElement.classList.contains('ds44-results--mapVisible')) {
                resultsElement.classList.remove('ds44-results--mapVisible')
            } else {
                resultsElement.classList.add('ds44-results--mapVisible')
            }
        }
    }

    focus (evt) {
        const resultId = evt.currentTarget.getAttribute('id').replace('search-marker-', 'search-result-');
        const resultElement = document.querySelector('#' + resultId);
        if(resultElement) {
            resultElement.classList.add('active');
        }
    }

    blur (evt) {
        const resultId = evt.currentTarget.getAttribute('id').replace('search-marker-', 'search-result-');
        const resultElement = document.querySelector('#' + resultId);
        if(resultElement) {
            resultElement.classList.remove('active');
        }
    }
}

// Singleton
new MapSearch();
