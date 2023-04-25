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
                if (typeof(result) == 'undefined' || Object(result) == '') {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur']});
                } else {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], matiere: result});
                }

            }
        });
}

// Fonction modèle de récupération des données de la classe d'un prof dans la BDD 
export function getClasseProf(idProf: number, req: Request, res: Response) {
    bdd.module_connexion.query(
        "SELECT idSection, libelleSection FROM Section WHERE idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue :" + err.message});
            
            } else {
                console.log(Object(result));
              // Test en cas de vide du résultat 
                if (typeof(result) == 'undefined' || Object(result) == '') {
                   res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur']});

                } else {
                    res.render('classes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], classe: result});
                }
            }
        });
}

// Fonction modèle de récupération des notes de la classe 
export function getNoteClasse(req: Request, res: Response) {
    let id = req.params.id;
    
    // On test les différentes valeurs de l'ID
    if (id == '' || id == undefined || id == '0') {
        res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Saisie invalide"});
    } else {
        // Récupération des notes concernant le prof
        bdd.module_connexion.query(
            "SELECT e.idEleve, nomEleve, prenomEleve, libelleSection, note, pm.idMatiere FROM Notes n, Eleve e, Section s, Prof_Matiere pm WHERE pm.idMatiere = n.idMatiere AND n.idEleve = e.idEleve AND e.idSection = s.idSection AND pm.idProfesseur = ? AND s.idSection = ?",
            [req.session.userid[0]['idProfesseur'], id], (err, result, fields) => {
                // Si le résultat est vide : 
                if (typeof(result) == 'undefined' || Object(result) == '') {    
                    
                    // On récupère les élèves de la section 
                    bdd.module_connexion.query(
                        "SELECT idEleve, nomEleve, prenomEleve, libelleSection FROM Eleve e, Section s WHERE e.idSection = s.idSection AND s.idSection = ?",
                        [id], (err2, result2, fields) => {
                            // Si y a une erreur 
                            if (err) {
                                console.log(err2);    
                                res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue" + err.message});   
                            
                            // Si le résultat de la deuxième requête est vide
                            } else if (typeof(result2) == 'undefined' || Object(result2) == '') {
                                // On récupère la section 
                                bdd.module_connexion.query(
                                    "SELECT libelleSection FROM Section WHERE idSection = ?",
                                    [id], (err3, result3, fields) => {
                                        res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], section_null: result3});   
                                    });
            
                            // Si y a pas d'erreur ni de résultat vide
                            } else {
                                res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], section: result2});
                            }
                        }
                    );

                // Si y a une erreur 
                } else if (err) {
                    res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue" + err.message});

                // Si y a pas de résultat vide 
                } else {
                    // On récupère les élèves dans la section 
                    bdd.module_connexion.query(
                        "SELECT e.idEleve, nomEleve, prenomEleve FROM Eleve e, Section s WHERE e.idSection = s.idSection AND s.idSection = ?",
                        [id], (err, resEleve, fields) => {
                            console.log(resEleve);
                            console.log(result);
                            res.render('notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], eleves: resEleve, note: result});   
                    });

                }
            }
        );
    }
}

// On récupère les élèves
export function getEleve(req: Request, res: Response) {
    let id = req.params.id;

    // On récupère les élèves 
    bdd.module_connexion.query(
        "SELECT idEleve, nomEleve, prenomEleve, libelleSection FROM Eleve e, Section s WHERE e.idSection = s.idSection AND idEleve = ?", [id],
        (err, result, fields) => {
            
            // Si le résultat est vide 
            if (typeof(result) == 'undefined' || Object(result) == '') {                    
                console.log(result);
                res.render('saisie_notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur']});

            // Si y a des erreurs
            } else if (err) {
                res.render('saisie_notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue" + err.message});

            // Si y a ni résultat vide ni des erreurs 
            } else {
                console.log(result);
                // On récupère les matières et libellé 
                bdd.module_connexion.query(
                    "SELECT pm.idMatiere, libelle FROM Prof_Matiere pm, Matiere m WHERE pm.idMatiere = m.idMatiere AND idProfesseur = ?", [req.session.userid[0]['idProfesseur']],
                    (err, resM, fields) => { 
                        console.log(req.session.userid[0]['idProfesseur']);
                        console.log(resM);
                        console.log(result);
                        res.render('saisie_notes', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'],  idProf: req.session.userid[0]['idProfesseur'], eleve: result, matiere: resM});

                    });
            }
        }
    );

}

// Fonction d'ajout des notes
export function addNote(req: Request, res: Response) {
    let note = req.body.note;
    let idProf = req.body.idProf;
    let idMatiere = req.body.idMatiere;
    let idEleve = req.params.id;
    console.log(note, idProf, idMatiere, idEleve);
    
    // Insertion des notes 
    bdd.module_connexion.query(
        "INSERT INTO Notes (note, idProfesseur, idMatiere, idEleve) VALUES (?,?,?,?)", [note, idProf, idMatiere, idEleve],
        (err, result, fields) => {   
            // Si le résultat des vides
            if (typeof(result) == 'undefined' || Object(result) == '') {                    
                console.log(result);
                res.redirect('/prof/accueil');

            // Si y a des erreurs
            } else if (err) {
                res.redirect('/prof/accueil');

            // Si y a pas d'erreurs ni de résultat vide
            } else {
                res.redirect('/prof/accueil');
            }
        }
    );

}
