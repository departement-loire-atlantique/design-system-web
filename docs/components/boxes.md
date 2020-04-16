---
layout: component-detail
group: components

title: Encadrés
alternative_title: boxes
description: Un encadré permet la mise en exergue de contenus.
status: Validé

variations:

- title: Standards
  description: Encadrés contextuels
  pattern: boxes/box-standards.html

- title: Documents
  description: Liste de documents
  pattern: boxes/box-docs.html

- title: Contacts
  description: Différents encadrés pour mettre en valeur des contacts
  pattern: boxes/box-contacts.html

- title: Blocs libres
  description: Encadrés colorés
  pattern: boxes/box-libres.html

- title: En chiffres
  description: Encadrés illustrés
  pattern: boxes/box-chiffres.html

- title: Pushs
  description: Encadrés publicitaires
  pattern: boxes/box-push.html

- title: Encadrés deux colonnes
  description: Différents styles d'encadrés deux colonnes
  pattern: boxes/box-deuxCol.html

- title: Alerte
  description: Encadré d'alerte que l'on retrouvera sous le header principal. Il peut se replier / se réouvrir et conserver l'état sur la durée de la session pour l’alerte en question car il peut y en avoir plusieurs à des endroits différents du site.
  pattern: boxes/box-alert.html

- title: Navigation
  description: Encadrés de navigation interne à une page (flottants)
  pattern: boxes/box-navigation.html

---

## Documentation

### Créer un encadré :

* L'encadré est une `<section>` ou une `<div>` à laquelle on appose la classe `ds44-box`.
* Ajouter la classe `ds44-theme` sur la section s'il s'agit d'un encadré de couleur (contextuelle au site), ou la classe `ds44-bgGray` pour un fond gris.
* Le conteneur `ds44-innerBoxContainer` gère les marges internes de la boite, sur les boites qui en ont besoin.
* Le titre de l'encadré peut être choisi selon l'arborescence de la page dans laquelle il va être intégré (à partir de `<h2>`). Quelle que soit la balise de titre retenue, ajouter dessus la classe `ds44-box-heading`.

### Gérer les listes d'éléments dans les encadrés :

* Choisir le conteneur html adapté (`<ul><li>` pour une liste ou suite de `<p>` pour des éléments qui se suivent sans être une énumération) ;
* Ajouter une classe sur le conteneur pour gérer la respiration. Choisir parmi les spacers de KNACSS ou les utils margin/padding du DS. Par défaut : classe `mtm` (margin-top-medium) qui va espacer les éléments de 20px en hauteur.
* Ajouter la classe `ds44-docListElem` à côté du spacer. Cette classe positionne le conteneur et permet de gérer les icônes illustrant les contenus.
* Si le contenu est illustré par une icône, ajouter les classes d'icône (`ico` et nom classe de l'icône choisie) et la classe `ds44-docListIco`. Cette dernière permet d'afficher l'icône à droite en position absolue, de façon à aligner précisément les textes le long d'une même ligne à gauche (ce qui évite le retour à la ligne sous l'icône précédente).

### Encadrés spécifiques :

* Les encadrés graphiques comportent quelques petites spécificités :
 * Quand les contenus textuels doivent être centrés verticalement, ajouter les classes `ds44-flex-container` et `ds44-flex-valign-center` pour donner au conteneur un contexte "flex".
 * Dans un contexte "flex" aligné verticalement au centre, le retour à un comportement "normal" des contenus doit être forcé. Ajouter, si nécessaire, la classe `ds44-boxContent` pour créer un conteneur dans lequel les éléments reprendront leur flux normal (retours à la ligne des paragraphes, les uns en dessous des autres).
 * Les pushs n'ont pas de conteneur `ds44-innerBoxContainer`, à la place ils ont deux conteneurs colonnés : `ds44-boxPushPic` sur le conteneur d'image et `ds44-boxPushContent` pour les contenus. La classe utilisée pour les titres est `h3-like` au lieu de `ds44-box-heading`.
 * Les pushs comportent deux images : une pour le mobiel et une pour les autres résolutions. L'alternance est gérée dans la balise `<picture>` via une balise `<source>`.

