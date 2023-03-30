# Projet-BTS_ASIMOV

## Présentation du projet : 
Le projet Asimov est un projet de développement pour les épreuves de BTS SIO Option SLAM.
L'objectif est de créer une plateforme Web / Client lourd pour la gestion des élèves allant de la 6ème à la Terminale.

## Informations pour lancer le projet :
Pour lancer le projet il faut taper : 
**npm run dev** sur l'ip : [127.0.0.1:3000](http://127.0.0.1:3000)

## V1 : Accès Professeur
- Ajout de l'authentification
- Modification de la page d'accueil (corrections bugs)

Notes techniques :
- Ajout et correction des bugs au niveau des sessions qui ne fonctionnaient pas :
    * Redéclaration du module Session d'**Express-session** (dans [index.ts](https://github.com/nico73800/Projet-BTS_ASIMOV/blob/main/sources/src/index.ts))
- Modification des signatures des fonctions : 
    * Ajout des types Request et Response d'Express
- Correction de l'affichage au niveau de la page d'accueil : 
    * Un élément censé être récupérer par Express n'existait plus et empêchait le chargement de la page
