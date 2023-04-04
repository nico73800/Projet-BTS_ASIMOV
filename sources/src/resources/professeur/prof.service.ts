/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';
import { Matiere } from '../../../types/class_matiere';
import { Request, Response } from 'express';
// import sessions from 'express-session';

let session;

export function findProf(id: number, pwd: string, req: Request, res: Response) {
    session = req.session;
    if ((id == 0 || pwd == '') || (id == undefined || pwd == undefined)) {
        session.message = "Identifiant / mot de passe vide invalide ";
        console.log(session.message);
        // res.render('connexion', {message:session.message});
    } else {
        bdd.module_connexion.query("SELECT idProfesseur, nomProfesseur, prenomProfesseur FROM Professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
            session = req.session;
            if (err) {
                session.message = "err" + err.message;
            } else {
                // res.redirect('/');
                if (result.toString() == '') {
                    session.message = "Authentification incorrecte";
                    // req.session.save();
                    // res.redirect('/');
                    // res.send(result);
                } else {
                    session.userid = result;
                    console.log(session.userid);
                    // req.session.save();
                    // console.log(req.session);
                    // res.redirect('/prof/accueil');
                }
            }
        });
    }
}

export function getMatiereProf(idProf:number, req: Request, res: Response) {
    session = req.session;
    bdd.module_connexion.query(
        "SELECT m.idMatiere, libelle FROM Matiere m, Prof_Matiere pm WHERE pm.idMatiere = m.idMatiere AND pm.idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            session = req.session;
            if (err) {
                session.error = err.message.toString();
            } else {
                if (result.toString() == '') {
                    session.error = "Pas de données";
                } else {
                    session.matiereProf = result;
                    console.log(session);
                }
                // req.session.save();
                // req.session.save();
                // console.log(session.matiereProf);
                
                // res.redirect('/prof/accueil');
            }
            // session.save();
        });
}

export function getClasseProf(idProf: number, req: Request, res: Response) {
    let session = req.session;
    bdd.module_connexion.query(
        "SELECT idSection, libelleSection FROM Section WHERE idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                session.error = err.message.toString();
            } else {
                session.classeProf = result;
                // req.session.save();
                // console.log(session.classeProf);
                
                // res.redirect('/prof/accueil');
            }
            // session.save();
        });
}