/**
 * Fichier des données de la table professeur 
 */
import { Professeur } from '../../../types/classe_prof';
import * as bdd from '../../connexion_bdd';


export class profService {
    public prof: Professeur;

    findAll() {
        bdd.module_connexion.query("SELECT * FROM Prof",(err, result, fields) => {
            if (!err) {
                if (result == null) {
                    // a finir
                }
            }
        });
    }
}
