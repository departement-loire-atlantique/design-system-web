class TooltipStandard {
    constructor () {
        this.TOOLTIP_SIMPLE = 'js-simple-tooltip';
        this.TOOLTIP_SIMPLE_CONTAINER = 'simpletooltip_container';
        this.TOOLTIP_SIMPLE_RAW = 'simpletooltip';
        this.TOOLTIP_SIMPLE_LABEL_ID = 'label_simpletooltip_';
        this.TOOLTIP_DATA_TEXT = 'data-simpletooltip-text';
        this.TOOLTIP_DATA_PREFIX_CLASS = 'data-simpletooltip-prefix-class';
        this.TOOLTIP_DATA_CONTENT_ID = 'data-simpletooltip-content-id';
        this.ATTR_DESCRIBEDBY = 'aria-describedby';
        this.ATTR_ROLE = 'role';
        this.ROLE = 'tooltip';
        this.DATA_HASH_ID = 'data-hashtooltip-id';

        // Create tooltips
        document
            .querySelectorAll('.' + this.TOOLTIP_SIMPLE)
            .forEach(this.create.bind(this));

        // Bind events
        ['mouseenter', 'focus', 'mouseleave', 'blur']
            .forEach(eventType => {
                document.body.addEventListener(eventType, this.showHide.bind(this), true);
            });
        MiscEvent.addListener('keyDown:escape', this.hideAll.bind(this));
    }

    create (element) {
        const hashId = Math.random().toString(32).slice(2, 12);
        const prefixClassName = MiscDom.getAttribute(element, this.TOOLTIP_DATA_PREFIX_CLASS);
        const contentId = MiscDom.getAttribute(element, this.TOOLTIP_DATA_CONTENT_ID);

        // Set tooltip attributes
        element.setAttribute(this.DATA_HASH_ID, hashId);
        element.setAttribute(this.ATTR_DESCRIBEDBY, this.TOOLTIP_SIMPLE_LABEL_ID + hashId);

        // Put the tooltip in a wrapper
        const wrapperClassName = [prefixClassName, this.TOOLTIP_SIMPLE_CONTAINER].filter(Boolean).join('-');
        const wrapper = document.createElement('span');
        MiscDom.addClasses(wrapper, wrapperClassName);
        wrapper.setAttribute(this.DATA_HASH_ID, hashId);
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);

        // Determine the tooltip bubble content
        let content = MiscDom.getAttribute(element, this.TOOLTIP_DATA_TEXT);
        if (!content && contentId) {
            const contentFromId = document.getElementById(contentId);
            if (contentFromId) {
                content = contentFromId.innerHTML;
            }
        }

        // Create tooltip bubble
        const bubbleClassName = [prefixClassName, this.TOOLTIP_SIMPLE_RAW].filter(Boolean).join('-');
        const bubble = document.createElement('span');
        bubble.setAttribute('id', this.TOOLTIP_SIMPLE_LABEL_ID + hashId);
        MiscDom.addClasses(bubble, [bubbleClassName, this.TOOLTIP_SIMPLE]);
        bubble.setAttribute(this.ATTR_ROLE, this.ROLE);
        MiscAccessibility.hide(bubble, true);
        bubble.setAttribute(this.DATA_HASH_ID, hashId);
        bubble.innerHTML = content;

        wrapper.appendChild(bubble);
    }

    showHide (evt) {
        const element = evt.target;

        // Determine the tooltip button and its corresponding event types
        let tooltipButton = null;
        let showEventType = null;
        let hideEventType = null;
        if (MiscDom.hasClass(element, this.TOOLTIP_SIMPLE) === true) {
            tooltipButton = element;
            showEventType = 'focus';
            hideEventType = 'blur';
        } else if (MiscDom.hasClass(element, this.TOOLTIP_SIMPLE_CONTAINER) === true) {
            tooltipButton = element.querySelector('[' + this.ATTR_DESCRIBEDBY + ']');
            showEventType = 'mouseenter';
            hideEventType = 'mouseleave';
        }
        if (!tooltipButton) {
            return;
        }

        // Get the corresponding tooltip bubble
        const tooltipBubble = document.getElementById(MiscDom.getAttribute(tooltipButton, this.ATTR_DESCRIBEDBY));
        if (!tooltipBubble) {
            return;
        }

        if (evt.type === showEventType) {
            // Show tooltip bubble
            MiscAccessibility.show(tooltipBubble, true);

            // Remove positioning
            MiscDom.removeClasses(tooltipBubble, ['bottom', 'left']);
            tooltipBubble.style.width = '';

            // Determine positioning
            const tooltipBubbleOffset = MiscDom.getOffset(tooltipBubble);
            if (tooltipBubbleOffset.top < 10) {
                // Put it below if not enough room above
                MiscDom.addClasses(tooltipBubble, 'bottom');
            }
            if ((tooltipBubbleOffset.left + tooltipBubble.offsetWidth) > (window.innerWidth - 10)) {
                // Put it on the left if not enough room on the right
                MiscDom.addClasses(tooltipBubble, 'left');

                // If there's not enough room on the left hand side, crop the width
                if (tooltipBubble.offsetWidth > tooltipBubbleOffset.left) {
                    tooltipBubble.style.width = (tooltipBubbleOffset.left + 40) + 'px';
                }
            }
        } else if (evt.type === hideEventType) {
            // Hide tooltip bubble
            MiscAccessibility.hide(tooltipBubble, true);
        }
    }

    hideAll () {
        document
            .querySelectorAll('.' + this.TOOLTIP_SIMPLE + '.' + this.TOOLTIP_SIMPLE_RAW)
            .forEach((tooltipBubble) => {
                // Hide tooltip bubble
                MiscAccessibility.hide(tooltipBubble, true);
            })
    }
}

// Singleton
new TooltipStandard();
