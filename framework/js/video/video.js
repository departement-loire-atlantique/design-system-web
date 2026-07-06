class VideoClass {
    constructor () {
        Debug.log("Video -> Constructor");
        this.objects = [];
    }

    initialise() {
        Debug.log("Video -> Initialise");
        document
          .querySelectorAll('.ds44-js-video')
          .forEach((videoElement) => {
              if(MiscComponent.checkAndCreate(videoElement, "video")) {
                  this.create(videoElement);
              }
          });
    }

    clearObject() {
        Debug.log("Video -> Clear object");
        this.objects = [];
    }

    create (videoElement) {
        const object = {
            'id': videoElement.getAttribute('id'),
            'element': videoElement,
            'buttons': document.querySelectorAll("[data-video-button='"+videoElement.getAttribute('id')+"']")
        };
        this.objects.push(object);
        object.buttons.forEach((button) => {
          MiscEvent.addListener("click", ()=>{
            let icon = button.querySelector(".icon");
            let value = button.querySelector(".value");
            if(videoElement.paused)
            {
              videoElement.play();
              icon.classList.remove(icon.dataset.iconPlay);
              icon.classList.add(icon.dataset.iconPause);
              value.innerText = value.dataset.valuePause;
            }
            else
            {
              videoElement.pause();
              icon.classList.remove(icon.dataset.iconPause);
              icon.classList.add(icon.dataset.iconPlay);
              value.innerText = value.dataset.valuePlay;
            }
          }, button);
        });
    }
}
// Singleton
var Video = (function () {
    "use strict";
    var instance;
    function Singleton() {
        if (!instance) {
            instance = new VideoClass();
        }
        instance.initialise();
    }
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }
    return Singleton;
}());
new Video();
