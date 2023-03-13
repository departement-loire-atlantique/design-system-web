class DuplicateLineClass {
  constructor () {
    Debug.log("DuplicateLine -> Constructor");
    this.objects = [];
  }
  initialise() {
    Debug.log("DuplicateLine -> Initialise");
    document
      .querySelectorAll('*[data-duplicate-line]')
      .forEach((duplicateLine) => {
        if(MiscComponent.checkAndCreate(duplicateLine, "duplicate-line"))
        {
          this.create(duplicateLine);
        }
      });
    this.initialize();
  }

  create (currentLine) {

    currentLine.querySelectorAll("*[name]").forEach((element) => {
      this.transformElement(currentLine, element, element.getAttribute("name"), "name");
    });
    currentLine.querySelectorAll("*[data-name]").forEach((element) => {
      this.transformElement(currentLine, element, element.getAttribute("data-name"), "data-name");
    });

    let duplicateLine = document.createElement("div");
    duplicateLine.innerHTML = currentLine.innerHTML;

    const object = {
      'id': MiscUtils.generateId(),
      "container": currentLine.parentElement,
      'firstLine': currentLine,
      "duplicateLine": duplicateLine,
    };
    this.objects.push(object);
  }

  transformElement(currentLine, element, name, keyName)
  {
    if(name)
    {
      element.setAttribute(keyName, "__LINE_DUPLICATE_NAME__["+name+"]");
      element.setAttribute("id", "__LINE_DUPLICATE_ID___"+name);
      element.closest(".ds44-fieldContainer").querySelectorAll("*[for='"+name+"']").forEach((label) => {
        label.setAttribute("for", "__LINE_DUPLICATE_ID___"+name);
      });
      element.closest(".ds44-fieldContainer").querySelectorAll("*[id]").forEach((otherElement) => {
        let currentId = ""+otherElement.getAttribute("id");
        if(currentId && !currentId.match(/__LINE_DUPLICATE_ID___/))
        {
          let regexId = new RegExp(name, "gi");
          let newId = currentId.replace(regexId, "__LINE_DUPLICATE_ID___"+name);
          otherElement.setAttribute("id", newId);
        }
        if(otherElement.getAttribute("aria-labelledby"))
        {
          let currentAriaLabelledby = otherElement.getAttribute("aria-labelledby");
          let regexAria = new RegExp(name, "gi");
          let newAria = currentAriaLabelledby.replace(regexAria, "__LINE_DUPLICATE_ID___"+name);
          otherElement.setAttribute("aria-labelledby", newAria);
        }
      });
    }
  }

  initialize () {
    for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
      const object = this.objects[objectIndex];
      object.firstLine.innerHTML = this.generateHtml(objectIndex);
      object.firstLine.classList.add("line-is-duplicate");
      object.firstLine.querySelectorAll("*[data-no-first-line]").forEach((element) => {
        element.remove();
      });

      object.duplicateLine.querySelectorAll("*[data-no-duplicate]").forEach((element) => {
        element.remove();
      });

      MiscEvent.addListener('click', this.addLine.bind(this, objectIndex), object.firstLine.querySelector("*[data-line-add]"));
    }
  }

  addLine(objectIndex, evt) {
    evt.preventDefault()
    evt.stopPropagation();

    // Mark the component category as answered
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }

    var newLine = document.createElement('div');
    newLine.classList = object.firstLine.classList;
    newLine.classList.add("line-is-duplicate");
    newLine.innerHTML = this.generateHtml(objectIndex);

    let children = object.container.querySelectorAll(".line-is-duplicate");

    object.container.insertBefore(newLine, children[children.length - 1].nextSibling);
    MiscEvent.addListener('click', this.removeLine.bind(this, objectIndex), newLine.querySelector("*[data-line-remove]"));
    MiscEvent.dispatch('fields:initialise', {});
    return false;
  }

  generateHtml(objectIndex) {
    // Mark the component category as answered
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    let duplicateLinKey = MiscUtils.generateKey();
    let innerHTML = object.duplicateLine.innerHTML.replace(/__LINE_DUPLICATE_NAME__/gi, "line["+duplicateLinKey+"]");
    innerHTML = innerHTML.replace(/__LINE_DUPLICATE_ID__/gi, "line_"+duplicateLinKey);
    return innerHTML;
  }

  removeLine(objectIndex, evt) {
    evt.preventDefault()
    evt.stopPropagation();

    // Mark the component category as answered
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    evt.target.closest(".line-is-duplicate").remove();
    return false;
  }


}
// Singleton
var DuplicateLine = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new DuplicateLineClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new DuplicateLine();
