class ImageZoomClass {
    constructor () {
        Debug.log("ImageZoom -> Constructor");
        this.objects = [];
        this.zoom = 2;
        this.borderWidth = 3;
    }

    initialise() {
        Debug.log("ImageZoom -> Initialise");
        document
          .querySelectorAll('.ds44-imgLoupe')
          .forEach((magnifyContainerElement) => {
              if(MiscComponent.checkAndCreate(magnifyContainerElement, "image-zoom")) {
                  this.create(magnifyContainerElement);
              }
          });
    }

    clearObject() {
        Debug.log("ImageZoom -> Clear object");
        this.objects = [];
    }

    create (magnifyContainerElement) {
        const imageElement = magnifyContainerElement.querySelector('img');
        const magnifyElement = document.createElement('div');
        magnifyElement.classList.add('ds44-js-magnifier');
        magnifyElement.classList.add('hidden');
        magnifyElement.style.backgroundImage = "url('" + imageElement.src + "')";
        magnifyElement.style.backgroundRepeat = 'no-repeat';
        magnifyElement.style.backgroundSize = (imageElement.width * this.zoom) + 'px ' + (imageElement.height * this.zoom) + 'px';
        imageElement.parentElement.insertBefore(magnifyElement, imageElement);

        const object = {
            'id': MiscUtils.generateId(),
            'imageElement': imageElement,
            'magnifyElement': magnifyElement
        };

        this.objects.push(object);

        const objectIndex = (this.objects.length - 1);
        MiscEvent.addListener('mousemove', this.move.bind(this, objectIndex), magnifyElement);
        MiscEvent.addListener('mousemove', this.move.bind(this, objectIndex), imageElement);
        MiscEvent.addListener('touchmove', this.move.bind(this, objectIndex), magnifyElement);
        MiscEvent.addListener('touchmove', this.move.bind(this, objectIndex), imageElement);
        MiscEvent.addListener('mouseleave', this.leave.bind(this, objectIndex), magnifyElement);
    }

    move (objectIndex, evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const width = object.magnifyElement.offsetWidth / 2;
        const height = object.magnifyElement.offsetHeight / 2;
        const cursorPosition = this.getCursorPosition(objectIndex, evt);

        let x = cursorPosition.x;
        let y = cursorPosition.y;
        if (x > object.imageElement.width) {
            x = object.imageElement.width;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > object.imageElement.height) {
            y = object.imageElement.height;
        }
        if (y < 0) {
            y = 0;
        }

        object.magnifyElement.style.left = (x - width) + 'px';
        object.magnifyElement.style.top = (y - height) + 'px';
        object.magnifyElement.style.backgroundPosition = (((x * this.zoom) - width + this.borderWidth) * -1) + 'px ' + (((y * this.zoom) - height + this.borderWidth) * -1) + 'px';
        object.magnifyElement.classList.remove('hidden');
    }

    leave (objectIndex, evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        object.magnifyElement.classList.add('hidden');
    }

    getCursorPosition (objectIndex, evt) {
        const object = this.objects[objectIndex];
        if (!object) {
            return;
        }

        const boundingClientRect = object.imageElement.getBoundingClientRect();
        return {
            x: (evt.pageX || evt.touches[0].pageX || 0) - boundingClientRect.left - window.pageXOffset,
            y: (evt.pageY || evt.touches[0].pageY || 0) - boundingClientRect.top - window.pageYOffset
        };
    }
}
// Singleton
var ImageZoom = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new ImageZoomClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new ImageZoom();
