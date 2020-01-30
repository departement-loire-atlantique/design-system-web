---
layout: component-detail
group: components
status: A valider

title: Formulaires
description: 

variations:
- title: Champ standard
  description: 
  pattern: forms/form--input-std.html
- title: Champ large
  description: Champ élargi
  pattern: forms/form--input-large.html
- title: Champ avec label extérieur
  description: Type de champ comprenant un label au-dessus et un placeholder à l'intérieur
  pattern: forms/form--input-externalLabel.html
- title: Messages d erreur
  description:
  pattern: forms/form--error.html
- title: Moteur de recherche à facettes
  description: Ensemble de composants de formulaire dédié aux recherches
  pattern: forms/form--recherche-facettes.html
---

## Usage

Les champs de formulaire peuvent être soit obligatoires soit optionnels. S'ils sont obligatoires, placer l'attribut `required` dans la balise `input`.
Ajouter l'attribut `disabled` si le champ n'est pas saisissable mais doit rester visible.

### Conseils d'intégration


## Accessibilité

Les champs obligatoires doivent comporter une séquence à gérer en dur et en JS :
* Un attribut html `required`
* Un attribut aria-required="true"
* Un attribut aria-invalid géré en JS : à "true" si le formulaire est validé mais sans l'élément requis. A "false" si l'élément requis est présent au moment de la validation. Si le contrôle est effectué côté serveur, le patch aria devient optionnel.


## FAQ


