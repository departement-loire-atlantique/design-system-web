---

layout: page-icones
type: detail
title: Iconographie
group: styles
permalink: /styles/iconographie.html
description: Un set d’icônes vectorielles sur-mesure est disponible en icon-font.

---

## Les icones

{% include pattern-live-preview.html pattern_path="_variations/icons/demo-icons.html" %}

## Principes généraux

Les icônes sont gérées via une police d'icônes (icon font).
La liste des icônes et leurs codes (classes applicables) sont fournies dans la liste ci-dessus.

## Usage

Une icône peut être positionnée à côté d'un texte, à gauche, à droite, en dessous, ou dans un conteneur indépendant (liste, lien etc.). Selon le rendu recherché, un conteneur spécifique doit être positinné autour du texte :
* Mini texte sous l'icône (pour en expliciter la fonction) : `ds44-btnInnerText--bottom`
* Texte à droite ou à gauche de l'icône :
    * - dans un bouton : `ds44-btnInnerText`
    * - dans un lien ou une liste : `ds44-iconInnerText`

D'autres cas spécifiques existent (menus, overlays), les classes ne sont alors pas prévues pour fonctionner en dehors de leur composant.

<hr>

Pour les icônes du Musée Dobrée qui peuvent être sur fond noir, barré, cerclé d'un contour : des classes sont à ajouter pour avoir le rendu souhaité. En fonction, ajouter la classe :
* - Icône sur fond noir : `icon--full`
* - Icône sur fond blanc : `icon--simple`
* - Icône sur fond blanc, bordure noir : `icon--circle`
* - Icône barré rouge : `icon--forbidden`

<hr>

<a href="../fonts/Icofont.zip" class="ds44-btnStd ds44-btn--invert"><span class="ds44-btnInnerText">Télécharger La liste des icônes</span></a>

## Tailles d'icônes

| Type de classe    | Usage                                                                                     |
| ---------------   |-------------------------------------------------------------------------------------------|
| icon              | Classe de base à poser sur tout type d'icône. Taille d'icône relative à son conteneur     |
| icon--medium      | Taille d'icône relative à son conteneur, accroissement de 180%                            |
| icon--large       | Taille d'icône relative à son conteneur, accroissement de 250%                            |
| icon--xlarge      | Taille d'icône relative à son conteneur, accroissement de 350%                            |
| icon--sizeS       | Taille d'icône fixe, égale à 12px                                                         |
| icon--sizeM       | Taille d'icône fixe, égale à 20px                                                         |
| icon--sizeL       | Taille d'icône fixe, égale à 30px                                                         |
| icon--sizeXL      | Taille d'icône fixe, égale à 45px                                                         |

---
