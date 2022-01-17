class InfoTraffic extends MapAbstract {
    constructor () {
        super('.ds44-js-map.info-traffic');
        // SI Url not found and content_html affiché le content html
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.geojsonHoveredId = null;
        object.timeUnHover = 0;
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

        object.hoverEnabled = true;
        object.closePopup = true;
        MiscEvent.addListener('loader:requestShowList', (evt) => {
            this.markerUnHover(objectIndex, false);
            object.propertiesOpen = {};
            object.hoverEnabled = true;
        });

        MiscEvent.addListener('loader:requestShow', (evt) => {
            if(evt.detail) {
                object.hoverEnabled = true;
                object.propertiesOpen = evt.detail.currentResult;
                this.markerHover(objectIndex, {"properties": evt.detail.currentResult}, evt, false, true);
                object.hoverEnabled = false;
            }
        });
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

        object.map.on('moveend', this.move.bind(this, objectIndex));
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
            if (object.map.getLayer('LineMarker')) {
                object.map.removeLayer('LineMarker');
            }
            if (object.map.getSource('lines')) {
                object.map.removeSource('lines');
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
                // Create a LineMarker in the geojson
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

        if(!object.map.getSource("lines")) {
            object.map.addSource('lines', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojsonLineStrings
                }
            });
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

        // Add LineString
        if(!object.map.getLayer("LineMarker")) {
            object.map.addLayer({
                'id': 'LineMarker',
                'type': 'line',
                'source': 'lines',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#BF93E4',
                    'line-width': 5,
                    'line-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        1
                    ]
                }
            });

            object.map.on('mouseenter', 'LineMarker', (evt) => {
                this.markerHover(objectIndex, evt.features[0], evt, false);

                object.geojsonHoveredId = evt.features[0].properties.id;
                var lineIds = [];
                for (let featureIndex = 0; featureIndex < evt.features.length; featureIndex++) {
                    if(!lineIds.includes(evt.features[featureIndex].properties.id)) {
                        lineIds.push({
                            "id": evt.features[featureIndex].properties.id,
                            "snm": evt.features[featureIndex].properties.snm,
                            "description": evt.features[featureIndex].properties.description,
                        });
                    }
                }

                MiscEvent.dispatch('search:focus', {
                    'id': object.geojsonHoveredId,
                    "lngLat": evt.lngLat,
                    "lineIds": lineIds
                });
            });

            object.map.on('mouseout', 'LineMarker', () => {
                this.markerUnHover(objectIndex, false);
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
                    'icon-image': ["get", "icon"],
                    'icon-size': 1,
                    'icon-allow-overlap': true,
                },
                'paint': {
                    'icon-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        1
                    ],
                }
            });

            object.map.on('mouseenter', 'marker', (evt) => {
                this.markerHover(objectIndex, evt.features[0], evt);
            });

            object.map.on('mouseout', 'marker', () => {
                this.markerUnHover(objectIndex, false);
            });

            object.map.on('click', 'marker', (evt) => {
                MiscEvent.dispatch('search:select', { 'id': evt.features[0].properties.id });
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
                    "snm": result.snm,
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
                "snm":          result.snm,
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

    markerHover(objectIndex, feature, evt, showPopup = true, hidePopup = false) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        let forceViewPopup = false
        if(!object.hoverEnabled) {
            object.map.getCanvas().style.cursor = 'pointer';
            var filters = ['match', ['get', 'snm']];
            filters.push(feature.properties.snm, 1);
            if(object.propertiesOpen && feature.properties.snm !== object.propertiesOpen.snm) {
                filters.push(object.propertiesOpen.snm, 1);
                forceViewPopup = true;
            }
            filters.push(0.25)
            object.map.setPaintProperty(
              "marker",
              'icon-opacity',
              filters
            );
            object.map.setPaintProperty(
              "LineMarker",
              'line-opacity',
              filters
            );
        }
        else {
            object.map.getCanvas().style.cursor = 'pointer';
            object.map.setPaintProperty(
              "marker",
              'icon-opacity',
              ['match', ['get', 'snm'], feature.properties.snm, 1 , 0.25]
            );
            object.map.setPaintProperty(
              "LineMarker",
              'line-opacity',
              ['match', ['get', 'snm'], feature.properties.snm, 1 , 0.25]
            );
        }
        clearTimeout(object.timeUnHover);
        if(showPopup) {
            this.showPopup(objectIndex, feature, evt, forceViewPopup);
        }
        if(hidePopup) {
            this.hidePopup(objectIndex);
        }
    }

    markerUnHover(objectIndex, hidePopup = false) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        object.map.getCanvas().style.cursor = 'default';
        if(!object.hoverEnabled) {
            if(object.propertiesOpen) {
                object.timeUnHover = setTimeout(() => {
                    this.hidePopup(objectIndex);
                    object.map.setPaintProperty(
                      "marker",
                      'icon-opacity',
                      ['match', ['get', 'snm'], object.propertiesOpen.snm, 1, 0.25]
                    );
                    object.map.setPaintProperty(
                      "LineMarker",
                      'line-opacity',
                      ['match', ['get', 'snm'], object.propertiesOpen.snm, 1, 0.25]
                    );
                }, 500);
            }
        }
        else {
            object.timeUnHover = setTimeout(() => {
                this.hidePopup(objectIndex);
                object.map.setPaintProperty(
                  "marker",
                  'icon-opacity',
                  1
                );
                object.map.setPaintProperty(
                  "LineMarker",
                  'line-opacity',
                  1
                );
            }, 500);
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
                filter: ['==', 'id', object.popinIdsByElementIds[evt.detail.id] !== undefined ? object.popinIdsByElementIds[evt.detail.id] : evt.detail.id]
            });
            if (features && features[0]) {
                this.markerHover(objectIndex, features[0], null,true);
            }

            const lines = object.map.querySourceFeatures('lines', {
                layers: ['LineMarker'],
                filter: ['==', 'id', evt.detail.id]
            });
            if (lines && lines[0]) {
                this.showPopup(objectIndex, lines[0], evt);
            }
        }
    }

    resultBlur () {
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            this.markerUnHover(objectIndex, true);
        }
    }

    showPopup (objectIndex, feature, evt, force = false) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }
        if(!object.hoverEnabled && !force) {
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

        MiscEvent.addListener('click', this.popupClick.bind(this, id), object.popup.getElement())
        MiscEvent.addListener('mouseenter', () => {
            object.closePopup = false;
            clearTimeout(object.timeUnHover);
        }, object.popup.getElement());

        MiscEvent.addListener('mouseleave', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            object.closePopup = true;
            clearTimeout(object.timeUnHover);
            this.markerUnHover(objectIndex);
        }, object.popup.getElement());
    }

    hidePopup (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object || !object.popup) {
            return;
        }
        if(object.closePopup) {
            object.popup.remove();
            object.popup = null;
        }
    }
}

// Singleton
new InfoTraffic();