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
- title: Template générique centre
  pattern: templates/template-generique-centre.html
- title: Template home
  pattern: templates/template-home.html
---

## Utilisation

Les templates sont des gabarits de page.
Dans les templates multi-colonnes, les respirations (gouttières) sont obtenues en laissant une colonne vide entre les colonnes de contenu.

## Conteneurs

Trois types de conteneurs englobants sont utilisés pour construire les pages :
- Le conteneur fluide ;
- Le conteneur large ;
- Le conteneur interne.

### Usage du conteneur fluide

Le conteneur fluide `ds44-container-fluid` sert de conteneur principal pour chaque nouvelle section possédant un background. C'est lui qui peut recevoir les modifieurs de background comme les classes :
- `ds44-theme` -> couleur thématique du site (ex. turquoise pour Loire Atlantique) ;
- `ds44-bgDark` -> fond noir texte blanc ;
- `ds44-bgGray` -> fond gris sombre (comme dans le liens du footer) ;
- `ds44-bgCircle` -> image de fond "cercle étoilé" blanc, à coupler avec un fond de couleur (gris ou contextuel), à compléter avec les classes de positionnement de background `ds44-bg-br` (en bas à droite) et `ds44-bg-bl` (en bas à gauche) ;
- `ds44-bgTriangle-left` -> triangle blanc ferré à gauche ;
- `ds44-bgTriangle-right` -> triangle blanc ferré à droite ;
- `ds44-wave-white` -> vague blanche ;
- `ds44-wave-grey` -> vague grise ;
- `ds44-lightBG` -> affiche un fond gris afin de marquer l'alternance des lignes.

Le conteneur fluide prend la largeur de la page.
Il peut être complété par le conteneur interne qui fixe les contenus à une taille maximale déterminée par la variable `$ds44-max-inner-size` avec des marges internes latérales (`$ds44-container-large-margin` = 60px pour le site Loire Atlantique).

### Usage du conteneur large

Le conteneur large permet de contraindre les contenus à une taille maximale pour les écrans larges, déterminée par la variable `$ds44-max-size` (1600px pour le site Loire Atlantique).

### Usage du conteneur interne

Le conteneur interne `ds44-inner-container` encadre les contenus textes et images. Il sert à limiter l'expansion horizontale des contenus. Il contraint également les couleurs de fond et ne doit donc pas servir pour gérer les sections sur fonds colorés.
Le conteneur interne peut être placé à l'intérieur des conteneurs fluide et/ou large.
