class MiscUtils {
    static getPositionY (element) {
        let yPosition = 0;

        while (element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return yPosition;
    }

    static generateId () {
        return 'id' + Math.random().toString(36).substring(2, 15);
    }

    static isInDevMode () {
        return (document.location.hostname === 'localhost');
    }

    static merge (obj) {
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
            if (source) {
                for (const prop in source) {
                    if (
                        source[prop] &&
                        source[prop].constructor === Object
                    ) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            MiscUtils.merge(obj[prop], source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        });
        return obj;
    }

    static scrollTo (destination, duration = 400, easing = 'linear', callback) {
        const easings = {
            linear (t) {
                return t;
            },
            easeInQuad (t) {
                return t * t;
            },
            easeOutQuad (t) {
                return t * (2 - t);
            },
            easeInOutQuad (t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic (t) {
                return t * t * t;
            },
            easeOutCubic (t) {
                return (--t) * t * t + 1;
            },
            easeInOutCubic (t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart (t) {
                return t * t * t * t;
            },
            easeOutQuart (t) {
                return 1 - (--t) * t * t * t;
            },
            easeInOutQuart (t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            },
            easeInQuint (t) {
                return t * t * t * t * t;
            },
            easeOutQuint (t) {
                return 1 + (--t) * t * t * t * t;
            },
            easeInOutQuint (t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
            }
        };

        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            return;
        }

        function scroll () {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            var scrollValue = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);
            window.scroll(0, scrollValue);

        if (Math.round(window.pageYOffset) === destinationOffsetToScroll || scrollValue === destinationOffsetToScroll ) {
                if (callback) {
                    callback();
                }
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    }

    static getScrollTop () {
        return (document.documentElement.scrollTop || document.body.scrollTop);
    }

    static async digestMessage (message) {
        if (window.crypto.subtle) {
            const msgUint8 = new TextEncoder().encode(message);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        let hash = 0;
        if (message.length == 0) {
            return hash;
        }
        for (let i = 0; i < message.length; i++) {
            const char = message.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return hash;
    }
}
