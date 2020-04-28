class FormFieldInputFile extends FormFieldInputAbstract {
    constructor () {
        super(
            'input[type="file"]',
            'inputFile'
        );

        this.fileSizeMax = 10; // MB
        this.mimeTypeByFileExtensions = {
            'aac': 'audio/aac',
            'abw': 'application/x-abiword',
            'arc': 'application/octet-stream',
            'avi': 'video/x-msvideo',
            'azw': 'application/vnd.amazon.ebook',
            'bin': 'application/octet-stream',
            'bz': 'application/x-bzip',
            'bz2': 'application/x-bzip2',
            'csh': 'application/x-csh',
            'css': 'text/css',
            'csv': 'text/csv',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'eot': 'application/vnd.ms-fontobject',
            'epub': 'application/epub+zip',
            'gif': 'image/gif',
            'htm': 'text/html',
            'html': 'text/html',
            'ico': 'image/x-icon',
            'ics': 'text/calendar',
            'jar': 'application/java-archive',
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'js': 'application/javascript',
            'json': 'application/json',
            'mid': 'audio/midi',
            'midi': 'audio/midi',
            'mpeg': 'video/mpeg',
            'mpkg': 'application/vnd.apple.installer+xml',
            'odp': 'application/vnd.oasis.opendocument.presentation',
            'ods': 'application/vnd.oasis.opendocument.spreadsheet',
            'odt': 'application/vnd.oasis.opendocument.text',
            'oga': 'audio/ogg',
            'ogv': 'video/ogg',
            'ogx': 'application/ogg',
            'otf': 'font/otf',
            'png': 'image/png',
            'pdf': 'application/pdf',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'rar': 'application/x-rar-compressed',
            'rtf': 'application/rtf',
            'sh': 'application/x-sh',
            'svg': 'image/svg+xml',
            'swf': 'application/x-shockwave-flash',
            'tar': 'application/x-tar',
            'tif': 'image/tiff',
            'tiff': 'image/tiff',
            'ts': 'application/typescript',
            'ttf': 'font/ttf',
            'vsd': 'application/vnd.visio',
            'wav': 'audio/x-wav',
            'weba': 'audio/webm',
            'webm': 'video/webm',
            'webp': 'image/webp',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'xhtml': 'application/xhtml+xml',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xml': 'application/xml',
            'xul': 'application/vnd.mozilla.xul+xml',
            'zip': 'application/zip',
            '7z': 'application/x-7z-compressed'
        }
    }

    create (element) {
        super.create(element);

        const objectIndex = (this.objects.length - 1);
        const object = this.objects[objectIndex];

        object.textElement = MiscDom.getNextSibling(element, '.ds44-fileDisplay');
        object.labelElement = MiscDom.getPreviousSibling(element.parentNode, 'label');
        object.resetButtonElement = MiscDom.getNextSibling(element.parentNode, '.ds44-reset');
        object.fileExtensions = element.getAttribute('data-file-extensions');
    }

    initialize () {
        super.initialize();

        for (let objectIndex = 0; objectIndex < this.objects.length; objectIndex++) {
            const object = this.objects[objectIndex];

            object.inputElements.forEach((inputElement) => {
                MiscEvent.addListener('change', this.fileUploaded.bind(this, objectIndex), inputElement);
                MiscEvent.addListener('focus', this.focus.bind(this, objectIndex), inputElement);
                MiscEvent.addListener('blur', this.blur.bind(this, objectIndex), inputElement);
            });
        }
    }

    fileUploaded (objectIndex, evt) {
        const object = this.objects[objectIndex];

        // Get file
        const file = evt.currentTarget.files[0];
        if (!file) {
            return;
        }

        if(this.checkValidity(objectIndex)) {
            // Success
            object.textElement.innerText = file.name;
            const textElementId = object.textElement.getAttribute('id');
            const ariaDescribedBy = object.valueElement.getAttribute('aria-describedby').split(' ');
            if(!ariaDescribedBy.includes(textElementId)) {
                ariaDescribedBy.push(textElementId);
                object.valueElement.setAttribute('aria-describedby', ariaDescribedBy.join(' '));
            }

            this.showNotEmpty(objectIndex);
            this.focus(objectIndex);
        }
    }

    focus (objectIndex) {
        const object = this.objects[objectIndex];
        const shapeElement = object.textElement.closest('.ds44-file__shape');
        if (shapeElement) {
            shapeElement.classList.add('hover');
        }

        super.focus(objectIndex);
    }

    blur (objectIndex) {
        const object = this.objects[objectIndex];
        const shapeElement = object.textElement.closest('.ds44-file__shape');
        if (shapeElement) {
            shapeElement.classList.remove('hover');
        }

        super.blur(objectIndex);
    }

    empty (objectIndex) {
        super.empty(objectIndex);

        const object = this.objects[objectIndex];
        const textElementId = object.textElement.getAttribute('id');
        const ariaDescribedBy = object.valueElement.getAttribute('aria-describedby').split(' ');
        if(ariaDescribedBy.includes(textElementId)) {
            ariaDescribedBy.splice(ariaDescribedBy.indexOf(textElementId), 1);
            object.valueElement.setAttribute('aria-describedby', ariaDescribedBy.join(' '));
        }

        this.blur(objectIndex);
    }

    set (objectIndex, data) {
        // Can't set a file input
    }

    setData (objectIndex, data = null) {
        super.setData(objectIndex, data);

        const object = this.objects[objectIndex];
        if (!object.textElement) {
            return;
        }

        object.textElement.innerText = ((data && data.text) ? data.text : null);
    }

    getData (objectIndex) {
        let data = super.getData(objectIndex);
        if (!data) {
            return null;
        }

        const object = this.objects[objectIndex];
        const extendedData = {};
        extendedData[object.name] = {
            'name': object.textElement.innerText
        };

        return MiscUtils.merge(data, extendedData);
    }

    getText (objectIndex) {
        const object = this.objects[objectIndex];
        if (
            !object.textElement ||
            !object.textElement.innerText
        ) {
            return null;
        }

        return object.textElement.innerText;
    }

    invalid (objectIndex) {
        super.invalid(objectIndex);

        this.empty(objectIndex);
    }

    checkFormat (objectIndex) {
        return (
            this.hasCorrectSize(objectIndex) &&
            this.hasCorrectMime(objectIndex)
        );
    }

    getErrorMessage (objectIndex) {
        if (!this.hasCorrectSize(objectIndex)) {
            return MiscTranslate._('FIELD_VALID_SIZE_ERROR_MESSAGE');
        }
        if (!this.hasCorrectMime(objectIndex)) {
            return MiscTranslate._('FIELD_VALID_FORMAT_ERROR_MESSAGE');
        }

        return super.getErrorMessage(objectIndex);
    }

    hasCorrectSize (objectIndex) {
        const object = this.objects[objectIndex];

        // Get file
        const file = object.inputElements[0].files[0];
        if (!file) {
            return true;
        }

        // Check size
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > this.fileSizeMax) {
            return false;
        }

        return true;
    }

    hasCorrectMime (objectIndex) {
        const object = this.objects[objectIndex];
        if (!object.fileExtensions) {
            return true;
        }

        // Get file
        const file = object.inputElements[0].files[0];
        if (!file) {
            return true;
        }

        // Check mime
        const validFileExtensions = object.fileExtensions.replace(', ', ',').split(',');
        for (let i = 0; i < validFileExtensions.length; i++) {
            const validFileExtension = validFileExtensions[i];

            if (this.mimeTypeByFileExtensions[validFileExtension] === file.type) {
                return true;
            }
        }

        return false;
    }
}

// Singleton
new FormFieldInputFile();
