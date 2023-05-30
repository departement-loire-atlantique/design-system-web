class MultiPlanningClass {
  constructor () {
    Debug.log("Add Planning -> Constructor");
    this.objects = []
  }

  initialise() {
    Debug.log("Add Planning -> Initialise");

    document
      .querySelectorAll('.ds44-plannings')
      .forEach((plannings) => {
        if(MiscComponent.checkAndCreate(plannings, "plannings")) {
          this.create(plannings);
        }
      });
    this.addEvent();
  }

  create(plannings)
  {
    const object = {
      'id': MiscUtils.generateId(),
      "isInitialized": false,
      'element': plannings,
      "planningsContent": plannings.querySelector(".ds44-plannings-content"),
      "planningNum": 1,
      "limit":  {
        "min": plannings.dataset.limitMin !== undefined ? plannings.dataset.limitMin : null,
        "max": plannings.dataset.limitMax !== undefined ? plannings.dataset.limitMax : null,
      },
      "template": {
        "planning": "",
      }
    };

    let planningElement = plannings.querySelector("*[data-planning]");
    object.template.planning = planningElement.outerHTML;

    let i = 1;
    plannings.querySelectorAll("*[data-planning]").forEach((planningElement) => {
      let dataNumPlanning = planningElement.getAttribute("data-planning");
      dataNumPlanning = dataNumPlanning.replace(/__NUM_PLANNING__/gi, i);
      planningElement.setAttribute("data-planning", dataNumPlanning);
      planningElement.classList.add("ds44-planning");
      let planningElementHtml = planningElement.innerHTML;
      planningElementHtml = planningElementHtml.replace(/__NUM_PLANNING__/gi, i);
      planningElement.innerHTML = planningElementHtml;
    });

    this.objects.push(object);

    if(object.limit.min !== null && object.limit.min > object.planningNum-1) {
      this.disabledButtons(object,"remove-planning");
    }
    if(object.limit.max !== null && object.limit.max < object.planningNum+1) {
      this.disabledButtons(object,"add-planning");
    }
  }

  addEvent() {

    for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
      const object = this.objects[objectIndex];
      if (object.isInitialized) {
        continue;
      }
      object.isInitialized = true;
      MiscEvent.addListener('plannings:add', this.add.bind(this, objectIndex), object.element);
      MiscEvent.addListener('plannings:remove', this.remove.bind(this, objectIndex), object.element);
      object.element.querySelectorAll("*[data-plannings-action]").forEach((button) => {
        MiscEvent.addListener('click', (evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          if(button.dataset.planningsAction === "add-planning")
          {
            MiscEvent.dispatch("plannings:add", {"button": button}, object.element);
          }
          if(button.dataset.planningsAction === "remove-planning")
          {
            MiscEvent.dispatch("plannings:remove", {"button": button}, object.element);
          }
        }, button);
      });
    }

  }

  add(objectIndex) {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }

    let planningNum = object.planningNum;
    planningNum = planningNum+1;
    object.planningNum = planningNum;

    let planningHtml = object.template.planning;
    planningHtml = planningHtml.replace(/__NUM_PLANNING__/gi, planningNum);

    let newPlanning = document.createElement("div");
    newPlanning.innerHTML = planningHtml;
    newPlanning.querySelector("*[data-planning]").classList.add('ds44-planning');
    object.planningsContent.append(newPlanning.querySelector("*[data-planning]"));
    (new Planning());
    MiscEvent.dispatch('fields:initialise');

    if(object.limit.max !== null && object.limit.max < object.planningNum+1) {
      this.disabledButtons(object,"add-planning");
    }
    if(object.limit.min !== null && object.limit.min <= object.planningNum-1) {
      this.enabledButtons(object,"remove-planning");
    }

  }

  remove(objectIndex)
  {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    if(object.limit.min !== null && object.limit.min <= object.planningNum-1) {
      object.element.querySelector("*[data-planning='planning_" + (object.planningNum) + "']").remove();
      object.planningNum -= 1;
    }

    if(object.limit.min !== null && object.limit.min > object.planningNum-1) {
      this.disabledButtons(object,"remove-planning");
    }
    if(object.limit.max !== null && object.limit.max >= object.planningNum+1) {
      this.enabledButtons(object,"add-planning");
    }
  }


  disabledButtons(object, type) {
    object.element.querySelectorAll("*[data-plannings-action='"+type+"']").forEach((button) => {
      button.style.cursor = "default";
      button.classList.remove("ds44-btn--invert");
      button.setAttribute("disabled", "");
    });
  }

  enabledButtons(object, type) {
    object.element.querySelectorAll("*[data-plannings-action='"+type+"']").forEach((button) => {
      button.style.cursor = "pointer";
      button.classList.add("ds44-btn--invert");
      button.removeAttribute("disabled");
    });
  }


}
// Singleton
var MultiPlanning = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new MultiPlanningClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new MultiPlanning();