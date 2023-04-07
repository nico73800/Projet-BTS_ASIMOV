/**
 * Controleur de la partie professeur 
 * Auteur : Nicolas Chaloyard
 */

import { Request, Response, NextFunction } from 'express';
import * as profService from "./prof.service";
import sessions, { Session } from 'express-session';
import * as express from 'express';

export function logout(req: Request, res: Response) {
    let session = req.session;
    session.destroy(function (err) {
        if (err) {
            console.log("Problème avec la session");
            
        } else {
            console.log("session Détruite !");
            express.request.session = req.session;
            res.redirect('/');
    
        }
    });
}

export function accueil(req: Request, res: Response) {
    let session = req.session;

    profService.findProf(req, res);

    console.log("----------------");
    console.log(session.userid);


    if (typeof session.userid === 'undefined') {
        req.session.error = "Identifiant utilisateur inexistant !"
        res.redirect('/');
    } else {
        res.render('accueil', { user: req.session.userid[0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur']});
    }
}


export function accueil_noauth(req: Request, res: Response) {
    if (typeof req.session.userid === 'undefined') {
        req.session.error = "Identifiant utilisateur inexistant !"
        res.redirect('/');
    } else {
        res.render('accueil', { user: req.session.userid[0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur']});
    }

}

export function matiere(req: Request, res: Response) {
    // let session = req.session.userid;
    // res.send(req.session.userid[0]);
    profService.getMatiereProf(req.session.userid[0]['idProfesseur'], req, res);   
}