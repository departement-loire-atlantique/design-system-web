class TabAbstract {
    constructor (className, selector) {
        this.className = className;
        this.selector = selector;
        Debug.log(this.className+" -> Constructor");
    }

    initialise() {
        Debug.log(this.className+" -> Initialise");
        document
          .querySelectorAll(this.selector)
          .forEach((containerElement) => {
              if(MiscComponent.checkAndCreate(containerElement, "tab")) {
                  MiscEvent.addListener('keyDown:shiftTab', this.goBackToTab.bind(this, this.selector));
                  this.create(containerElement);
                  MiscEvent.addListener("resize", this.refresh.bind(this, containerElement), window);
              }
          });
    }

    getHrefFromElement (element) {
        return element.getAttribute('data-href') || element.getAttribute('href');
    }

    create (containerElement) {


        const isTabsCollapseMobile = containerElement.hasAttribute("data-tabs-collapse-mobile");
        containerElement
            .querySelectorAll('.js-tablist__link')
            .forEach((tabHandleElement) => {
                const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
                const tabPanel = document.querySelector(tabHref);
                if (
                    !tabPanel ||
                    !tabPanel.children.length
                ) {
                    return;
                }

                MiscEvent.addListener('click', this.change.bind(this), tabHandleElement);

                const tabPanelExitElement = tabPanel.querySelector('.ds44-keyboard-show:last-child');
                if (tabPanelExitElement) {
                    MiscEvent.addListener('click', this.back.bind(this), tabPanelExitElement);
                }

                if(isTabsCollapseMobile) {
                    const tabPanelMobile = document.createElement("div");
                    tabPanelMobile.classList.add("ds44-tabs__content_mobile");
                    tabPanelMobile.setAttribute("id", tabHref.replace("#", "")+"_mobile");
                    tabPanelMobile.innerHTML = tabPanel.innerHTML;
                    tabPanelMobile.style.display = "none";
                    tabPanelMobile.style.opacity = 0;
                    tabHandleElement.parentNode.insertBefore(tabPanelMobile, tabHandleElement.nextSibling);
                }

            });

        let selectedTabHandle = null;
        const tabHref = this.getTabFromHref(document.location.href);
        const selectedTabHandleFromUrl = containerElement.querySelector('.js-tablist__link[href="' + tabHref + '"]');
        if (selectedTabHandleFromUrl) {
            selectedTabHandle = selectedTabHandleFromUrl;
        } else {
            const selectedTabHandleFromDom = containerElement.querySelector('.js-tablist__link[aria-current]');
            if (selectedTabHandleFromDom) {
                selectedTabHandle = selectedTabHandleFromDom;
            } else {
                selectedTabHandle = this.getDefaultTabHandle(containerElement);
            }
        }
        if (selectedTabHandle && !MiscUtils.isMobileSize()) {
            MiscEvent.dispatch("click", {init: true}, selectedTabHandle);
        }

    }

    getDefaultTabHandle (containerElement) {
        return containerElement.querySelector('.js-tablist__link');
    }

    change (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const scrollTarget = evt.detail.init === undefined;
        const tabHandleElement = evt.currentTarget;

        const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElement));
        const tabPanel = document.querySelector(tabHref);
        if (!tabPanel) {
            return;
        }

        const tabPanelMobile = document.querySelector(tabHref+"_mobile");
        if(tabPanelMobile && MiscUtils.isMobileSize())
        {
            this.changeTab(tabHandleElement, tabPanelMobile, false);
        }
        else if(!tabHandleElement.classList.contains('ds44-tabs__linkSelected'))
        {
            this.changeTab(tabHandleElement, tabPanel, scrollTarget);
        }
    }

    refresh(containerElement) {
        const isTabsCollapseMobile = containerElement.hasAttribute("data-tabs-collapse-mobile");
        if(isTabsCollapseMobile) {
            let tabHandleElement = containerElement.querySelector(".ds44-tabs__linkSelected");
            if(tabHandleElement)
            {
                let tabPanelMobile = containerElement.querySelector(tabHandleElement.getAttribute("href")+"_mobile");
                let tabPanel = containerElement.querySelector(tabHandleElement.getAttribute("href"));
                if(MiscUtils.isMobileSize())
                {
                    if(!tabPanelMobile.classList.contains("current"))
                    {
                        this.hideTab(tabHandleElement, tabPanel);
                        this.showTab(tabHandleElement, tabPanelMobile, false);
                    }
                }
                else
                {
                    if(!tabPanel.classList.contains("current"))
                    {
                        this.hideTab(tabHandleElement, tabPanelMobile);
                        this.showTab(tabHandleElement, tabPanel, false);
                    }
                }
            }
        }
    }


    changeTab (tabHandleElement, tabPanel, scrollTarget = true) {
        if(!MiscUtils.isMobileSize())
        {
            // Hide others
            tabHandleElement
              .closest('.js-tabs')
              .querySelectorAll('.js-tablist__link')
              .forEach((tabHandleElementRemove) => {
                  const tabHref = this.getTabFromHref(this.getHrefFromElement(tabHandleElementRemove));
                  const tabPanel = document.querySelector(tabHref);
                  if (!tabPanel) {
                      return;
                  }
                  tabHandleElementRemove.classList.remove('ds44-tabs__linkSelected');
                  tabHandleElementRemove.setAttribute('aria-disabled', 'true');
                  tabHandleElementRemove.removeAttribute('aria-current');
                  this.hideTab(tabHandleElementRemove, tabPanel);
                  MiscAccessibility.hide(tabPanel);
              });
        }
        if(MiscUtils.isMobileSize() && tabHandleElement.classList.contains("ds44-tabs__linkSelected"))
        {
            tabHandleElement.classList.remove('ds44-tabs__linkSelected');
            tabHandleElement.removeAttribute('aria-current');
            this.hideTab(tabHandleElement, tabPanel);
            MiscAccessibility.hide(tabPanel);
        }
        else
        {
            const tabsElement = tabPanel.parentElement;
            tabsElement.style.height = tabsElement.offsetHeight + 'px';
            // Show selected tab
            tabHandleElement.classList.add('ds44-tabs__linkSelected');
            tabHandleElement.setAttribute('aria-current', 'true');
            this.showTab(tabHandleElement, tabPanel, scrollTarget);
            MiscAccessibility.show(tabPanel);
        }
    }

    showTab (tabHandleElement, tabPanel, scrollTarget = true) {
        window.setTimeout(this.showTabCallback.bind(this, tabHandleElement, tabPanel, scrollTarget), 300);
    }

    showTabCallback (tabHandleElement, tabPanel, scrollTarget = true) {
        tabPanel.style.opacity = 1;
        tabPanel.style.display = 'block';

        const tabsElement = tabPanel.parentElement;
        tabsElement.style.height = null;

        const h2Element = tabPanel.querySelector('h2.visually-hidden');
        if (h2Element) {
            MiscAccessibility.setFocus(h2Element);
        }
        tabPanel.classList.add('current');
        if(scrollTarget) {
            let target = tabHandleElement.getAttribute("href");
            if(tabPanel.classList.contains("ds44-tabs__content_mobile"))
            {
                target = target+"_mobile";
            }
            MiscEvent.dispatch("scroll.element", {target: target}, tabHandleElement);
        }
    }

    hideTab (tabHandleElement, tabPanel) {
        tabPanel.style.opacity = 0;
        tabPanel.classList.remove('current');

        window.setTimeout(this.hideTabCallback.bind(this, tabHandleElement, tabPanel), 150);
    }

    hideTabCallback (tabHandleElement, tabPanel) {
        tabPanel.style.display = 'none';
    }

    back (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const tabHandleHref = this.getHrefFromElement(evt.currentTarget.firstElementChild);
        const currentTabHandle = document.querySelector(
            '.js-tablist__link.ds44-tabs__linkSelected' + tabHandleHref + ', ' +
            '.js-tablist__link.ds44-tabs__linkSelected[href="' + tabHandleHref + '"], ' +
            '.js-tablist__link.ds44-tabs__linkSelected[data-href="' + tabHandleHref + '"]'
        );
        if (!currentTabHandle) {
            return;
        }

        MiscAccessibility.setFocus(currentTabHandle);
        window.scrollTo(0, MiscUtils.getPositionY(currentTabHandle) - MiscDom.getHeaderHeight(true))
    }

    goBackToTab (selector, evt) {
        if (
            !document.activeElement ||
            !document.activeElement.closest('h2.visually-hidden') ||
            !document.activeElement.closest('.ds44-tabs').querySelector(selector)
        ) {
            return;
        }

        const linkSelectedElement = document.activeElement.closest('.ds44-tabs').querySelector(selector + ' .ds44-tabs__linkSelected');
        if (linkSelectedElement) {
            MiscAccessibility.setFocus(linkSelectedElement);
        }
    }

    getTabFromHref (href) {
        if (href.indexOf('#') !== -1) {
            return href.slice(href.indexOf('#'));
        }

        return '#';
    }
}
