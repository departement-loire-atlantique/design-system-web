---
layout: component-detail
group: components

title: Titres
description: Titres de page (titre principal).
status: A valider

variations:
- title: Hiérarchie des titres
  description: Tous les titres utilisables
  pattern: titres/all-titles.html
- title: Titre de page avec image
  description: Titre principal d'une page avec image d'en-tête
  pattern: titres/main-title.html
- title: Titre article ou actu avec image
  description: Titre d'une page article ou actualité avec image d'en-tête
  pattern: titres/actu-title.html
- title: Titre de page sans image
  description: Titre principal standard sans image d'en-tête
  pattern: titres/main-title-noImage.html
- title: Titre de page centré sans image
  description: Titre principal pour les pages sans bandeau image
  pattern: titres/main-title-centered.html
---

## General guidelines

Il existe trois types de titres de page :
* Le titre avec bandeau image ;
* Le titre simple, sans image ;
* Le titre centré, sans image.

Un titre est composé soit :
* D'une balise `<hx>` et d'un ID unique ;
* D'une balise `<p>` avec un ID unique, un `role="heading"` et un `aria-level="x"`.
Privilégier la première solution si possible, la balise de titre étant importante en matière de référencement.

## Usage

Un titre de page avec image doit être positionné dans un conteneur `ds44-pageHeaderContainer`.
Un titre sans image doit être positionné directement dans un conteneur vierge (type balise `<header>`).

Si le bandeau de titre comporte une image, deux nouveaux conteneurs sont ajoutés :
* Le conteneur de l'image : `ds44-pageHeaderContainer__pictureContainer`.
* Le conteneur du titre : `ds44-titleContainer` (celui-ci sert à repositionner le titre par-dessus l'image).
Dans ce cas, la couleur du titre doit être inversée grâce à la classe `ds44-text--colorInvert`.

Si le titre ne comporte aucune image, il peut être soit ferré à gauche, soit centré.
* Pour le centrer, ajouter la classe `.txtcenter`.
* Retirer la classe `ds44-text--colorInvert` positionnée sur la `<ul>` pour redonner aux liens une couleur sombre.


## Règles

* Le fil d'Ariane est affiché au-dessus du titre.


## Accessibilité

* Ajouter `aria-current="location"` sur l'élément de liste actif.

