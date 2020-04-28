class VideoYoutube {
    constructor () {
        this.objects = [];

        let hasVideos = false;
        document
            .querySelectorAll('.ds44-js-youtube-video')
            .forEach((videoElement) => {
                hasVideos = true;
                this.create(videoElement);
            });
        document
            .querySelectorAll('.ds44-js-video-seek-to')
            .forEach((seekToElement) => {
                MiscEvent.addListener('click', this.seekTo.bind(this), seekToElement);
            });

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
                videoId: object.id
            });
        }
    }

    seekTo (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const seekToElement = evt.currentTarget;
        const videoId = seekToElement.getAttribute('data-video-id');
        const seconds = seekToElement.getAttribute('data-seek-to');

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            if(object.id !== videoId) {
                continue;
            }

            object.player.seekTo(seconds, true);
            object.player.playVideo();

            break;
        }
    }
}

// Singleton
new VideoYoutube();
