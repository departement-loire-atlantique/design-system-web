---
layout: component-detail
group: components

title: Titres
description: Titres de page (titre principal).
status: Complete

variations:
- title: Hiérarchie des titres
  description: Tous les titres utilisables
  pattern: titres/all-titles.html
- title: Titre de page avec image
  description: Titre principal d'une page avec image d'en-tête
  pattern: titres/main-title.html
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

## Usage

Le titre de la page est positionné dans le conteneur `ds44-pageHeaderContainer`. 

Si le bandeau de titre comporte une image, deux nouveaux conteneurs sont ajoutés :
* Le conteneur de l'image : `ds44-pageHeaderContainer__pictureContainer`.
* Le conteneur du titre : `ds44-titleContainer` (celui-ci sert à repositionner le titre par-dessus l'image).
Dans ce cas, la couleur du titre doit être inversée grâce à la classe `ds44-text--colorInvert`.

Si le titre ne comporte aucune image, il peut être soit ferré à gauche, soit centré.
* Pour le centrer, ajouter la classe `.txtcenter`.


## Other rules

