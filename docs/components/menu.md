---
layout: component-detail
group: components

title: Menu
description: Un menu permet d'accéder à une liste de liens
status: A valider

variations:
- title: Menu principal
  description: Menu de navigation principale, affiché par le bouton "menu" du header
  pattern: menu/navigation-principale.html
- title: Niveau 2
  description: Menu de navigation principal, sous-niveau (affiché suite à un clic sur un élément du premier niveau)
  pattern: menu/navigation-principale-n2.html
- title: Menu des applications
  description: Ouvert depuis le menu de navigation principal niveau 1 (sous les réseaux sociaux)
  pattern: menu/navigation-applis.html
- title: Menu intérieur
  description: Menu de navigation intérieur de type "accordéon"
  pattern: menu/menu-navigation-interieur.html
---

## Note d'intégration

Le menu principal de navigation présenté dans le DS44 est réduit graphiquement par l'iframe de présentation qui lui ajoute des marges latérales. Le contenur positionné en bas de page s'affranchit de ces marges car il est relatif à l'iframe, pas à ses conteneurs. Le menu s'affichera correctement en pleine page dès lors qu'il sera implémenté en dehors de l'iframe du DS.

## Principes généraux

Deux types de menus :

- Un menu en overlay destiné à la navigation principale, activé depuis le header ou la zone de navigation ;
- Un composant de type "collapser" (accordéon) pouvant servir à générer des menus internes aux pages.

## Usage

| Type              | Purpose                                                                          |
| ---------------   |----------------------------------------------------------------------------------|
| Menu de navigation intérieur| Pages carrefour, ...                     |