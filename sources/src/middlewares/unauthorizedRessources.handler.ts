/**
 * Fichier de gestion des erreurs 403 
 * Auteur : N
 */
import { Request, Response } from 'express';
import { UnauthorizedException } from '../utils/exceptions';

export const UnauthorizedHandler = (req: Request, res: Response) => {
    res.render("errors", {error:"Vous n'êtes pas authorisé.e à accéder à la ressource."});
}
