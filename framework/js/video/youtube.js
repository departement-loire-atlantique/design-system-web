class VideoYoutube {
    constructor () {
        this.objects = [];

        let hasVideos = false;
        document
            .querySelectorAll('.ds44-js-youtube-video')
            .forEach((videoElement) => {
                if(MiscComponent.checkAndCreate(videoElement, "youtube")) {
                    hasVideos = true;
                    this.create(videoElement);
                }
            });
        document
            .querySelectorAll('.ds44-js-video-seek-to')
            .forEach((seekToElement) => {
                MiscEvent.addListener('click', this.seekTo.bind(this), seekToElement);
            });
        MiscEvent.addListener('keyPress:spacebar', this.selectSeekTo.bind(this));

        if (hasVideos) {
            window.onYouTubeIframeAPIReady = this.load.bind(this);

            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', 'https://www.youtube.com/iframe_api');
            scriptElement.setAttribute('type', 'text/javascript');
            document.head.appendChild(scriptElement);
        }
    }

    create (videoElement) {
        const object = {
            'id': videoElement.getAttribute('data-video-id'),
            'videoElement': videoElement
        };
        this.objects.push(object);
    }

    load () {
        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            object.videoElement.innerHTML = '<div class="ds44-video-container"><div class="ds44-video-item"></div></div>';

            object.player = new YT.Player(object.videoElement.querySelector('.ds44-video-item'), {
                width: null,
                height: null,
                videoId: object.id,
                playerVars: {
                    showinfo: 0,
                    rel: 0
                }
            });
        }
    }

    selectSeekTo (evt) {
        if (
            !document.activeElement ||
            !document.activeElement.closest('.ds44-js-video-seek-to')
        ) {
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();

        this.seekTo({
            currentTarget: document.activeElement.closest('.ds44-js-video-seek-to')
        });
    }

    seekTo (evt) {
        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        }

        const currentSeekToElement = document.querySelector('.ds44-js-video-seek-to[aria-current]');
        if (currentSeekToElement) {
            currentSeekToElement.removeAttribute('aria-current');
        }

        const seekToElement = evt.currentTarget;
        seekToElement.setAttribute('aria-current', 'true');
        const videoId = seekToElement.getAttribute('data-video-id');
        const seconds = seekToElement.getAttribute('data-seek-to');

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            if (object.id !== videoId) {
                continue;
            }

            object.player.seekTo(seconds, true);
            object.player.playVideo();

            const playerElement = object.videoElement.querySelector('.ds44-video-item');
            MiscAccessibility.setFocus(playerElement);
            MiscUtils.scrollTo(MiscUtils.getPositionY(playerElement) - MiscDom.getHeaderHeight(true));

            break;
        }
    }
}

// Singleton
new VideoYoutube();
