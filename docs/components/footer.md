---
layout: component-detail
group: components
status: Validé

title: Footer
description: Le Footer désigne le bas d’une page, il s’agit d’un élément qui doit être étudié attentivement car le bas d’une page doit pouvoir permettre au visiteur de retrouver toutes les informations principales afin qu’il n’ait pas besoin de remonter sur la page.

variations:
- title: Pied de page Loire-Atlantique
  description:
  pattern: footer/footer-LA.html
- title: Pied de page MDPH
  description:
  pattern: footer/footer-MDPH.html
- title: Pied de page Archive
  description: Pied de page site Archive
  pattern: footer/footer-archive.html
- title: Pied de page Chateau de Clisson
  description: Pied de page Chateau de Clisson site Grand Patrimoine
  pattern: footer/footer-chateauClisson.html
- title: Pied de page Inforoutes
  description: Pied de page site inforoutes
  pattern: footer/footer-inforoutes.html
- title: Pied de page Musée Dobrée
  description: Pied de page site Musée Dobrée
  pattern: footer/footer-dobree.html
---

## Usage

Elément obligatoire

## Intégration

Le pied de page (footer) est décomposé en deux lignes :
- La ligne supérieure est découpée en trois colonnes.
- La ligne inférieure contient une série de liens.

Pour la ligne principale, on utilise une grille 12 déclarée dans le conteneur interne (`ds44-inner-container`).
On crée pour cela un conteneur spécifique auquel on applique les classes de grille (`grid-12-small-1 ds44-hasGutter-xxl`).
La grille 12 se transforme en grille 1 dès le breakpoint "small" atteint.
La gouttière est spécifique au DS44 (`ds44-hasGutter-xxl`), elle fonctionne en pourcentage de l'écran.

Ensuite, on crée le colonnage. Ici, 3 colonnes : celle du logo et celles pour les contenus. Ces colonnes peuvent être modifiées (ajout, suppression), tant que la somme des espaces correspond toujours à 12. Si on souhaite changer la base 12, il faut modifier le conteneur supérieur et déclarer une grille différente (KNACSS est souple : on peut définir le type de grille à la volée. Ici on est en 12 pour plus de souplesse).

Des modifiers sont utilisés pour caler les différents éléments (`ds44-mb3` -> margin-bottom: 3rem, etc.).

La seconde ligne est un flex-container qui répartit les liens et laisse la place à un colonnage double en mode mobile.
