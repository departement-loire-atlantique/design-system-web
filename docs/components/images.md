---
layout: component-detail
group: components

title: Images
description: Composants et éléments d'images. Les images sont verrouillé dans leur conteneur avec un ratio particulier, elles s'adaptent pour avoir un rendu homogène sur l'ensemble du site.
status: Validé

variations:
- title: Images sous différents ratios
  description: Images sous différents ratios qui s'adaptent à leur conteneur peu importe le format d'upload.
  pattern: images/ratio.html

- title: Légende image avec balise figure
  description: Légende utilisée pour ajouter un copyright sous une image.
  pattern: images/legende.html

- title: Légende image avec balise picture
  description: Légende utilisée pour ajouter un copyright sous une image.
  pattern: images/legende2.html

- title: Loader
  description: Image que l'on affiche quand la page charge quand elle est en attente de contenu
  pattern: images/loader.html

- title: Mosaïques
  description: Mosaïques d'images sous différentes formes
  pattern: images/mosaiques.html

- title: Vidéo
  description: Vidéo du Musée Dobrée
  pattern: images/video-dobree.html

- title: Image pleine largeur
  description: Image bandeau décorative du Musée Dobrée
  pattern: images/img_bandeau.html
---


## General guidelines

Le composant légende est optionnel. S'il est présent, il doit être intégré dans un conteneur positionné (picture, figure ou autre) et relié à son image via un aria-describedby. La classe `ds44-legendeContainer` est là pour assurer le rôle du conteneur positionné (en relatif). Si l'image est intégrée dans un conteneur déjà positionné (en absolute ou en fixed), ne pas ajouter la classe `ds44-legendeContainer` (sinon, elle repositionnera le conteneur en relatif).
Le contenu de la légende est saisi par le contributeur dans un champ spécifique indépendant du alt de l'image.

## Usage


## Icon usage


## Règles de codage
