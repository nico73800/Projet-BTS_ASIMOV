# Projet BTS : ASIMOV

## Présentation du projet : 
Le projet Asimov est un projet de développement pour les épreuves de BTS SIO Option SLAM.
L'objectif est de créer une plateforme Web / Client lourd pour la gestion des élèves allant de la 6ème à la Terminale.

## Informations pour lancer le projet :
Pour lancer le projet il faut taper : 
**npm run dev** et aller sur l'adresse IP : [127.0.0.1:3000](http://127.0.0.1:3000) OU l'adresse IP de son pc. 

## V1 : Accès Professeur  / Authentification
- Ajout de l'authentification
- Modification de la page d'accueil (corrections bugs)

### Notes techniques :
- Corrections des bugs au niveau des sessions qui ne fonctionnaient pas :
    * Redéclaration du module Session d'**Express-session** (dans [index.ts](https://github.com/nico73800/Projet-BTS_ASIMOV/blob/main/sources/src/index.ts))
- Modification des signatures des fonctions : 
    * Ajout des types Request et Response d'Express
- Correction de l'affichage au niveau de la page d'accueil : 
    * Un élément censé être récupérer par Express n'existait plus et empêchait le chargement de la page

## V2 : Accès Professeur / CRUD notes (En cours d'implémentation)
### Fonctionnalités implémentées 
- Lecture des notes 

### En cours d'implémentation 
- Ajout d'une note pour un élève

### A implémenter 
- suppresion et modification des notes
- Correction de l'implémentation de l'authentification des enseignants :
    - Utilisation d'un couple {Login + Password} à la place du couple {ID + Password}

### Notes techniques : 
- Corrections de bugs dans [prof.service.ts](https://github.com/nico73800/Projet-BTS_ASIMOV/blob/main/sources/src/resources/professeur/prof.service.ts) :
    * Correction du test de la nullité d'un résultat d'une requête SQL (changement par Object(result) == '') 
    * 
- 