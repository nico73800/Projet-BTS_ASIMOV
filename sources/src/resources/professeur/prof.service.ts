/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';


export function findAll(id: number, pwd: string, req: any, res: any) {
    if (id == 0 || pwd == '') {
        res.render('connexion', {message: "Identifiant / mot de passe vide "});
    } else {
        bdd.module_connexion.query("SELECT nomProfesseur, prenomProfesseur FROM professeur WHERE idProfesseur = ? AND password = SHA1(?)", [id, pwd] ,(err, result, fields) => {
            if (!err) {
                if (result.toString() == '') {
                    res.render('connexion', {message: "Identifiant / mot de passe inconnu ou incorrect "});
                } else {
                    res.render('accueil', {message: result});
                }
            } else {
                res.send(err);
                // res.redirect('/');
            }
        });
    }
}