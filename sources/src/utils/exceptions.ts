/**
 * Source : https://www.alsacreations.com/tuto/lire/1857-Creation-dune-API-REST-avec-Express-et-TypeScript.html
 * Fichier pour l'ensemble des exceptions
 */

import { ApiException } from '../../types/interface_exceptions';

/**
 * Implémentation de la classe ApiException (pour les exceptions personnalisées)
 */
export class Exception implements ApiException {
        constructor(readonly error: any, readonly status: number) {
    }
}

/**
 * Erreur 404
 */
export class NotFoundException extends Exception {
    constructor(error: any) {
        super(error, 404);
    }
}

/**
 * Erreur 401 : accès non autorisé (car pas authentifié)
 */
export class UnauthorizedException extends Exception {
    constructor(error: any) {
        super(error, 401);
    }
}

/**
 * Erreur 403 : accès interdit (pas les permissions d'accéder à la ressource)
 */
export class ForbiddenException extends Exception {
    constructor(error: any) {
        super(error, 403);
    }
}