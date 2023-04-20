/**
 * Fichier modèle pour la partie prof   
 * Auteur : Nicolas CHALOYARD
 */

import * as bdd from '../../connexion_bdd';
import { Request, Response } from 'express';

// Fonction de récupération du prof 
// Après authentification
export function findProf(req: Request, res: Response) {
    // On récupère les données si l'utilisateur s'authentifie 
    let id = req.body.usr_id;
    let pwd = req.body.pwd;

    try {
        // On test les valeurs récupérées du body en post
        if ((id == 0 || pwd == '') || (id == undefined || pwd == undefined)) {
            res.render('connexion_prof', {message:"Identifiant / mot de passe vide invalide "});
        
        } else {
            /// La requête SQL
            bdd.module_connexion.query("SELECT idProfesseur, nomProfesseur, prenomProfesseur FROM Professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
                // Test des erreurs 
                if (err) {
                    res.render('connexion_prof', {message:"Erreur : " + err.message});
                
                } else {
                    // Test en cas de vide du résultat 
                    if (result.toString() == '') {
                        res.render('connexion_prof', {message:"Authentification incorrecte"});
                    
                    } else {
                        req.session.userid = result;
                        res.render('accueil', {user:result});
                    }
                }
            });
        }
    
    } catch (error) {
        res.send("Service en  maintenance !");
        console.log(error);
    }
}

// Fonction modèle de récupération des données des matières par prof dans la BDD
export function getMatiereProf(idProf:number, req: Request, res: Response) {
    bdd.module_connexion.query(
        "SELECT m.idMatiere, libelle FROM Matiere m, Prof_Matiere pm WHERE pm.idMatiere = m.idMatiere AND pm.idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            // Test des erreurs 
            if (err) {
                res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue :" + err.message});
            } else {
                // Test en cas de vide du résultat 
                if (result.toString() == '') {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], matiere: "Aucune matière"});
                } else {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], matiere: result});
                }

            }
        });
}

// Fonction modèle de récupération des données de la classe d'un prof dans la BDD 
// Pas utilisée encore (à faire V2)
export function getClasseProf(idProf: number, req: Request, res: Response) {
    bdd.module_connexion.query(
        "SELECT idSection, libelleSection FROM Section WHERE idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue :" + err.message});
            
            } else {
              // Test en cas de vide du résultat 
                if (result.toString() == '') {
                   res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], classe: "Aucune matière"});

                } else {
                    res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], classe: result});
                }
            }
        });
}

export function getNoteClasse(req: Request, res: Response) {
    let id = req.params.id;
    if (id == '' || id == undefined) {
        res.send("Problèmes");
    
    } else {
        bdd.module_connexion.query(
            "SELECT nomEleve, prenomEleve, libelleSection, note FROM notes n, eleve e, section s WHERE n.idEleve = e.idEleve AND e.idSection = s.idSection AND s.idSection = ?",
            [id], (err, result, fields) => {
                console.log(result);
                if (typeof(result) == 'undefined') {                    
                    bdd.module_connexion.query(
                        "SELECT libelleSection FROM section WHERE idSection = ?",
                        [id], (err, result, fields) => {
                            if (err) {
                                res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue" + err.message});   
                            } else {
                                res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], section: result});
                            }
                        });

                } else if (err) {
                    res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue" + err.message});

                } else {
                    res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], note: result});   
                }
            });
    }
}
