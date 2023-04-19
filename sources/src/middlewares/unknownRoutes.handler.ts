/**
 * Source : https://www.alsacreations.com/tuto/lire/1857-Creation-dune-API-REST-avec-Express-et-TypeScript.html 
 * Fichier d'implémentation des erreur 404
 */

import { Request, Response } from 'express';
import { NotFoundException } from '../utils/exceptions';

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
export const UnknownRoutesHandler = (req: Request, res: Response) => {
    res.render("errors", {error:"La ressource demandée n'existe pas"})
    // throw new NotFoundException(`La ressource demandée n'existe pas`);
}

