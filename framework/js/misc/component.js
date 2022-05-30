class MiscComponent {

  static checkAndCreate(element, componentName)
  {
    if(!MiscComponent.isInit(element, componentName))
    {
      MiscComponent.create(element, componentName);
      return true;
    }
    return false;
  }

  static isInit(element, componentName)
  {
    return element.hasAttribute("data-component-"+componentName+"-uuid");
  }

  static create(element, componentName)
  {
    element.setAttribute("data-component-"+componentName+"-uuid", Uuid.generate());
  }



}