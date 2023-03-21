/**
 * Fichier de gestion des erreurs 403 
 */

import { ForbiddenException } from '../utils/exceptions';

export const ForbiddenRessourceHandler = () => {
    throw new ForbiddenException("Vous n'avez pas les droits pour acccéder à la ressource");
}