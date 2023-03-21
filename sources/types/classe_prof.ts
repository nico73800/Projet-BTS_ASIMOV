/**
 * Fichier typescript contenant la classe prof 
 * Auteur : Nicolas CHALOYARD 
 */

import { Personne } from "./interface_personnes";


// Classe Professeur
export class Professeur implements Personne {
    id: number;
    nom: string;
    prenom: string;
    mail: string;
    estReferent: boolean;
    estProviseur: boolean;
    constructor(id: number, nom: string, prenom: string, mail: string, estReferent: boolean, estProviseur: boolean) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.estReferent = estReferent;
        this.estProviseur = estProviseur;
    }
    setNom(nom: string): void {
        this.nom = nom;
    }
    setPrenom(prenom: string): void {
        this.prenom = prenom;
    }
    setMail(mail: string): void {
        this.mail = mail;
    }
    
    public get value() : string {
        return Professeur.toString();
    }
    
} 
