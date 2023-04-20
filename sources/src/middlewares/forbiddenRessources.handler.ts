/**
 * Fichier de gestion des erreurs 403 
 */

import { Request, Response } from 'express';
import { ForbiddenException } from '../utils/exceptions';

export const ForbiddenRessourceHandler = (req: Request, res: Response) => {
    res.render("errors", {error:"Vous n'avez pas les droits pour acccéder à la ressource"})

}