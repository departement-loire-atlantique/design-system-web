---
layout: page
type: detail
title: Couleurs
group: styles
permalink: /styles/color.html
description: Les couleurs forment la racine vertébrale de la charte graphique. Elles expriment le ton du site.

---


## Couleurs génériques

{% include color-preview.html name="Noir" variable="$ds44-dark" hexcode="#000000" %}
{% include color-preview.html name="Gris foncé" variable="$ds44-gray" hexcode="#5C5C5C" %}
{% include color-preview.html name="Gris clair" variable="$ds44-lightgray" hexcode="#F5F5F5" %}
{% include color-preview.html name="Blanc" variable="$ds44-light-color" hexcode="#FFFFFF" %}
{% include color-preview.html name="Overlay plat" variable="$ds44-flat-overlay " hexcode="rgba(0, 0, 0, 0.4)" %}

## Couleurs identitaires (vives)

Le turquoise est la couleur générique retenue pour la plupart des sites de Loire-Atlantique.

{% include color-preview.html name="Turquoise" variable="$ds44-LA" hexcode="#99E6D1" %}
{% include color-preview.html name="Jaune" variable="$ds44-Yellow" hexcode="#FFF15F" %}
{% include color-preview.html name="Vert" variable="$ds44-Green" hexcode="#EEF0A8" %}
{% include color-preview.html name="Corail" variable="$ds44-Coral" hexcode="#FFCABC" %}
{% include color-preview.html name="Violet" variable="$ds44-Purple" hexcode="#C3C5FA" %}
{% include color-preview.html name="Orange" variable="$ds44-Orange" hexcode="#F9CA97" %}
{% include color-preview.html name="Rose" variable="$ds44-Pink" hexcode="#FFB4D6" %}
{% include color-preview.html name="Bleu" variable="$ds44-Blue" hexcode="#9ADCFF" %}

## Contrastes des combinaisons (référence 4.5:1 AA)

{% include color-contrast-preview.html name="Noir sur blanc" hexcode="#FFF" contrast-hexcode="#000" ratio="21:1" %}

{% include color-contrast-preview.html name="Noir sur turquoise" hexcode="#99E6D1" contrast-hexcode="#000" ratio="14.59:1" %}

{% include color-contrast-preview.html name="Blanc sur overlay" hexcode="linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.5) 30%, rgba(0,0,0,.6) 40%, rgba(0,0,0,.75) 70%)" contrast-hexcode="#FFF" ratio="8.59:1" %}

{% include color-contrast-preview.html name="Gris foncé sur blanc" hexcode="#FFF" contrast-hexcode="#5C5C5C" ratio="5.74:1" %}

{% include color-contrast-preview.html name="Gris foncé sur turquoise" hexcode="#99E6D1" contrast-hexcode="#5C5C5C" ratio="3.99:1" bad-contrast="bad-contrast" %}

{% include color-contrast-preview.html name="Blanc sur overlay plat" hexcode="rgba(0, 0, 0, 0.4)" contrast-hexcode="#FFF" ratio="2.43:1" %}

{% include color-contrast-preview.html name="Noir sur gris clair" hexcode="#F5F5F5" contrast-hexcode="#000" ratio="16.83:1" %}

{% include color-contrast-preview.html name="Turquoise sur noir" hexcode="#000" contrast-hexcode="#99E6D1" ratio="14.59:1" %}

{% include color-contrast-preview.html name="Gris foncé sur gris clair" hexcode="#F5F5F5" contrast-hexcode="#5C5C5C" ratio="4.6:1" %}

{% include color-contrast-preview.html name="Turquoise sur blanc" hexcode="#FFF" contrast-hexcode="#99E6D1" ratio="1.44:1" bad-contrast="bad-contrast" %}



## Couleurs de fond

Les fonds de couleurs sont soit blanc, soit gris clair, soit la couleur thématique du site.

{% include color-preview.html name="Gris clair" variable="$ds44-lightgray" hexcode="#F5F5F5" %}
{% include color-preview.html name="Blanc" variable="$ds44-light" hexcode="#FFFFFF" %}
{% include color-preview.html name="Turquoise" variable="$ds44-LA" hexcode="#99E6D1" %}


## Couleurs formulaire (validation et erreur)

### Input normal
{% include color-preview.html name="Placeholder" variable="$ds44-color-soft-text" hexcode="#5C5C5C" %}
{% include color-preview.html name="Fond input" variable="$ds44-light-color" hexcode="#FFFFFF" %}

### Input disabled
{% include color-preview.html name="Placeholder" variable="$ds44-color-soft-text" hexcode="#5C5C5C" %}
{% include color-preview.html name="Fond input" variable="$ds44-lightgray" hexcode="#F5F5F5" %}

### Input saisi
{% include color-preview.html name="Placeholder" variable="$ds44-color-dark-text" hexcode="#000" %}
{% include color-preview.html name="Fond input" variable="$ds44-light-color" hexcode="#FFFFFF" %}

### Message validation
{% include color-preview.html name="Noir Texte" variable="$ds44-color-dark-text" hexcode="#000000" %}
{% include color-preview.html name="Icône validation" variable="$ds44-valid" hexcode="#24883E" %}
{% include color-preview.html name="BG validation" variable="$ds44-valid-bg" hexcode="#F3F9F5" %}

### Message erreur

Les informations essentielles de type "alerte" sont de couleur rouge

{% include color-preview.html name="Noir Texte" variable="$ds44-color-dark-text" hexcode="#000000" %}
{% include color-preview.html name="Icône erreur" variable="$ds44-error" hexcode="#DC3545" %}
{% include color-preview.html name="BG erreur" variable="$ds44-error-bg" hexcode="#FEF4F5" %}


### Couleurs Grand Patrimoine

#### Couleurs principales

{% include color-preview.html name="Grand Patrimoine" hexcode="#aab4be" %}
{% include color-preview.html name="Domaine de la Garenne Lemot" hexcode="#39bda9" %}
{% include color-preview.html name="Château de Clisson" hexcode="#FF1761" %}
{% include color-preview.html name="Eglise du Vieux-Bourg" hexcode="#FFC93D" %}
{% include color-preview.html name="Château de Chateaubriant" hexcode="#FF6929" %}
{% include color-preview.html name="Jardins des Folies Siffait" hexcode="#31CC5A" %}
{% include color-preview.html name="Abbaye de blanche Couronne" hexcode="#B47878" %}
{% include color-preview.html name="Pôle Archéologie de Loire-Atlantique" hexcode="#FF646E" %}
{% include color-preview.html name="Laboratoire Arc’Antique" hexcode="#1496dc" %}
{% include color-preview.html name="Musée Dobrée" hexcode="#FFBED2" %}
{% include color-preview.html name="Ports de Loire-Atlantique" hexcode="#00B3BC" %}






#### Couleurs complémentaires

{% include color-preview.html name="10" hexcode="#965A6E" %}
{% include color-preview.html name="11" hexcode="#dca096" %}
{% include color-preview.html name="12" hexcode="#F0DCD2" %}
{% include color-preview.html name="13" hexcode="#E66496" %}
{% include color-preview.html name="14" hexcode="#F2FA1C" %}
{% include color-preview.html name="15" hexcode="#5AB45A" %}
{% include color-preview.html name="16" hexcode="#8CB48C" %}
{% include color-preview.html name="17" hexcode="#289682" %}
{% include color-preview.html name="18" hexcode="#6EB4F0" %}
{% include color-preview.html name="19" hexcode="#005096" %}
{% include color-preview.html name="20" hexcode="#6E64BE" %}
{% include color-preview.html name="21" hexcode="#A046A0" %}
{% include color-preview.html name="22" hexcode="#D296E6" %}
{% include color-preview.html name="23" hexcode="#C8D2FA" %}
