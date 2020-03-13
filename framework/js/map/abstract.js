class MapAbstract {
    constructor(selector) {
        this.objects = [];

        document
            .querySelectorAll(selector)
            .forEach((element) => {
                this.create(element);
            });

        let linkElement = document.createElement('link');
        linkElement.setAttribute('href', 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css');
        linkElement.setAttribute('rel', 'stylesheet');
        document.head.appendChild(linkElement);

        let scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js');
        scriptElement.setAttribute('type', 'text/javascript');
        document.head.appendChild(scriptElement);
        MiscEvent.addListener(
            'load',
            ((selector) => {
                window.mapboxgl.accessToken = 'pk.eyJ1IjoiemF6aWZmaWMiLCJhIjoiY2s3bmtxYXh2MDNqZzNkdDc3NzJ0aGdqayJ9.TuhsI1ZKXwKSGw2F3bVy5g';

                document
                    .querySelectorAll(selector)
                    .forEach((element) => {
                        this.load(element);
                    });
            }).bind(this, selector),
            scriptElement
        );
    }

    create(element) {
        const object = {
            'id': MiscUtils.generateId(),
            'mapElement': element,
            'markers': [],
            'isMapReady': false
        };
        object.mapElement.setAttribute('id', object.id);
        this.objects.push(object);
    }

    load(element) {
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            if (object.id === element.getAttribute('id')) {
                object.isMapReady = true;
                object.map = new window.mapboxgl.Map({
                    container: object.id,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-1.8157647, 47.2780468],
                    zoom: 8
                });

                this.afterLoad(objectIndex);

                break;
            }
        }
    }

    afterLoad(objectIndex) {
        // Abstract method
    }
}
