---
layout: component-detail
group: components
status: A valider

title: Tuiles Mise en avant
alternative_title: Cards Mise en avant
description: Une tuile propose un groupement de contenus cliquables menant à un contenu détaillé. Il s'agit d'un lien hypertexte graphique et multi-contenu. Les tuiles de mise en avant représentent des tuiles que l'on retrouve dans le corps de page (sous forme de carrousel ou de bloc indépendant)

variations:
- title: Photo verticale
  description: La classe `ds44-card--verticalPicture` définit une tuile verticale prévue pour recevoir une image en en-tête.
  pattern: cards/card--MeA--verticalPicture.html

- title: Photo horizontale
  description: Ce type de tuile est défini par la classe `ds44-card--horizontal`. Elle présente (en général) une image sur la gauche et un contenu à droite.
  pattern: cards/card--MeA--horizontal.html

- title: Contenu en avant
  description: La classe `ds44-container-imgRatio--tuileMiseEnAvant` définit une tuile prévue pour recevoir un contenu mis en avant avec une image en en-tête et le descriptif dans un bloc interne à la couleur de la thématique. Pour changer la position du block interne, il suffit de changer la fin de la classe `ds44-blockAbsolute--bl` (bl bottom left. tl top left. br bottom right. tr top right)
  pattern: cards/card--MeA--misEnAvant.html

- title: En 1 clic
  description: Ce type de tuile est défini par la classe `ds44-card--horizontal`. Elle présente (en général) une image sur la gauche et un contenu à droite. On retrouve ce type de bloc d accès rapide en colonne secondaire.
  pattern: cards/card--MeA--unClic.html

- title: Témoignages
  description: On retrouve ce type de tuile en colonne secondaire, il est utilisé pour mettre en avant un témoignage ou une vidéo.
  pattern: cards/card--MeA--temoignages.html

- title: Élu
  description: La classe `ds44-card--verticalPicture` définit une tuile verticale prévue pour recevoir une image en en-tête de forme ronde et par la suite le descriptif de l élu.
  pattern: cards/card--MeA--elu.html
---

## Documentation

- La classe `ds44-card` donne le contexte de tuile à la section.
- Dans le cadre de la charte du site Loire-Atlantique, les tuiles placées dans des contextes sombres ou gris doivent recevoir la classe `ds44-darkContext` à côté de la classe `ds44-card` afin d'adapter leur couleur de fond.
- En raison de leur contexte variable et imprévisible, les titres des tuiles ne sont pas balisés par des `<hn>` mais par des paragraphes (`<p>`) auxquels on pousse un contexte de titre pour les assistances techniques (via `role="heading"` et `aria-level="x"`).

## Notes d'intégration

Les composants de tuile sont intégrés via des inclusions dans le DS. Certains paramètres sont importants pour l'accessibilité **mais pas codés directement dans le composant**. Ils sont générés via un paramètre passé dans l'include. Par exemple :
- Ajouter un target="_blank" sur les liens qui téléchargent des documents et un title comportant le libellé du lien, le poids du document et la mention "nouvelle fenêtre". Ce qui se traduit dans le DS par :
`include card/card--horizontal.html title="Bien vieillir en Loire-Atlantique - PDF - 291,3 Ko - nouvelle fenêtre" text="PDF - 291,3 Ko" target='target="_blank"' arialevel='"aria-level="3"'`

**Ne pas oublier ces paramètres lors de l'intégration du composant dans le CMS**.

