/**
 * Classe des matieres
 * Auteur : Nicolas CHALOYARD
 */

import { RowDataPacket } from "mysql2";


export interface Matiere extends RowDataPacket {
    idMatiere: number;
    libelle: string;

}