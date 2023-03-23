/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';

// Variable session
let session;

export function findProf(id: number, pwd: string, req: any, res: any) {
    if ((id == 0 || pwd == '') || id == undefined || pwd == undefined) {
        session = req.session;
        session.message = "Identifiant / mot de passe vide invalide ";
        res.render('connexion', {});
    } else {
        bdd.module_connexion.query("SELECT nomProfesseur, prenomProfesseur FROM professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
            try {
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
            } catch (err) {
                // res.redirect('/');
                res.send("err");
            }
        });
    }
}