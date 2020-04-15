class MapSearch extends MapAbstract {
    constructor () {
        super('.ds44-js-map');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        object.newResults = null;
        object.zoom = false;
        object.addUp = false;
        object.isVisible = true;

        MiscEvent.addListener('search:update', this.search.bind(this, objectIndex));
        MiscEvent.addListener('resize', this.resize.bind(this, objectIndex), window);

        // Show results at startup for mobiles
        const breakpoint = window.matchMedia('(max-width: 767px)');
        if(breakpoint.matches) {
            const resultsElement = object.mapElement.closest('.ds44-results.ds44-results--mapVisible')
            if (resultsElement) {
                this.toggleView(objectIndex);
            }
        }
    }

    afterLoad (objectIndex) {
        const object = this.objects[objectIndex];

        object.map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
        object.map.addControl(new window.mapboxgl.FullscreenControl(), 'bottom-left');
        object.map.addControl(new window.MapboxLanguage({ defaultLanguage: 'fr' }));
        object.map.setLayoutProperty('country-label', 'text-field', ['get', 'name_fr']);

        MiscEvent.addListener('fullscreenchange', this.translateMap.bind(this, objectIndex));
        this.translateMap(objectIndex);

        const mapToggleViewElement = document.querySelector('.ds44-js-toggle-map-view');
        if (mapToggleViewElement) {
            MiscEvent.addListener('click', this.toggleView.bind(this, objectIndex), mapToggleViewElement);
        }

        object.map.on('moveend', this.move.bind(this, objectIndex));
        if (object.newResults) {
            this.show(objectIndex);
        }
    }

    translateMap (objectIndex) {
        const object = this.objects[objectIndex];

        const mapFullScreenElement = object.mapElement.querySelector('.mapboxgl-ctrl-fullscreen');
        if (mapFullScreenElement) {
            mapFullScreenElement.removeAttribute('aria-label');
            mapFullScreenElement.setAttribute('title', MiscTranslate._('MAP_FULLSCREEN'));

            let spanElement = mapFullScreenElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapFullScreenElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_FULLSCREEN');
        }

        const mapShrinkElement = object.mapElement.querySelector('.mapboxgl-ctrl-shrink');
        if (mapShrinkElement) {
            mapShrinkElement.removeAttribute('aria-label');
            mapShrinkElement.setAttribute('title', MiscTranslate._('MAP_SHRINK'));

            let spanElement = mapShrinkElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapShrinkElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_SHRINK');
        }

        const mapZoomInElement = object.mapElement.querySelector('.mapboxgl-ctrl-zoom-in');
        if (mapZoomInElement) {
            mapZoomInElement.removeAttribute('aria-label');
            mapZoomInElement.setAttribute('title', MiscTranslate._('MAP_ZOOM_IN'));

            let spanElement = mapZoomInElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapZoomInElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_ZOOM_IN');
        }

        const mapZoomOutElement = object.mapElement.querySelector('.mapboxgl-ctrl-zoom-out');
        if (mapZoomOutElement) {
            mapZoomOutElement.removeAttribute('aria-label');
            mapZoomOutElement.setAttribute('title', MiscTranslate._('MAP_ZOOM_OUT'));

            let spanElement = mapZoomOutElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapZoomOutElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_ZOOM_OUT');
        }

        const mapCompassElement = object.mapElement.querySelector('.mapboxgl-ctrl-compass');
        if (mapCompassElement) {
            mapCompassElement.removeAttribute('aria-label');
            mapCompassElement.setAttribute('title', MiscTranslate._('MAP_REORIENTATE'));

            let spanElement = mapCompassElement.querySelector('.visually-hidden');
            if (!spanElement) {
                spanElement = document.createElement('span')
                spanElement.classList.add('visually-hidden');
                mapCompassElement.appendChild(spanElement);
            }
            spanElement.innerText = MiscTranslate._('MAP_REORIENTATE');
        }
    }

    search (objectIndex, evt) {
        const object = this.objects[objectIndex];
        object.newResults = evt.detail.newResults;
        object.zoom = evt.detail.zoom;
        object.addUp = evt.detail.addUp;

        if (object.isMapReady) {
            this.show(objectIndex);
        }
    }

    show (objectIndex) {
        const object = this.objects[objectIndex];

        // Remove existing markers
        if(!object.addUp) {
            for (let i = 0; i < object.markers.length; i++) {
                object.markers[i].remove();
            }
            object.markers = [];
        }

        // Add new markers
        const lngLats = [];
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];
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
                            .Popup({ offset: 25 })
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
        if (!object.isVisible) {
            return;
        }

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

    toggleView (objectIndex) {
        const object = this.objects[objectIndex];

        const resultsElement = object.mapElement.closest('.ds44-results')
        if (resultsElement) {
            const mapToggleViewElement = resultsElement.querySelector('.ds44-js-toggle-map-view');
            const mapContainerElement = resultsElement.querySelector('.ds44-mapResults');
            if (resultsElement.classList.contains('ds44-results--mapVisible')) {
                resultsElement.classList.remove('ds44-results--mapVisible')
                object.isVisible = false;

                if(mapContainerElement) {
                    MiscAccessibility.hide(mapContainerElement);
                }

                if (mapToggleViewElement) {
                    const text = mapToggleViewElement.innerText.replace(MiscTranslate._('HIDE') + ' ', MiscTranslate._('SHOW') + ' ');
                    mapToggleViewElement.querySelector('span').innerHTML = text;
                    mapToggleViewElement.setAttribute('title', text);
                }
            } else {
                resultsElement.classList.add('ds44-results--mapVisible')
                object.isVisible = true;
                this.resize(objectIndex);

                if(mapContainerElement) {
                    MiscAccessibility.show(mapContainerElement);
                }

                if (mapToggleViewElement) {
                    const text = mapToggleViewElement.innerText.replace(MiscTranslate._('SHOW') + ' ', MiscTranslate._('HIDE') + ' ');
                    mapToggleViewElement.querySelector('span').innerHTML = text;
                    mapToggleViewElement.setAttribute('title', text);
                }
            }
        }
    }

    focus (evt) {
        const resultId = evt.currentTarget.getAttribute('id').replace('search-marker-', 'search-result-');
        const resultElement = document.querySelector('#' + resultId);
        if (resultElement) {
            resultElement.classList.add('active');
        }
    }

    blur (evt) {
        const resultId = evt.currentTarget.getAttribute('id').replace('search-marker-', 'search-result-');
        const resultElement = document.querySelector('#' + resultId);
        if (resultElement) {
            resultElement.classList.remove('active');
        }
    }

    resize (objectIndex) {
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 200);
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 600);
        window.setTimeout(this.resizeMap.bind(this, objectIndex), 1000);
    }

    resizeMap (objectIndex) {
        const object = this.objects[objectIndex];

        object.map.resize();
    }
}

// Singleton
new MapSearch();
