# Design System

<a href="https://travis-ci.org/departement-loire-atlantique/design-system-web">
<img src="https://travis-ci.org/departement-loire-atlantique/design-system-web.svg?branch=master" />
</a>

Le design system est divisé en deux parties : la documentation et le framework CSS/JS.

La documentation s'appuie sur un site Jekyll avec un outillage en Ruby.
Elle est disponible à cette adresse : https://design.loire-atlantique.fr

Le framework s'appuie sur SCSS avec un outillage en NodeJS.

## Contribution

Récupérer le code du projet : `git clone https://github.com/departement-loire-atlantique/design-system-web`

### Contribuer à la documentation

1. Installer [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
2. Dans une console : installer Ruby bundler : `gem install bundler`
3. Dans une console, installer les dépendances : `cd docs && bundle install` (ou `bundle update` pour une mise à jour)
4. Dans une console, lancer le mode développement : `cd docs && bundle exec jekyll serve --watch` 
5. Ouvrir le navigateur à l'addresse `http://localhost:4000/` pour voir le site (mise à jour automatique au fur et à mesure de l'édition des fichiers).

Description de l'arborescence de la documentation (sous dossier docs) :

* \_data/locale.yml : Fichier de traduction pour les templates
* \_data/primary_nav.yml : Arborescence du menu
* \_includes : Gabarits des éléments du site
* \_layout : Gabarits des différents types de page
* \_post : Un fichier par billet (Partie historique du site)
* \_sass : Librairies SCSS du site de documentation
* philosophy : Pages du menu "Philosophie"
* styles : Pages du menu "Styles web"
* utilities : Pages du menu "Modificateurs style web"
* assets : Dossier contenant les images, js, ... lié au site de documentation
* \_config.yml : Configuration Jekyll
* changes.md : Page historique (affiche les éléments du dossier \_post)
* Gemfile : Dépendance Ruby pour Jekyll
* index.md : Page d'accueil du site
* robots.txt : Interdiction d'indexation de la documentation par les moteurs de recherche

Pour chaque composant du design system :
* 1 entrée dans le dossier components au format markdown reprenant la documentation du composant
* 1 ou plusieurs illustrations HTML du composant stockées dans un sous dossier au nom du composant du dossier \_variations

### Contribuer et compiler le Framework

Le framework dérive de BootStrap et KNACSS

1. Installer [NodeJS](https://nodejs.org/en/download/)
2. Dans une console, installer les dépendances du projet : `npm install && npm install -g gulp`
3. Compiler le projet : `gulp build:ds`

Description de l'arborescence du framework (sous dossier framework) :

* framework/fonts : Polices du design system
* framework/images : Icones et images du design system
* framework/js : JS pour les composants du design system
* framework/scss : Projet SCSS du design system
* framework/css : Compislaation
* gulpfile.js : Tâches de compilation et de développemnet
* package.json : Dépendances NodeJS pour les tâches GULP

### Contribuer simultanément à la documentation et au framework scss/js

Ce mode permet de recharger automatiquement le navigateur en temps réel suite à toute modification dans la documentation ou le framework.

Aller sur le composant ou la page que l'on souhaite modifier. 
La mise à jour d'une modification dans le SCSS du framework est immédiate sans rechargement de la page.
La mise à jour d'un fichier JS du framework est prise en compte en environ 500ms avec rechargement de la page.
La mise à jour d'un des fichiers de la documentation est prise en compte en 2 à 3 secondes avec rechargement de la page.

#### Solution 1 : Outil en local

Installer les outils conformément aux étapes ci-dessus.

Puis simplement lancer `gulp serve` et ouvrir un http://localhost:4000


#### Solution 2 : Utilisation de Docker

1. Installer Docker et [Docker compose](https://docs.docker.com/compose/install/) 
2. Pour démarrer le projet : `cd .docker && docker-compose up`
3. Ouvrez un navigateur à l'adresse : `http://localhost:4000/` pour voir le site (mise à jour automatique au fur et à mesure de l'édition des fichiers).

Si le port 4000 est déja utilisé sur votre machine, vous pouvez le modifier en modifiant la ligne `PORT:4000` du fichier `.docker/.env`

### Contribuer un nouveau composant

Exemple pour le composant xxx
Avant de commencer à travailler, s'assurer que Docker tourne. Sinon, lancer Docker puis ouvrir un terminal et taper : cd .docker.

1. Créer le fichier xxx.md dans le dossier doc/components
2. Créer le dossier xxx dans doc/_variations
3. Créer les variations (fichier html) dans le dossier précédent + ne pas oublier de mettre (layout:pattern) en haut de fichier
4. Regénérer le site (temporairement : couper docker compose - ctrl+c - puis le relancer docker-compose up)
5. Ouvrir le site localhost:4000 et le nouveau composant doit se trouver dans le menu
6. Créer un fichier scss pour le composant dans le dosseir framework/scss/components
7. Importer le précédent fichier dans framework/scss/cd44.scss
8. A chaque sauvegarde, la css est automatiquement mise à jour dans le navigateur
9. Dès que le composant est stable : ajouter les fichiers dans "le prochaine commit git" (bouton +) puis "commit" (taper un commentaire sur le champs texte du haut puis entrée) puis "push" (menu "..." > push... )

### Publier une nouvelle version

Pour créer un tag afin de marquer une nouvelle révision du projet, utiliser simplement les commandes de gestion de version prévue dans npm selon l'importance des modifications réalisée depuis la précédente version :

```bash
npm version patch
npm version minor
npm version major
```

A chaque commit dans la branche master, le site est automatiquement mis à jour si la compilation du projet (documentation et framework) sont en succès.

### Force la regénération des icones à la font

```bash
cd .docker
docker-compose exec site gulp build:glyphicons
```

## License

Ce projet est basé sur un [modèle de site design-system](https://github.com/lundegaard/design-system-template) et est rendu sous public en open source suivant les termes de la licence [MIT License](https://opensource.org/licenses/MIT).
