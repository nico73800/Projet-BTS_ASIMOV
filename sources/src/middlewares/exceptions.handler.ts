/**
 * Source : https://www.alsacreations.com/tuto/lire/1857-Creation-dune-API-REST-avec-Express-et-TypeScript.html 
 * fichier de gestion des erreurs
 */

import { NextFunction, Request, Response } from 'express'

/**
 * Middleware de gestion globale des erreurs
 *
 * @param err - L'erreur Express (peut être la notre ou une autre)
 * @param req - La requête initiale
 * @param res - L'objet de réponse
 * @param next - Permet de passer au middleware suivant si existant
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 */
export const ExceptionsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	/**
	 * Voir "The default error handler" dans la doc officielle indiquée plus haut
	 */
	if (res.headersSent) {
		return next(err);
	}

	/**
	 * Si c'est le cas, on sait que c'est notre propre erreur
	 */
	if (err.status && err.error) {
		return res
			.status(err.status)
			.send({ error: err.error })
	}

	/**
	 * Dans les autres cas, on retourne une erreur 500 (Internal Server Error)
	 */
	return res
		.status(500)
		.render("errors",{error: 'Erreur interne' })
}