class Webcam {
  constructor () {
    this.objects = [];
    document.querySelectorAll('.ds44-webcam')
      .forEach((webcamElement) => {
        const webcamViewer = webcamElement.querySelector(".ds44-webcam-viewer");
        if(webcamViewer)
        {
          this.create(webcamElement, webcamViewer);
        }
      });
  }

  create (webcamElement, webcamViewer) {
    const object = {
      "webcamElement": webcamElement,
      "viewer": webcamViewer,
      "button": {
        "enabled": MiscTranslate._("WEBCAM_ENABLED"),
        "disabled": MiscTranslate._("WEBCAM_DISABLED"),
      },
      "refresh": {
        "status": webcamViewer.dataset.webcamRefreshStatus !== undefined ? webcamViewer.dataset.webcamRefreshStatus : "disabled",
        "limit":  webcamViewer.dataset.webcamRefreshMax !== undefined ? parseFloat(webcamViewer.dataset.webcamRefreshMax) : 12,
        "time":   webcamViewer.dataset.webcamRefreshTime !== undefined ? parseFloat(webcamViewer.dataset.webcamRefreshTime) : 10,
        "count":  0
      }
    };
    this.objects.push(object);
    const objectIndex = (this.objects.length - 1);
    this.addEventListener(objectIndex);

    if(object.refresh.status === "enabled") {
      MiscEvent.dispatch("webcam:refresh:start", {}, object.webcamElement);
    }
  }


  addEventListener(objectIndex) {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }

    var timeUpdate = 0;
    MiscEvent.addListener("webcam:refresh:toggle", (evt) => {
      if(object.refresh.status === "enabled") {
        MiscEvent.dispatch("webcam:refresh:stop", {}, object.webcamElement);
      }
      else {
        MiscEvent.dispatch("webcam:refresh:start", {}, object.webcamElement);
      }
    }, object.webcamElement);

    MiscEvent.addListener("webcam:refresh:start", (evt) => {
      object.refresh.status = "enabled";
      object.webcamElement.querySelector("button .ds44-entitled-button").textContent = object.button.disabled;
      object.webcamElement.querySelector("button").setAttribute("title", this.createTitle(objectIndex, object.button.disabled));
      MiscEvent.dispatch("webcam:refresh:update", {}, object.webcamElement);
      clearInterval(timeUpdate);
      timeUpdate = setInterval(() => {
        MiscEvent.dispatch("webcam:refresh:update", {}, object.webcamElement);
        object.refresh.count = object.refresh.count+1;
        if(object.refresh.count >= object.refresh.limit) {
          MiscEvent.dispatch("webcam:refresh:stop", {}, object.webcamElement);
        }
      }, 1000*object.refresh.time);
    }, object.webcamElement);

    MiscEvent.addListener("webcam:refresh:stop", (evt) => {
      object.refresh.status = "disabled";
      object.refresh.count = 0;
      clearInterval(timeUpdate);
      object.webcamElement.querySelector("button .ds44-entitled-button").textContent = object.button.enabled;
      object.webcamElement.querySelector("button").setAttribute("title", this.createTitle(objectIndex, object.button.enabled));
    }, object.webcamElement);

    MiscEvent.addListener("webcam:refresh:update", (evt) => {
      const now = new Date();
      const separator = object.viewer.dataset.webcamSrc.indexOf("?") >= 0 ? "&" : "?"
      object.viewer.src = object.viewer.dataset.webcamSrc+separator+"timestamp="+now.getTime();
    }, object.webcamElement);

    MiscEvent.addListener("click", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      MiscEvent.dispatch("webcam:refresh:toggle", {}, object.webcamElement);
    }, object.webcamElement.querySelector("button"));

  }

  createTitle(objectIndex, title) {
    const object = this.objects[objectIndex];
    if (!object) {
      return title;
    }
    let lieuWebcam = object.webcamElement.querySelector("button .visually-hidden");
    if(lieuWebcam) {
      title += lieuWebcam.textContent;
    }
    return title;
  }


}

// Singleton
new Webcam();