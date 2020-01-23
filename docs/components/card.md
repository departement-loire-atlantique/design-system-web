---
layout: component-detail
group: components
status: A valider

title: Tuiles
alternative_title: Cards
description: Une tuile propose un groupement de contenus cliquables menant à un contenu détaillé. Il s'agit d'un lien hypertexte graphique et multi-contenu.

variations:
- title: Tuile photo verticale
  description: La classe `ds44-card--verticalPicture` définit une tuile verticale prévue pour recevoir une image en en-tête.
  pattern: cards/card--verticalPicture.html

- title: Tuile photo horizontale
  description: Ce type de tuile est défini par la classe `ds44-card--horizontal`. Elle présente (en général) une image sur la gauche et un contenu à droite.
  pattern: cards/card--horizontal.html

- title: Tuile mise en avant
  description: La classe `ds44-container-imgRatio--tuileMiseEnAvant` définit une tuile prévue pour recevoir un contenu mis en avant avec une image en en-tête et le descriptif dans un bloc interne à la couleur de la thématique.
  pattern: cards/card--misEnAvant.html

- title: Tuile contact
  description: ...
  pattern: cards/card--contact.html

- title: Tuile calendrier horizontale
  description: Il s'agit d'une tuile horizontale avec un conteneur `ds44-card__dateContainer` à la place du conteneur d'image (`<picture>`). Elle comporte une date encadrée dans la couleur contextuelle sur la gauche et un contenu à droite. Pour les événements se déroulant sur un laps de temps compris entre deux dates, utiliser la classe `ds44-cardMultiDates` sur le conteneur ou la balise encadrante.
  pattern: cards/card--horizontal--date.html
---

## Usage

Lorem ipsum

## Documentation

- La classe `ds44-card` donne le contexte de tuile à la section.
- Dans le cadre de la charte du site Loire-Atlantique, les tuiles placées dans des contextes sombres ou gris doivent recevoir la classe `ds44-darkContext` à côté de la classe `ds44-card` afin d'adapter leur couleur de fond.
- En raison de leur contexte variable et imprévisible, les titres des tuiles ne sont pas balisés par des `<hn>` mais par des paragraphes (`<p>`) auxquels on pousse un contexte de titre pour les assistances techniques (via `role="heading"` et `aria-level="x"`).

## Notes d'intégration

Les composants de tuile sont intégrés via des inclusions dans le DS. Certains paramètres sont importants pour l'accessibilité **mais pas codés directement dans le composant**. Ils sont générés via un paramètre passé dans l'include. Par exemple :
- Ajouter un target="_blank" sur les liens qui téléchargent des documents et un title comportant le libellé du lien, le poids du document et la mention "nouvelle fenêtre". Ce qui se traduit dans le DS par :
`include card/card--horizontal.html title="Bien vieillir en Loire-Atlantique - PDF - 291,3 Ko - nouvelle fenêtre" text="PDF - 291,3 Ko" target='target="_blank"' ariaLevel='"aria-level="3"'`

**Ne pas oublier ces paramètres lors de l'intégration du composant dans le CMS**.

## FAQ

Lorem ipsum
