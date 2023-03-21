/**
 * Source : https://www.alsacreations.com/tuto/lire/1857-Creation-dune-API-REST-avec-Express-et-TypeScript.html 
 * Interface pour exceptions personnalisées 
 */

export interface ApiException {
    error: any;
    status: number;
}