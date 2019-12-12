---
layout: component-detail
group: components

title: Header
description: Header
status: A valider

variations:
- title: Bandeau standard
  description: Header Loire Atlantique
  pattern: header/header-LA.html
- title: Variante type site Handicap
  description: Header avec menu supplémentaire
  pattern: header/header-variante-1.html
- title: Variante type site Archives
  description: Header sans recherche
  pattern: header/header-variante-2.html
---

## Notes d'intégration

### Le bandeau comporte :

* un logo au format image (avec ou sans titre complémentaire) ;
* de un à trois boutons d'action (menu, recherche etc.)

### Gestion des marges :

Les boutons possèdent des classes pour gérer leurs espacements.
* Quand il n'y a que deux boutons, les marges sont gérées avec la classe `ds44--xl-padding` sur chaque bouton ;
* Quand il y a plus de deux boutons, le bouton le plus à gauche prend la classe `ds44--xl-padding-tb` pour éviter un effet visuel d'écart trop important.