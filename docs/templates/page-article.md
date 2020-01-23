---
layout: component-detail
group: templates
permalink:

title: Page article
description: Modèle de page basée sur le template "centré".
status: A valider

variations:
- title: Page type article
  pattern: page/LA__article.html
- title: Template centré
  pattern: templates/template-entryMenu.html
---
## Utilisation

Page utilisée pour afficher des contenus article.

### Mailto

Les mailto doivent comporter un aria-label contenant le rappel du sujet auquel ils se rapportent.
Exemple :
Titre de l'encadré : "Contact"
Sujet du titre : Service développement local Délégation Nantes
Code à produire :
`<a href="#mailto:contact@loire-atlantique.fr" aria-label="Contacter Service habitat par mail : contact@loire-atlantique.fr">contact@loire-atlantique.fr</a>`

### Liens

Les liens qui permettent de télécharger des documents ou qui ouvrent des pages en dehors du site doivent être ouverts dans une nouvelle fenêtre (target="_blank"). Dans ce cas :
- Ajouter un attribut title sur le lien ;
- Remplir le title avec le nom du lien et (si existant) le poids du document à télécharger ;
- Ajouter "nouvelle fenêtre" dans le title.


## Liste des références de la page

* header
* breadcrumb
* left
* center
* right
* bottom
* footer
