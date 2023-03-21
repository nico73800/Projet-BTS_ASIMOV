/**
 * Fichier de gestion des erreurs 403 
 * Auteur : N
 */

import { UnauthorizedException } from '../utils/exceptions';

export const UnauthorizedHandler = () => {
    throw new UnauthorizedException("Vous n'êtes pas authorisé.e à accéder à la ressource.");
}
