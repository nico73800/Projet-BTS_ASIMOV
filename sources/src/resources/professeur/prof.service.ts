/**
 * Fichier modèle pour la partie prof   
 * Auteur : Nicolas CHALOYARD
 */

import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';
import { Matiere } from '../../../types/class_matiere';
import { Request, Response } from 'express';
import * as express from 'express';

export function findProf(req: Request, res: Response) {
    let id = req.body.usr_id;
    let pwd = req.body.pwd;

    try {
        let session = req.session;
        if ((id == 0 || pwd == '') || (id == undefined || pwd == undefined)) {
            session.message = "Identifiant / mot de passe vide invalide ";
            console.log(session.message);
            res.render('connexion', {message:session.message});
        } else {
            bdd.module_connexion.query("SELECT idProfesseur, nomProfesseur, prenomProfesseur FROM Professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
                // session = req.session;
                if (err) {
                    session.message = "err" + err.message;
                } else {
                    // res.redirect('/');
                    if (result.toString() == '') {
                        session.message = "Authentification incorrecte";
                        console.log(session.message);
                        // res.redirect('/');
                        // res.send(result);
                    } else {
                        session.userid = result;
                        console.log(req.session);
                        // res.redirect('/prof/accueil');
                    }
                }
            });
        }
    } catch (error) {
        res.send("Service en  maintenance !");
        console.log(error);
    }
}

export function getMatiereProf(idProf:number, req: Request, res: Response) {
    let session = req.session;
    bdd.module_connexion.query(
        "SELECT m.idMatiere, libelle FROM Matiere m, Prof_Matiere pm WHERE pm.idMatiere = m.idMatiere AND pm.idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            // session = req.session;
            if (err) {
                res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], error: "Une erreur est survenue :" + err.message});
            } else {
                if (result.toString() == '') {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], matiere: "Aucune matière"});
                } else {
                    res.render('matieres', {user: req.session.userid[0]['nomProfesseur'] + " " + req.session.userid[0]['prenomProfesseur'], matiere: result});
                }

            }
        });
}

export function getClasseProf(idProf: number, req: Request, res: Response) {
    let session = req.session;
    bdd.module_connexion.query(
        "SELECT idSection, libelleSection FROM Section WHERE idProfesseur = ?", 
        [idProf], (err, result, fields) => {
            if (err) {
                session['error'] = err.message.toString();
            } else {
                session['classeProf'] = result;
                // req.session.save();
                // console.log(session.classeProf);
                
                // res.redirect('/prof/accueil');
            }
            // session.save();
        });
}