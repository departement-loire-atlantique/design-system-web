---
layout: component-detail
group: templates
permalink: /components/templates.html

title: Templates
description: Modèles de structures génériques permettant de constituer les pages. 
status: Décrit

variations:
- title: Template carrefour
  pattern: templates/template-entryMenu.html
- title: Template générique 1 col gauche
  pattern: templates/generique_colgauche.html
- title: Template générique centre
  pattern: templates/generique_centre.html
---

## Utilisation

Les templates sont des gabarits de page.
Dans les templates multi-colonnes, les respirations (gouttières) sont obtenues en laissant une colonne vide entre les colonnes de contenu.

## Conteneurs

Deux types de conteneurs englobants sont utilisés pour construire les pages :
- Le conteneur fluide ;
- Le conteneur interne.

### Usage du conteneur fluide

Le conteneur fluide `ds44-container-fluid` sert de conteneur principal pour chaque nouvelle section. C'est lui qui peut recevoir les modifieurs de background comme les classes :
- `ds44-theme` -> couleur thématique du site (ex. turquoise pour Loire Atlantique) ;
- `ds44-bgDark` -> fond noir texte blanc ;
- `ds44-bgGray` -> fond gris sombre (comme dans le liens du footer) ;
- `ds44-bgCircle` -> image de fond "cercle étoilé" blanc, à coupler avec un fond de couleur (gris ou contextuel), à compléter avec les classes de positionnement de background `ds44-bg-br` (en bas à droite) et `ds44-bg-bl` (en bas à gauche) ;
- `ds44-bgTriangle-left` -> triangle blanc ferré à gauche ;
- `ds44-bgTriangle-right` -> triangle blanc ferré à droite ;
- `ds44-wave-white` -> vague blanche ;
- `ds44-wave-grey` -> vague grise ;
- `ds44-lightBG` -> affiche un fond gris afin de marquer l'alternance des lignes.

Le conteneur fluide prend la largeur de la page mais applique des marges intérieures (5,5% de la largeur de la page) de façon à détacher les contenus (mais pas les fonds de couleur) des bords.
Il peut être complété par le conteneur interne qui fixe les contenus à une taille maximale de 1366px avec des marges internes latérales (de 75px).

### Usage du conteneur interne

Le conteneur interne `ds44-inner-container` encadre les contenus textes et images. Il sert à limiter l'expansion horizontale des contenus. Il contraint également les couleurs de fond et ne doit donc pas servir pour gérer les sections sur fonds colorés.