---
layout: component-detail
group: components
status: A valider

title: Tuiles Annuaire Agenda
alternative_title: Cards Annuaire Agenda
description: Une tuile propose un groupement de contenus cliquables menant à un contenu détaillé. Il s'agit d'un lien hypertexte graphique et multi-contenu. Les tuiles Annuaire et Agenda représentent la liste des tuiles de type photo + contenu ou contenu seul (contact, élu, aide etc.)

variations:
- title: Date
  description: Ce type de tuile est défini par la classe `ds44-card--horizontal`. Elle présente (en général) une image sur la gauche et un contenu à droite.
  pattern: cards/card--AA--horizontal--date.html

- title: Contact
  description: Ce type de tuile de forme verticale présente un titre suivi d'une liste d'informations. Un label partenaires peut être présent en haut à gauche de la tuile.
  pattern: cards/card--AA--contact.html

- title: Magazine
  description: Ce type de tuile met en avant des magazines avec le visuel sur la droite et le contenu textuel sur la droite.
  pattern: cards/card--AA--magazine.html


- title: Communes
  description: Ce type de tuile de forme verticale présente un titre suivi d'une liste d'informations.
  pattern: cards/card--AA--commune.html

- title: Variantes
  description: Liste des différentes variantes de tuile de type photo + contenu ou contenu seul
  pattern: cards/card--AA--variantes.html
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
