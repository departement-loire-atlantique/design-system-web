class PlanningClass {
  constructor () {
    Debug.log("Planning -> Constructor");
    this.visibilityCounter = 0;
    this.objects = []
  }

  initialise() {
    Debug.log("Planning -> Initialise");
    document
      .querySelectorAll('.ds44-planning')
      .forEach((planning) => {
        if(MiscComponent.checkAndCreate(planning, "planning")) {
          this.create(planning);
        }
      });
    this.addEvent();
  }

  create (planning) {
    const object = {
      'id': MiscUtils.generateId(),
      "isInitialized": false,
      'element': planning,
      "nbColonne": planning.querySelectorAll('tr.first *[data-col-key]').length,
      "table": planning.querySelector(".ds44-planning-table"),
      "choiceDays": planning.querySelector(".ds-44-choices-days"),
      "daySort": [],
      "days": [],
      "limit":  {
        "min": planning.dataset.limitMin !== undefined ? planning.dataset.limitMin : null,
        "max": planning.dataset.limitMax !== undefined ? planning.dataset.limitMax : null,
      },
      "template": {
        "header": "",
        "th": "",
        "td": ""
      }
    };

    let header = planning.querySelector('tr.first *[data-col-key="1"]').cloneNode(true);
    header.setAttribute("data-col-key", "__CRENEAU_NUM__");
    header.setAttribute("data-value-key", "creneau___CRENEAU_NUM__");
    let templateHeader = header.outerHTML
    templateHeader = templateHeader.replace(/1/gi, "__CRENEAU_NUM__");
    object.template.header = templateHeader;

    planning.querySelectorAll('tr.second *[data-col-key="1"]').forEach((thElement) => {
      let th = thElement.cloneNode(true);
      th.setAttribute("data-col-key", "__CRENEAU_NUM__");
      object.template.th += th.outerHTML;
    });

    let i = 0;
    planning.querySelectorAll('tbody tr[data-row-name]').forEach((trElement) => {
      object.days.push(trElement.dataset.rowName);
      if(i === 0)
      {
        let templateTd = "";
        trElement.querySelectorAll('*[data-col-key="1"]').forEach((tdElement) => {
          let td = tdElement.cloneNode(true);
          td.setAttribute("data-col-key", "__CRENEAU_NUM__");
          td.querySelectorAll("input").forEach((input) => {
            input.setAttribute("value", "");
            let title = input.getAttribute("title");
            if(title) {
              title = title.replace(/monday/gi, "__DAY_TEXT__");
              title = title.replace(/Créneau 1/gi, "Créneau __CRENEAU_NUM__");
              input.setAttribute("title", title);
            }
          });
          td.querySelectorAll("label").forEach((label) => {
            let title = label.querySelector(".ds44-labelTypePlaceholder span").textContent;
            title = title.replace(/monday/gi, "__DAY_TEXT__");
            title = title.replace(/Créneau 1/gi, "Créneau __CRENEAU_NUM__");
            label.querySelector(".ds44-labelTypePlaceholder span").textContent = title;
          });
          templateTd += td.outerHTML;
        });

        let clearTemplate = document.createElement("template");
        clearTemplate.innerHTML = templateTd;
        templateTd = clearTemplate.innerHTML;
        templateTd = templateTd.replace(/_1/gi, "___CRENEAU_NUM__");
        templateTd = templateTd.replace(/\[1\]/gi, "[__CRENEAU_NUM__]");
        templateTd = templateTd.replace(/monday/gi, "__DAY__");
        templateTd = templateTd.replace(/debcr1/gi, "__CRENEAU_DEB__");
        templateTd = templateTd.replace(/fincr1/gi, "__CRENEAU_FIN__");
        templateTd = templateTd.replace(/\n/gi, "");
        object.template.td = templateTd;
      }
      i += 1;

      trElement.querySelectorAll("label").forEach((label) => {
        let title = label.querySelector(".ds44-labelTypePlaceholder span").textContent;
        let regex = new RegExp(trElement.dataset.rowName, "gi");
        title = title.replace(regex, MiscTranslate._(trElement.dataset.rowName));
        label.querySelector(".ds44-labelTypePlaceholder span").textContent = title;
      });
    });
    this.objects.push(object);

    if(object.limit.min !== null && object.limit.min > object.nbColonne-1) {
      this.disabledButtons(object,"remove");
    }
    if(object.limit.max !== null && object.limit.max < object.nbColonne+1) {
      this.disabledButtons(object,"add");
    }

    if(object.choiceDays)
    {
      object.choiceDays.querySelectorAll("input").forEach((input) => {
        if(planning.querySelector("*[data-row-name='"+input.value+"']"))
        {
          input.checked = true;
        }
        object.daySort.push(input.value);
      });
    }

  }

  addEvent() {

    for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
      const object = this.objects[objectIndex];
      if (object.isInitialized) {
        continue;
      }
      object.isInitialized = true;
      MiscEvent.addListener('planning:add', this.add.bind(this, objectIndex), object.element);
      MiscEvent.addListener('planning:copy-paste', this.copyPaste.bind(this, objectIndex), object.element);
      MiscEvent.addListener('planning:remove', this.remove.bind(this, objectIndex), object.element);
      object.element.querySelectorAll("*[data-planning-action]").forEach((button) => {
        MiscEvent.addListener('click', () => {
          if(button.dataset.planningAction === "add")
          {
            MiscEvent.dispatch("planning:add", {"button": button}, object.element);
          }
          else if(button.dataset.planningAction === "remove")
          {
            MiscEvent.dispatch("planning:remove", {"button": button}, object.element);
          }
          else if(button.dataset.planningAction === "copy-paste")
          {
            MiscEvent.dispatch("planning:copy-paste", {"button": button}, object.element);
          }
        }, button);
      });
      if(object.choiceDays)
      {
        object.choiceDays.querySelectorAll("input").forEach((input) => {
          MiscEvent.addListener("field:change-value", this.choiceDay.bind(this, objectIndex), input);
        });
      }
    }

  }

  choiceDay(objectIndex, event = null) {
    const object = this.objects[objectIndex];
    if (!object || !event.target) {
      return;
    }

    if(event.detail.checked === undefined) {
      return;
    }

    let dayKeyname = event.target.value;
    if(event.detail.checked === false) {
      let row = object.element.querySelector("*[data-row-name='"+dayKeyname+"']");
      if(row) {
        row.remove();
      }
      for(let i=0; i < object.days.length; i++)
      {
        if(object.days[i] === dayKeyname)
        {
          delete object.days[i];
        }
      }
    }
    else {
      let dayKeynameAfter = null;
      let daysEnabled = [];
      object.choiceDays.querySelectorAll("input:checked").forEach((choice) => {
        daysEnabled.push(choice.value);
      });

      for(let i=0; i < daysEnabled.length; i++)
      {
        if(daysEnabled[i] === dayKeyname)
        {
          let num = i-1;
          if(num < 0) {
            num = 0;
          }
          dayKeynameAfter = daysEnabled[num];
        }
      }
      let row = document.createElement("tr");
      row.setAttribute("data-row-name", dayKeyname);
      let td = document.createElement("td");
      let label = MiscTranslate._(dayKeyname);
      label = label.charAt(0).toUpperCase() + label.slice(1)
      td.innerText = label;
      row.append(td);

      for(let i=0; i < object.nbColonne; i++)
      {
        let tdTemplates = this.htmlToElements(this.replaceValueTemplate(object.template.td, i+1, dayKeyname));
        row.append(tdTemplates[0], tdTemplates[1]);
      }
      object.days.push(dayKeyname);
      let elementAfterAppend = object.element.querySelector("*[data-row-name='"+dayKeynameAfter+"']");
      if(!elementAfterAppend) {
        elementAfterAppend = object.element.querySelector("*[data-first-line]");
      }
      elementAfterAppend.parentNode.insertBefore(row, elementAfterAppend.nextSibling);
      MiscEvent.dispatch('fields:initialise', {});
    }
  }

  add(objectIndex) {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    if(object.limit.max !== null && object.limit.max >= object.nbColonne+1) {
      object.nbColonne += 1;
      this.htmlToElements(this.replaceValueTemplate(object.template.header, object.nbColonne)).forEach((element) => {
        object.table.querySelector("tr.first").append(element);
      });

      let thTemplates = this.htmlToElements(this.replaceValueTemplate(object.template.th, object.nbColonne));
      object.table.querySelector("tr.second").append(thTemplates[0], thTemplates[1]);

      object.days.forEach((day) => {
        let tdTemplates = this.htmlToElements(this.replaceValueTemplate(object.template.td, object.nbColonne, day));
        object.table.querySelector("tbody tr[data-row-name='"+day+"']").append(tdTemplates[0], tdTemplates[1]);
      });

      MiscEvent.dispatch('fields:initialise', {});
    }

    if(object.limit.max !== null && object.limit.max < object.nbColonne+1) {
      this.disabledButtons(object,"add");
    }
    if(object.limit.min !== null && object.limit.min <= object.nbColonne-1) {
      this.enabledButtons(object,"remove");
    }
  }

  copyPaste(objectIndex) {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    object.table.querySelectorAll("tbody tr[data-row-name]").forEach((tr) => {
      tr.querySelectorAll("td[data-value-key='start'] *[data-component-time-uuid]").forEach((fieldTime) => {
        let colKey = fieldTime.closest("td").dataset.colKey;
        let mondayStartValueByCol = object.table.querySelector("tbody tr[data-row-name='monday'] td[data-value-key='start'][data-col-key='"+colKey+"'] .ds44-input-value").value;
        let mondayStartValue;
        if(!mondayStartValueByCol) {
          mondayStartValue = object.table.querySelector("tbody tr[data-row-name='monday'] td[data-value-key='start'][data-col-key='1'] .ds44-input-value").value;
        }
        else {
          mondayStartValue = mondayStartValueByCol;
        }

        if((tr.dataset.rowName !== "monday" || !mondayStartValueByCol) && !fieldTime.querySelector(".ds44-input-value").value)
        {
          MiscEvent.dispatch('field:' + this.getFieldName(fieldTime) + ':set', {value: mondayStartValue});
        }

      });
      tr.querySelectorAll("td[data-value-key='end'] *[data-component-time-uuid]").forEach((fieldTime) => {
        let colKey = fieldTime.closest("td").dataset.colKey;

        let mondayEndValueByCol = object.table.querySelector("tbody tr[data-row-name='monday'] td[data-value-key='end'][data-col-key='"+colKey+"'] .ds44-input-value").value;
        let mondayEndValue;
        if(!mondayEndValueByCol) {
          mondayEndValue = object.table.querySelector("tbody tr[data-row-name='monday'] td[data-value-key='end'][data-col-key='1'] .ds44-input-value").value;
        }
        else {
          mondayEndValue = mondayEndValueByCol;
        }
        if((tr.dataset.rowName !== "monday" || !mondayEndValueByCol) && !fieldTime.querySelector(".ds44-input-value").value) {
          MiscEvent.dispatch('field:' + this.getFieldName(fieldTime) + ':set', {value: mondayEndValue});
        }
      });
    });
  }

  getFieldName (element) {
    return (element.getAttribute('name') || element.getAttribute('data-name'));
  }

  remove(objectIndex) {
    const object = this.objects[objectIndex];
    if (!object) {
      return;
    }
    if(object.limit.min !== null && object.limit.min <= object.nbColonne-1) {
      object.element.querySelectorAll("*[data-col-key='" + object.nbColonne + "']").forEach((element) => {
        element.remove();
      });
      object.nbColonne -= 1;
    }

    if(object.limit.min !== null && object.limit.min > object.nbColonne-1) {
      this.disabledButtons(object,"remove");
    }
    if(object.limit.max !== null && object.limit.max >= object.nbColonne+1) {
      this.enabledButtons(object,"add");
    }
  }


  replaceValueTemplate(template, numCreneau = 2, day = null) {
    template = template.replace(/__CRENEAU_NUM__/gi, numCreneau);
    if(day) {
      template = template.replace(/__CRENEAU_DEB__/gi, "debcr"+numCreneau);
      template = template.replace(/__CRENEAU_FIN__/gi, "finbcr"+numCreneau);
      template = template.replace(/__DAY__/gi, day);
      template = template.replace(/__DAY_TEXT__/gi, MiscTranslate._(day));
    }
    return template;
  }

  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  }

  disabledButtons(object, type) {
    object.element.querySelectorAll("*[data-planning-action='"+type+"']").forEach((button) => {
      button.style.cursor = "default";
      button.classList.remove("ds44-btn--invert");
      button.setAttribute("disabled", "");
    });
  }

  enabledButtons(object, type) {
    object.element.querySelectorAll("*[data-planning-action='"+type+"']").forEach((button) => {
      button.style.cursor = "pointer";
      button.classList.add("ds44-btn--invert");
      button.removeAttribute("disabled");
    });
  }


}
// Singleton
var Planning = (function () {
  "use strict";
  var instance;
  function Singleton() {
    if (!instance) {
      instance = new PlanningClass();
    }
    instance.initialise();
  }
  Singleton.getInstance = function () {
    return instance || new Singleton();
  }
  return Singleton;
}());
new Planning();