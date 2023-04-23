/**
 * Controleur de la partie professeur 
 * Auteur : Nicolas Chaloyard
 */

import { Request, Response, NextFunction } from 'express';
import * as profService from "./prof.service";
import * as express from 'express';

// Fonction de génération de la page d'authentification 
export function connexion_page(req: Request, res: Response) {
    res.render('connexion_prof');
}


// Fonction de déconnexion : inutilisée à l'heure actuelle
export function logout(req: Request, res: Response) {
    req.session.destroy(function (err) {
        if (err) {
            console.log("Problème avec la session");
            
        }
        res.redirect('/');
    });
}

// Fonction accueil 
export function accueil(req: Request, res: Response) {
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
    // On test si l'id utilisateur est non défini
    if (typeof req.session.userid == 'undefined') {
        res.redirect('/');
    // Si non : alors on redirige vers la page demandée
    } else {
        // console.log(req.session);
        profService.getMatiereProf(req.session.userid[0]['idProfesseur'], req, res);   
    }
}

// Fonction pour récupérer les classes
export function classe(req: Request, res: Response) {
    // On test si l'id utilisateur est non défini
    if (typeof req.session.userid == 'undefined') {
        res.redirect('/');
    // Si non : alors on redirige vers la page demandée
    } else {
        profService.getClasseProf(req.session.userid[0]['idProfesseur'], req, res);   
    }
}

// Fonction pour récupérer les notes d'une section
export function noteParSection(req: Request, res: Response) {
    // On test si l'id utilisateur est non défini
    if (typeof req.session.userid == 'undefined') {
        res.redirect('/');
    // Si non : alors on redirige vers la page demandée
    } else {        
        profService.getNoteClasse(req, res);   
    }
}