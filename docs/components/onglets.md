---
layout: component-detail
group: components

title: Onglets
description: Un système de navigation interne
status: Brouillon

variations:
- title: Onglets simples
  description: Bande de navigation ne comportant que des onglets
  pattern: onglets/onglets-simples.html
- title: Onglets avec boutons
  description: Bande de navigation d'onglets composite
  pattern: onglets/onglets-composites.html
---


## Principes généraux

Il existe deux types d'onglets :
* la barre d'onglets simple (n'affiche que des onglets)
* la barre d'onglets composite (affiche des onglets + des boutons)

La barre de boutons ne peut contenir que trois boutons max. (pour des questions d'espace en mobile).

## Notes d'intégration

* Les onglets doivent s'étaler sur toute la largeur de la barre. Pour obtenir ce résultat, ils doivent avoir un flex-grow à 1. On obtient ce résultat en ajoutant la classe `ds44-fg1` sur chaque `<li>`.

* Dans le cas d'une barre composite, on doit avoir deux conteneur en flex juxtaposés. Le premier contient les onglets, le second (`ds44-blocBtnOnglets`) contient les boutons. Ils sont tous deux englobés dans un conteneur lui aussi en flex avec un fond de couleur (classe `ds44-theme`).

* En mobile, le second conteneur tombe en bas de l'écran en position fixe et ses styles sont surchargés pour écraser les marges, paddings et compresser les boutons dans l'espace réduit.


## Usage