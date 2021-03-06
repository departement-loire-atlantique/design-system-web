class MapMarker extends MapAbstract {
    constructor () {
        super('.ds44-js-map:not([data-geojson-mode="dynamic"])');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.geojsonHoveredId = null;
        object.geojsonModel = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            },
            'cluster': (object.mapElement.getAttribute('data-use-cluster') === 'true'),
            'clusterMaxZoom': 14,
            'clusterRadius': 50,
            'generateId': true
        };
    }

    afterLoad (objectIndex) {
        super.afterLoad(objectIndex);

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isMapReady = true;
        object.map.loadImage(
            'https://design.loire-atlantique.fr/assets/images/cd44-marker-black.png',
            (error, image) => {
                if (error) throw error;
                object.map.addImage('cd44-marker', image);
            }
        );
        object.map.on('moveend', this.move.bind(this, objectIndex));
        if (object.newResults) {
            this.show(objectIndex);
        }
    }

    move (objectIndex, evt) {
        if (!evt.originalEvent) {
            return;
        }

        const object = this.objects[objectIndex];
        if (!object || !object.isVisible) {
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

    show (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        // Remove existing layers and source
        if (!object.addUp) {
            if (object.map.getLayer('cluster-background')) {
                object.map.removeLayer('cluster-background');
            }
            if (object.map.getLayer('cluster-count')) {
                object.map.removeLayer('cluster-count');
            }
            if (object.map.getLayer('marker')) {
                object.map.removeLayer('marker');
            }
            if (object.map.getSource('places')) {
                object.map.removeSource('places');
            }
        }

        // Initialize bounding box
        let hasBoundingBox = false;
        const boundingBox = {
            longitude: {
                min: null,
                max: null
            },
            latitude: {
                min: null,
                max: null
            }
        };

        // Create geojson
        const geojsonFeatures = [];
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

            // Create a marker in the geojson
            hasBoundingBox = true;
            geojsonFeatures.push({
                'type': 'Feature',
                'properties': {
                    'id': result.id,
                    'description': result.metadata.html_marker
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        result.metadata.long,
                        result.metadata.lat
                    ]
                }
            });

            if (boundingBox.longitude.min === null) {
                boundingBox.longitude.min = result.metadata.long;
            } else {
                boundingBox.longitude.min = Math.min(result.metadata.long, boundingBox.longitude.min);
            }
            if (boundingBox.longitude.max === null) {
                boundingBox.longitude.max = result.metadata.long;
            } else {
                boundingBox.longitude.max = Math.max(result.metadata.long, boundingBox.longitude.max);
            }
            if (boundingBox.latitude.min === null) {
                boundingBox.latitude.min = result.metadata.lat;
            } else {
                boundingBox.latitude.min = Math.min(result.metadata.lat, boundingBox.latitude.min);
            }
            if (boundingBox.latitude.max === null) {
                boundingBox.latitude.max = result.metadata.lat;
            } else {
                boundingBox.latitude.max = Math.max(result.metadata.lat, boundingBox.latitude.max);
            }
        }

        // Add source
        if (!object.map.getSource('places')) {
            object.geojsonModel.data.features = geojsonFeatures;
            object.map.addSource('places', object.geojsonModel);
        } else {
            const features = object.map.querySourceFeatures('places');
            for (let i = 0; i < geojsonFeatures.length; i++) {
                features.push(geojsonFeatures[i]);
            }
            object.map.getSource('places').setData(features);
        }

        // Add cluster
        if (!object.map.getLayer('cluster-background')) {
            object.map.addLayer({
                id: 'cluster-background',
                type: 'circle',
                source: 'places',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': '#99e6d1',
                    'circle-radius': 20
                }
            });
            object.map.on('click', 'cluster-background', (evt) => {
                const features = object.map.queryRenderedFeatures(evt.point, {
                    layers: ['cluster-background']
                });
                const clusterId = features[0].properties.cluster_id;
                object.map.getSource('places').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        object.map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
            object.map.on('mouseenter', 'cluster-background', (evt) => {
                object.map.getCanvas().style.cursor = 'pointer';
            });
            object.map.on('mouseleave', 'cluster-background', (evt) => {
                object.map.getCanvas().style.cursor = '';
            });
        }
        if (!object.map.getLayer('cluster-count')) {
            object.map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'places',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
        }

        // Add marker
        if (!object.map.getLayer('marker')) {
            object.map.addLayer({
                'id': 'marker',
                'type': 'symbol',
                'source': 'places',
                'filter': ['!', ['has', 'point_count']],
                'layout': {
                    'icon-image': 'cd44-marker',
                    'icon-size': 1,
                    'icon-allow-overlap': true
                }
            });
            object.map.on('click', 'marker', (evt) => {
                this.showPopup(objectIndex, evt.features[0], evt);
            });
            object.map.on('mouseenter', 'marker', (evt) => {
                object.map.getCanvas().style.cursor = 'pointer';

                object.geojsonHoveredId = evt.features[0].properties.id;
                MiscEvent.dispatch('search:focus', {
                    'id': object.geojsonHoveredId
                });
            });
            /*object.map.on('mouseleave', 'marker', (evt) => {
                object.map.getCanvas().style.cursor = '';

                if (object.geojsonHoveredId) {
                    MiscEvent.dispatch('search:blur', {
                        'id': object.geojsonHoveredId
                    });

                    object.geojsonHoveredId = null;
                }
            });*/
        }

        if (object.zoom && hasBoundingBox) {
            // Zoom the map
            object.zoom = false;
            object.map.fitBounds(
                [
                    [
                        boundingBox.longitude.min,
                        boundingBox.latitude.min
                    ],
                    [
                        boundingBox.longitude.max,
                        boundingBox.latitude.max
                    ]
                ],
                {
                    padding: 50,
                    maxZoom: 15
                }
            );
        }

        if (
            object.isGeojsonLoaded &&
            object.mapElement.getAttribute('data-geojson-refine') === 'true'
        ) {
            this.showGeojson(objectIndex);
        }
    }

    afterLoadGeojson (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.isGeojsonLoaded = true;
        if (object.mapElement.getAttribute('data-geojson-refine') === 'true') {
            this.showGeojson(objectIndex);
        }
    }

    getGeojsonIds (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object) {
            return [];
        }

        const geojsonIds = [];
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

            // Get corresponding geojson
            if (result.metadata.geojson_id) {
                geojsonIds.push(result.metadata.geojson_id);
            }
        }

        return geojsonIds;
    }

    resultFocus (evt) {
        if (
            !evt ||
            !evt.detail ||
            !evt.detail.id
        ) {
            return;
        }

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];
            if (!object || !object.map) {
                continue;
            }

            const features = object.map.querySourceFeatures('places', {
                layers: ['marker'],
                filter: ['==', 'id', evt.detail.id]
            });
            if (features && features[0]) {
                this.showPopup(objectIndex, features[0], null);
            }
        }
    }

    resultBlur () {
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            this.hidePopup(objectIndex);
        }
    }

    showPopup (objectIndex, feature, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        if (object.popup) {
            this.hidePopup(objectIndex);
        }

        const coordinates = feature.geometry.coordinates.slice();
        const id = feature.properties.id;
        const description = feature.properties.description;

        if (evt) {
            while (Math.abs(evt.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += evt.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }

        object.popup = new window.mapboxgl.Popup({ offset: 25 })
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(object.map);

        MiscEvent.addListener('click', this.popupClick.bind(this, id), object.popup.getElement())
    }

    hidePopup (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.popup) {
            return;
        }

        object.popup.remove();
        object.popup = null;
    }
}

// Singleton
new MapMarker();
