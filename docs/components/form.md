---
layout: component-detail
group: components
status: Validé

title: Formulaires
description: Un formulaire web est un espace dédié au recueil d'informations saisies par un internaute sur une page web ou un e-mail HTML. Le formulaire composé de boîtes texte, de menus déroulant et de cases à cocher est utilisé pour des inscriptions, des commandes ou des processus de qualification.

variations:
- title: Champs standards
  description:
  pattern: forms/form--input-std.html

- title: Selects
  description:
  pattern: forms/form--select.html

- title: Champ autocompletion
  description:
  pattern: forms/form--input-autocomplete.html

- title: Messages d erreur
  description:
  pattern: forms/form--error.html

- title: Recherche à facettes
  description: Ensemble de composants de formulaire dédié aux recherches
  pattern: forms/form--recherche-facettes.html

- title: Champs liés
  description: Quand deux champs sont liés, le sous-thèmes n'est accessible qu'après avoir validé le premier champ.
  pattern: forms/form--champs-lies.html

- title: Champs spéciaux
  description: 
  pattern: forms/form--special-fields.html
---

## Usage

Les champs de formulaire peuvent être soit obligatoires soit optionnels. S'ils sont obligatoires, placer l'attribut `required` dans la balise `input`.
Ajouter l'attribut `disabled` si le champ n'est pas saisissable mais doit rester visible.

### Cases à cocher et boutons radios

Pour des questions de design, les cases à cocher et boutons radios ont été refaits via CSS. Ce qui impose une façon de coder : **les inputs checkbox ou radio doivent obligatoirement être codés à gauche du label dans le HTML, sans aucune balise entre les deux**.

Dans le cas où on voudrait changer la position des cases par rapport au label, il faudrait recréer des styles spécifiques.

### Faux selects

Les selects du DS n'emploient pas de balises `<select>`. Ils sont reconstruits en HTML/CSS/JS + aria.
Le JS ajoute la classe `ds44-moveSelectLabel` sur le titre du select quand un élément est sélectionné, de façon à faire sortir le (faux) label du champ.


## Accessibilité

Les champs obligatoires doivent comporter une séquence à gérer en dur et en JS :
* Un attribut html `required`
* Un attribut aria-required="true"
* Un attribut aria-invalid géré en JS : à "true" si le formulaire est validé mais sans l'élément requis. A "false" si l'élément requis est présent au moment de la validation. Si le contrôle est effectué côté serveur, le patch aria devient optionnel.

### Messages d'erreur

Sur le champ en erreur, déclarer  :
* le focus sur le premier élément de formulaire en erreur ;
* un attribut aria-invalid=”true” (dynamiquement et uniquement en cas d’erreur ) ;
* un attribut aria-hidden=”true” sur le chevron vers le bas de l'élément d'ouverture  Intaria-invalid="true"
* un attribut id de valeur unique dans la balise <p> ou <ul> englobant le message d’erreur ;
* un attribut aria-describedby dans le champ en erreur où la valeur de aria-describedby reprend la valeur de l’attribut id du message d’erreur.


## FAQ
