/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';
import { Matiere } from '../../../types/class_matiere';
import { Request, Response } from 'express';

// Variable session
let session;

export function findProf(id: number, pwd: string, req: Request, res: Response) {
    if ((id == 0 || pwd == '') || id == undefined || pwd == undefined) {
        session = req.session;
        session.message = "Identifiant / mot de passe vide invalide ";
        res.render('connexion', {});
    } else {
        
        bdd.module_connexion.query("SELECT idProfesseur, nomProfesseur, prenomProfesseur FROM Professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
            if (err) {
                res.send("err" + err.message);

            } else {
                // res.redirect('/');
                if (result.toString() == '') {
                    session = req.session;
                    session.message = "Authentification incorrecte";
                    console.log(session);
                    res.redirect('/');
                } else {
                    session = req.session;
                    session.userid = result;
                    console.log(req.session);
                    
                    res.redirect('/prof/accueil');
                }
            }
        });
    }
}

export function getMatiereProf(idProf:number, req: Request, res: Response) {
    bdd.module_connexion.query(
        "SELECT m.idMatiere, libelle FROM Matiere m, Prof_Matiere pm  WHERE pm.idMatiere = m.idMatiere AND pm.idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                session = req.session;
                session.error = err.message.toString();
            } else {
                session = req.session;
                session.matiereProf = result;
                console.log(session.matiereProf);
                
                // res.redirect('/prof/accueil');
            }
        });
}

export function getClasseProf(idProf:number, req: Request, res: Response) {
    bdd.module_connexion.query(
        "SELECT idSection, libelleSection FROM Section WHERE anneeSection='2023' AND idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                session = req.session;
                session.error = err.message.toString();
            } else {
                session = req.session;
                session.classeProf = result;
                console.log(session.classeProf);
                
                // res.redirect('/prof/accueil');
            }
        });
}