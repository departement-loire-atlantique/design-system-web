---
layout: component-detail
group: components
status: A valider

title: Tuiles
alternative_title: Cards
description: Une tuile propose un groupement de contenus cliquables menant à un contenu détaillé. Il s'agit d'un lien hypertexte graphique et multi-contenu.

variations:
- title: Tuile verticale avec image
  description: La classe `ds44-card--verticalPicture` définit une tuile verticale prévue pour recevoir une image en en-tête.
  pattern: cards/card--verticalPicture.html

- title: Tuile sur fond sombre
  description: Pour adapter une tuile sur un fond gris ou sombre, ajouter la classe `ds44-darkContext` qui modifie le background de la tuile.
  pattern: cards/card--verticalPicture--darkContext.html

- title: Tuile horizontale
  description: Ce type de tuile est défini par la classe `ds44-card--horizontal`. Elle présente (en général) une image sur la gauche et un contenu à droite.
  pattern: cards/card--horizontal.html

- title: Tuile horizontale calendrier
  description: Il s'agit d'une tuile horizontale avec un conteneur `ds44-card__dateContainer` à la place du conteneur d'image (`<picture>`). Elle comporte une date encadrée dans la couleur contextuelle sur la gauche et un contenu à droite. Pour les événements se déroulant sur un laps de temps compris entre deux dates, utiliser la classe `ds44-cardMultiDates` sur le conteneur ou la balise encadrante.
  pattern: cards/card--horizontal--date.html
---

## Usage

Lorem ipsum

## Documentation

- La classe `ds44-card` donne le contexte de tuile à la section.
- Dans le cadre de la charte du site Loire-Atlantique, les tuiles placées dans des contextes sombres ou gris doivent recevoir la classe `ds44-darkContext` à côté de la classe `ds44-card` afin d'adapter leur couleur de fond.
- En raison de leur contexte variable et imprévisible, les titres des tuiles ne sont pas balisés par des `<hn>` mais par des paragraphes (`<p>`) auxquels on pousse un contexte de titre de niveau 2 pour les assistances techniques (via `role="heading"` et `aria-level="2"`).

## FAQ

Lorem ipsum
