class MiscTranslate {
    static getDictionnary () {
        let language = 'en';

        const htmlElement = document.querySelector('html');
        if (
            htmlElement &&
            htmlElement.getAttribute('lang') === 'fr'
        ) {
            language = 'fr';
        }

        return ({
            'fr': {
                'AROUND_ME': 'Autour de moi',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Veuillez renseigner : {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Veuillez cocher au moins un élément',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Veuillez télécharger un fichier à la bonne taille : {fieldName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Veuillez télécharger un fichier au bon format : {fieldName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Date invalide. Merci de respecter le format d’exemple',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'La date ne doit pas être inférieure à celle du champ précédent',
                'FIELD_VALID_EMAIL_MESSAGE': 'Email invalide. Merci de respecter le format d’un email',
                'FIELD_VALID_PHONE_MESSAGE': 'Numéro de téléphone invalide. Merci de respecter le format d’un numéro de téléphone',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Code postal invalide. Merci de respecter le format d’un code postal',
                'NO_RESULTS_FOUND': 'Aucun résultat trouvé',
                'USEFUL_REQUEST_THANK_YOU': 'Merci pour votre aide',
                'USEFUL_REQUEST_YES': 'Content que cette page vous ait été utile ! Merci.',
                'USEFUL_REQUEST_NO': 'Désolé que cette page ne vous ait pas été utile !\nNous faisons de notre mieux pour améliorer le contenu de ce site.',
                'LOADING': 'Chargement en cours',
                'SHOW': 'Afficher',
                'HIDE': 'Masquer',
                'MORE_RESULTS': 'Plus de résultats',
                'MORE_SEARCH_RESULTS': 'Plus de résultats sur votre recherche sur : ',
                'SEARCH_NB_RESULTS_OUT_OF': ' résultats affichés sur ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Voir le contenu précédent',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Voir le contenu suivant',
                'START': 'Démarrer',
                'STOP': 'Arrêter',
                'EXPAND': 'Déplier',
                'COLLAPSE': 'Replier',
                'MAP_FULLSCREEN': 'Afficher la carte en plein écran',
                'MAP_SHRINK': 'Sortir du mode plein écran de la carte',
                'MAP_ZOOM_IN': 'Augmenter la taille de la carte',
                'MAP_ZOOM_OUT': 'Diminuer la taille de la carte',
                'MAP_REORIENTATE': 'Repositionner la carte vers le nord',
                'RESULTS': 'résultats',
                'RESULT': 'résultat',
                'FORM_GENERAL_ERROR': 'Une erreur est survenue suite à l\'envoi de votre formulaire'
            },
            'en': {
                'AROUND_ME': 'Around me',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Please enter: {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Please check at least one box',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Please upload a file with a valid size: {fieldName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Please upload a file with a valid format: {fieldName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Invalid date format. Please enter a date with the same format than the example',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'The date should not be less than the one in the previous field',
                'FIELD_VALID_EMAIL_MESSAGE': 'Invalid email format. Please enter an email with a valid format',
                'FIELD_VALID_PHONE_MESSAGE': 'Invalid phone number format. Please enter a phone number with a valid format',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Invalid postcode format. Please enter a postcode with a valid format',
                'NO_RESULTS_FOUND': 'No results found',
                'USEFUL_REQUEST_THANK_YOU': 'Thank you for your help',
                'USEFUL_REQUEST_YES': 'Glad you found this page useful! Thank you.',
                'USEFUL_REQUEST_NO': 'Sorry that this page was not useful to you!\nWe are doing our best to improve the content of this site.',
                'LOADING': 'Loading',
                'SHOW': 'Show',
                'HIDE': 'Hide',
                'MORE_RESULTS': 'More results',
                'MORE_SEARCH_RESULTS': 'More results for your search: ',
                'SEARCH_NB_RESULTS_OUT_OF': ' results displayed out of ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Watch previous content',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Watch next content',
                'START': 'Start',
                'STOP': 'Stop',
                'EXPAND': 'Expand',
                'COLLAPSE': 'Collapse',
                'MAP_FULLSCREEN': 'Display the map in full screen',
                'MAP_SHRINK': 'Exit full screen mode of the map',
                'MAP_ZOOM_IN': 'Increase the size of the map',
                'MAP_ZOOM_OUT': 'Decrease the size of the map',
                'MAP_REORIENTATE': 'Reposition the map to the north',
                'RESULTS': 'results',
                'RESULT': 'result',
                'FORM_GENERAL_ERROR': 'An error occurred following the submission of your form'
            }
        })[language];
    }

    static _ (input) {
        const translation = MiscTranslate.getDictionnary()[input];
        if (translation) {
            return translation.replace('\n', '<br>');
        }

        console.log('Translation missing for: ' + input)
        return input;
    }
}
