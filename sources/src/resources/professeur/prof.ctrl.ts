/**
 * Controleur de la partie professeur 
 * Auteur : Nicolas Chaloyard
 */

import { Request, Response, NextFunction } from 'express';
import * as profService from "./prof.service";
import * as express from 'express';

// Fonction de déconnexion : au cas où sinon elle est pas là
export function logout(req: Request, res: Response) {
    // let session = req.session;
    req.session.destroy(function (err) {
        if (err) {
            console.log("Problème avec la session");
            
        }
        express.request.session = req.session;
        console.log(req.session);
        
        res.redirect('/');
    });
}

// Fonction accueil 
export function accueil(req: Request, res: Response) {
    let session = req.session;

    profService.findProf(req, res);
}

// Fonction accueil (utilisateur déjà authentifié)
export function accueil_noauth(req: Request, res: Response) {
    if (typeof req.session.userid === 'undefined') {
        req.session.error = "Identifiant utilisateur inexistant !"
        res.redirect('/');
    } else {
        res.render('accueil', { user: req.session.userid});
    }

}

// Fonction pour récupérer les matières
export function matiere(req: Request, res: Response) {
    if (typeof req.session.userid == 'undefined') {
        res.redirect('/');
    } else {
        console.log(req.session);
        
        profService.getMatiereProf(req.session.userid[0]['idProfesseur'], req, res);   
    }
}