/**
 * Fichier typescript contenant l'interface Personne 
 * Auteur Nicolas CHALOYARD - 
 */


// Interface Personne
export interface Personne {
    id: number;
    nom: string;
    prenom: string;
    mail: string;
    setNom(nom: string): void;
    setPrenom(prenom: string): void;
    setMail(email: string): void;
}

