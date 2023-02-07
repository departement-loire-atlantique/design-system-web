class MapMarkerClass extends MapAbstract {
    constructor () {
        super("MapMarker", '.ds44-js-map:not([data-geojson-mode="dynamic"]):not(.info-traffic)');
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.geojsonHoveredId = null;
        let clusterTolerance = 0.375;
        if(object.mapElement.getAttribute('data-cluster-tolerance') !== undefined && object.mapElement.getAttribute('data-cluster-tolerance') !== null)
        {
            clusterTolerance = parseFloat(object.mapElement.getAttribute('data-cluster-tolerance'));
        }
        object.geojsonModel = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            },
            'cluster': (object.mapElement.getAttribute('data-use-cluster') === 'true'),
            'clusterMaxZoom': 14,
            'clusterRadius': 50,
            "tolerance": clusterTolerance,
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
          "https://design.loire-atlantique.fr/assets/images/cd44-marker-black.png",
          (error, image) => {
              if (error) throw error;
              object.map.addImage("cd44-marker", image);
          }
        );

        if(!object.mapElement.hasAttribute("data-no-refresh"))
        {
            object.map.on('moveend', this.move.bind(this, objectIndex));
        }
        if (object.newResults) {
            this.show(objectIndex);
        }
    }

    move (objectIndex, evt) {
        if (!evt.originalEvent && !evt.refresh) {
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
        const placesFeaturesAdd = {};
        const geojsonLineStrings = [];
        for (let resultIndex in object.newResults) {
            if (!object.newResults.hasOwnProperty(resultIndex)) {
                continue;
            }

            const result = object.newResults[resultIndex];

            if (
              !result.metadata ||
              !result.metadata.html_marker
            ) {
                continue;
            }

            if(result.metadata.lat && result.metadata.long) {
                hasBoundingBox = true;
                // Create a marker in the geojson
                this.createPlaceMarker(object, geojsonFeatures, placesFeaturesAdd, result, boundingBox);
            }
            else if(result.metadata.coordinates) {
                hasBoundingBox = true;
                // Create a lineString in the geojson
                this.createLineMarker(geojsonLineStrings, result);
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


            let paintCluster = {
                'circle-color': '#99e6d1',
                'circle-radius': 20
            }
            if(object.mapElement.getAttribute('data-cluster-theme') && object.mapElement.getAttribute('data-cluster-theme') === "theme-2")
            {
                paintCluster = {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#fff',
                        10,
                        '#fff',
                    ],
                    'circle-stroke-color': [
                        'step',
                        ['get', 'point_count'],
                        '#000',
                        10,
                        '#000',
                    ],
                    'circle-stroke-width': [
                        'step',
                        ['get', 'point_count'],
                        1,
                        10,
                        1,
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        10,
                        25,
                    ]
                }
            }

            object.map.addLayer({
                id: 'cluster-background',
                type: 'circle',
                source: 'places',
                filter: ['has', 'point_count'],
                paint: paintCluster
            }, "currentMarker");
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
            }, "currentMarker");
        }

        // Add marker
        if (!object.map.getLayer('marker')) {
            object.map.addLayer({
                'id': 'marker',
                'type': 'symbol',
                'source': 'places',
                'filter': ['!', ['has', 'point_count']],
                'layout': {
                    'icon-image': ["get", "icon"],
                    'icon-size': 1,
                    'icon-allow-overlap': true
                }
            }, "currentMarker");
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

    createPlaceMarker(object, geojsonFeatures, placesFeaturesAdd, result, boundingBox) {
        let placeKey = result.metadata.long+"_"+result.metadata.lat;
        if(placesFeaturesAdd[placeKey] !== undefined)
        {
            geojsonFeatures[placesFeaturesAdd[placeKey]].properties.description = geojsonFeatures[placesFeaturesAdd[placeKey]].properties.description+result.metadata.html_marker;
            const conatinerSearch = document.querySelector("#search-result-"+result.id);
            if(conatinerSearch)
            {
                object.popinIdsByElementIds[result.id] = geojsonFeatures[placesFeaturesAdd[placeKey]].properties.id;
            }
        }
        else
        {
            object.popinIdsByElementIds[result.id] = result.id;
            placesFeaturesAdd[placeKey] = geojsonFeatures.length;
            geojsonFeatures.push({
                'type': 'Feature',
                'properties': {
                    'id': result.id,
                    'description': result.metadata.html_marker,
                    "type":  "marker",
                    'icon': result.metadata.icon_marker !== undefined ? (object.iconsMarker.includes(result.metadata.icon_marker) ? result.metadata.icon_marker : "cd44-marker") : "cd44-marker"
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        result.metadata.long,
                        result.metadata.lat
                    ]
                }
            });
        }

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

    createLineMarker(geojsonLineStrings, result) {
        geojsonLineStrings.push({
            'type': 'Feature',
            'properties': {
                'id':           result.id+"_line",
                'description':  result.metadata.html_marker,
                "type":         "line"
            },
            'geometry': {
                'type': 'LineString',
                'properties': {},
                'coordinates': result.metadata.coordinates
            }
        });
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
                filter: ['==', 'id', object.popinIdsByElementIds[evt.detail.id] !== undefined ? object.popinIdsByElementIds[evt.detail.id] : evt.detail.id]
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

        const id = feature.properties.id;
        let description = feature.properties.description;
        if(feature.properties.type === "line" && evt.detail.lngLat !== undefined) {
            if(evt.detail.lineIds !== undefined && evt.detail.lineIds.length > 0)
            {
                description = "";
                for(let lineIndex = 0; lineIndex < evt.detail.lineIds.length; lineIndex++) {
                    description += evt.detail.lineIds[lineIndex].description;
                }
            }
            else
            {
                description = feature.properties.description;
            }
            object.popup = new window.mapboxgl.Popup({ offset: 25 })
              .setLngLat(evt.detail.lngLat)
              .setHTML(description)
              .addTo(object.map);
        }
        else {
            const coordinates = feature.geometry.coordinates.slice();
            if (evt) {
                while (Math.abs(evt.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += evt.lngLat.lng > coordinates[0] ? 360 : -360;
                }
            }
            object.popup = new window.mapboxgl.Popup({ offset: 25 })
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(object.map);
        }

        let buttonSelect = object.popup.getElement().querySelector(".ds44-js-select-button");
        if(buttonSelect)
        {
            ButtonSelect.getInstance().initialise();
            document
              .querySelectorAll("*[data-select-button-id='"+buttonSelect.dataset.selectButtonId+"']")
              .forEach((button) => {
                  if(button !== buttonSelect) {
                      MiscEvent.dispatch("button::switch-value", {isSelect: button.classList.contains("is-select")}, buttonSelect);
                  }
              });
        }


        if(!object.mapElement.hasAttribute("data-popup-click-disabled"))
        {
            MiscEvent.addListener('click', this.popupClick.bind(this, id), object.popup.getElement())
        }
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
var MapMarker = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new MapMarkerClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new MapMarker();
