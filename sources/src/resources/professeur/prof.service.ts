/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';
import { Matiere } from '../../../types/class_matiere';

// Variable session
let session;

export function findProf(id: number, pwd: string, req: any, res: any) {
    if ((id == 0 || pwd == '') || id == undefined || pwd == undefined) {
        session = req.session;
        session.message = "Identifiant / mot de passe vide invalide ";
        res.render('connexion', {});
    } else {
        
        bdd.module_connexion.query("SELECT idProfesseur, nomProfesseur, prenomProfesseur FROM professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
            if (err) {
                res.send("err");

            } else {
                // res.redirect('/');
                if (result.toString() == '') {
                    session = req.session;
                    session.message = "Authentification incorrecte";
                    console.log(session);
                    res.redirect('/');
                } else {
                    session=req.session;
                    session.userid = result;
                    console.log(req.session);
                    
                    res.redirect('/prof/accueil');
                }
            }
        });
    }
}

export function getInfoProf(idProf:number, req: any, res: any) {
        bdd.module_connexion.query(
            "SELECT idMatiere, libelle FROM matiere m, prof_matiere pm, professeur p WHERE p.idProfesseur = pm.idProfesseur AND pm.idMatiere = m.idMatiere AND p.idProfesseur = ?", 
            [idProf], (err, result, fields) => {
                if (err) {
                    return err;
                } else {
                    return result;
                }
            });
    
}