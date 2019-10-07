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
---

## Usage

Les champs de formulaire peuvent être soit obligatoires soit optionnels. S'ils sont obligatoires, placer l'attribut `required` dans la balise `input`.
Ajouter l'attribut `disabled` si le champ n'est pas saisissable mais doit rester visible.

### Note d'intégration

Pour l'instant, le système de déplacement du label fonctionne en pur CSS mais nécessite deux éléments obligatoires :
1. Il faut que le label soit placé directement en dessous du champ ;
2. Le champ doit posséder un attribut required (true).

Ces deux inconvénients pourront être solutionnés par l'ajout de JS.

## Effective form design

All forms are comprised of 6 elements:

* Labels: Inform users what the corresponding input fields mean.
* Input fields: Enable users to provide information. Information can be entered through a variety of different input fields ranging from text fields, checkboxes, and many other types.
* Help text: Provides assistance on how to fill out a field. Help text is optional.
* Placeholder text: Hints at what goes into a field. Placeholder text is optional.
* Actions: Allow users to submit a form.
* Validation: Ensures the data submitted by the user conforms to acceptable parameters.

![Form usage](../assets/images/form-usage-1.png)

## Form logic

* Radio Buttons are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice. In other words, clicking a non-selected radio button will deselect whatever other button was previously selected in the list.
* Checkboxes are used when there are lists of options and the user may select any number of choices, including zero, one, or several. In other words, each checkbox is independent of all other checkboxes in the list, so checking one box doesn’t uncheck the others. A stand-alone checkbox, or a toggle can be used for a single option that the user can turn on or off.
* For fields in which a single selection is required and there are a large number of possible options, consider using a Select element.

![Form usage](../assets/images/form-usage-4.png)

## FAQ

Lorem ipsum
