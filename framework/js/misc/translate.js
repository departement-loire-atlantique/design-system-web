class MiscTranslate {
    static getLanguage () {
        const htmlElement = document.querySelector('html');
        if (
            htmlElement &&
            htmlElement.getAttribute('lang') === 'fr'
        ) {
            return 'fr';
        }

        return 'en';
    }

    static getDictionnary () {
        return ({
            'fr': {
                'AROUND_ME': 'Autour de moi',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Veuillez renseigner : {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Veuillez cocher au moins un élément',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Merci de télécharger un fichier moins lourd pour : {fileName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Merci de télécharger un fichier au bon format pour : {fileName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Date invalide. Merci de respecter le format d’exemple',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'La date ne doit pas être inférieure à celle du champ précédent',
                'FIELD_PAST_DATE_ERROR_MESSAGE': 'La date ne doit pas être dans le passé',
                'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE': 'La date ne doit pas être supérieure à un an',
                'FIELD_VALID_EMAIL_MESSAGE': 'Email invalide. Merci de respecter le format d’un email',
                'FIELD_VALID_PHONE_MESSAGE': 'Numéro de téléphone invalide. Merci de respecter le format d’un numéro de téléphone',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Code postal invalide. Merci de respecter le format d’un code postal',
                'FIELD_VALID_NUMBER_MESSAGE': 'Nombre invalide. Merci de respecter le format d’un nombre entier',
                'NO_RESULTS_FOUND': 'Aucun résultat trouvé',
                'LOADING': 'Chargement en cours',
                'SHOW': 'Afficher',
                'HIDE': 'Masquer',
                'MORE_RESULTS': 'Plus de résultats',
                'MORE_SEARCH_RESULTS:': 'Plus de résultats sur votre recherche sur : ',
                'SEARCH_NB_RESULTS_OUT_OF': ' résultats affichés sur ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Voir le contenu précédent',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Voir le contenu suivant',
                'START': 'Démarrer',
                'STOP': 'Arrêter',
                'EXPAND': 'Déplier',
                'COLLAPSE': 'Replier',
                'MAP_CANVAS': 'Carte interactive dans laquelle vous pouvez vous déplacer en utilisant les flèches de direction de votre clavier',
                'MAP_LOGO': 'Accéder à Mapbox - nouvelle fenêtre',
                'MAP_IMPROVE': 'Améliorer cette carte',
                'MAP_IMPROVE_NEW_WINDOW': 'Améliorer cette carte - nouvelle fenêtre',
                'MAP_FULLSCREEN': 'Afficher la carte en plein écran',
                'MAP_SHRINK': 'Sortir du mode plein écran de la carte',
                'MAP_ZOOM_IN': 'Augmenter la taille de la carte',
                'MAP_ZOOM_OUT': 'Diminuer la taille de la carte',
                'MAP_REORIENTATE': 'Repositionner la carte vers le nord',
                'RESULTS': 'résultats',
                'RESULT': 'résultat',
                'NO_RESULTS_FOR_SEARCH:': 'Il n\'y a aucun résultat pour la recherche sur :',
                'NO_RESULTS_NEW_SEARCH': 'Merci d\'effectuer une nouvelle recherche',
                'NB_RESULTS_FOR_SEARCH:': 'pour la recherche sur :',
                'EMPTY_SEARCH_CRITERIA': 'aucun critère',
                'RESULTS_MAX_RESULTS': 'Il y a un trop grand nombre de résultats correspondant à votre recherche. Vous trouverez ci-dessous les {maxNbResults} plus pertinents. N’hésitez pas à affiner vos critères de recherche.',
                'NEW_WINDOW': 'nouvelle fenêtre',
                'TOS_OF': 'Conditions d’utilisation de',
                'FOOD_OBLIGATION_PER_MONTH': '€ par mois pour votre obligé alimentaire n°',
                'FOOD_OBLIGATION_TOTAL': 'L\'estimation de la capacité contributive mensuelle de l\'ensemble de vos obligés alimentaires s\'élève à {totalFoodObligation} €.',
                'SUGGESTIONS': '{nbResults} suggestion(s) disponible(s) - utiliser les flèches bas et haut ou tabulation pour naviguer dans la liste',
                'NO_SUGGESTIONS': 'Aucun résultats sur {search}',
                'FIELD_PASSWORD_VIEW': "Afficher le mot de passe",
                'FIELD_PASSWORD_NOT_VIEW': "Cacher le mot de passe",
                'WEBCAM_ENABLED': "Activer la webcam",
                'WEBCAM_DISABLED': "Désactiver la webcam",
            },
            'en': {
                'AROUND_ME': 'Around me',
                'FIELD_MANDATORY_ERROR_MESSAGE': 'Please enter: {fieldName}',
                'FIELD_BOX_MANDATORY_ERROR_MESSAGE': 'Please check at least one box',
                'FIELD_VALID_SIZE_ERROR_MESSAGE': 'Please upload a smaller file for: {fileName}',
                'FIELD_VALID_FORMAT_ERROR_MESSAGE': 'Please upload a file with a valid format for: {fileName}',
                'FIELD_VALID_DATE_FORMAT_ERROR_MESSAGE': 'Invalid date format. Please enter a date with the same format than the example',
                'FIELD_VALID_CHRONOLOGY_ERROR_MESSAGE': 'The date should not be less than the one in the previous field',
                'FIELD_PAST_DATE_ERROR_MESSAGE': 'The date should not be in the past',
                'FIELD_NEXT_YEAR_DATE_ERROR_MESSAGE': 'The date should not be later than in a year',
                'FIELD_VALID_EMAIL_MESSAGE': 'Invalid email format. Please enter an email with a valid format',
                'FIELD_VALID_PHONE_MESSAGE': 'Invalid phone number format. Please enter a phone number with a valid format',
                'FIELD_VALID_POSTCODE_MESSAGE': 'Invalid postcode format. Please enter a postcode with a valid format',
                'FIELD_VALID_NUMBER_MESSAGE': 'Invalid number format. Please enter a number with a valid format',
                'NO_RESULTS_FOUND': 'No results found',
                'LOADING': 'Loading',
                'SHOW': 'Show',
                'HIDE': 'Hide',
                'MORE_RESULTS': 'More results',
                'MORE_SEARCH_RESULTS:': 'More results for your search: ',
                'SEARCH_NB_RESULTS_OUT_OF': ' results displayed out of ',
                'CAROUSEL_WATCH_PREVIOUS_CONTENT': 'Watch previous content',
                'CAROUSEL_WATCH_NEXT_CONTENT': 'Watch next content',
                'START': 'Start',
                'STOP': 'Stop',
                'EXPAND': 'Expand',
                'COLLAPSE': 'Collapse',
                'MAP_CANVAS': 'Interactive map in which you can move using the arrow keys on your keyboard',
                'MAP_LOGO': 'Go to Mapbox - new window',
                'MAP_IMPROVE': 'Improve this map',
                'MAP_IMPROVE_NEW_WINDOW': 'Improve this map - new window',
                'MAP_FULLSCREEN': 'Display the map in full screen',
                'MAP_SHRINK': 'Exit full screen mode of the map',
                'MAP_ZOOM_IN': 'Increase the size of the map',
                'MAP_ZOOM_OUT': 'Decrease the size of the map',
                'MAP_REORIENTATE': 'Reposition the map to the north',
                'RESULTS': 'results',
                'RESULT': 'result',
                'NO_RESULTS_FOR_SEARCH:': 'There are no results for the search on:',
                'NO_RESULTS_NEW_SEARCH': 'Please make another search',
                'NB_RESULTS_FOR_SEARCH:': 'for the search on:',
                'EMPTY_SEARCH_CRITERIA': 'no criteria',
                'RESULTS_MAX_RESULTS': 'There are too many results matching your search. Below are the {maxNbResults} most relevant. Do not hesitate to refine your search criteria.',
                'NEW_WINDOW': 'new window',
                'TOS_OF': 'Terms of service of',
                'FOOD_OBLIGATION_PER_MONTH': '€ per month for your food obligation no.',
                'FOOD_OBLIGATION_TOTAL': 'The estimate of the monthly contributory capacity of all your food obligations is {totalFoodObligation} €.',
                'SUGGESTIONS': '{nbResults} suggestion(s) available - use up and down arrows or tab to navigate in the list',
                'NO_SUGGESTIONS': 'No results for {search}',
                'FIELD_PASSWORD_VIEW': "View password",
                'FIELD_PASSWORD_NOT_VIEW': "Hide password",
                'WEBCAM_ENABLED': "Enable the webcam",
                'WEBCAM_DISABLED': "Disable the webcam",
            }
        })[MiscTranslate.getLanguage()];
    }

    static _ (input, patterns) {
        let translation = MiscTranslate.getDictionnary()[input];
        if (translation) {
            if (patterns) {
                for (const patternKey in patterns) {
                    if (!patterns.hasOwnProperty(patternKey)) {
                        continue;
                    }

                    translation = translation.replace('{' + patternKey + '}', patterns[patternKey]);
                }
            }
            return translation.replace('\n', '<br>');
        }

        console.log('Translation missing for: ' + input)
        return input;
    }
}
