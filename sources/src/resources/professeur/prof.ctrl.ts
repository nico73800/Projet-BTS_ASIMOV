/**
 * Controleur Prof 
 */

import { Request, Response, NextFunction } from 'express';
import * as profService from "./prof.service";
import sessions, { Session } from 'express-session';
import * as express from 'express';

export function logout(req: Request, res: Response) {
    let session = req.session;
    session.destroy(function (err) {
        console.log("session inaccessible !");
    });
    res.redirect('/');
}

export function accueil(req: Request, res: Response) {
    let session = req.session;

    let id = req.body.usr_id;
    let pwd = req.body.pwd;

    profService.findProf(id, pwd, req, res);

    console.log("----------------");
    console.log(session.userid ? undefined: "paspok");


    if (typeof session.userid === 'undefined') {
        req.session.error = "Identifiant utilisateur inexistant !"
        res.redirect('/');
    } else {
        // res.send(session);
        profService.getMatiereProf(session['userid'][0]['idProfesseur'], req, res);
        profService.getClasseProf(session['userid'][0]['idProfesseur'], req, res);
        
        if (typeof session['classeProf'] == 'undefined') {
            res.render('accueil', { user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: session.matiereProf, classe: {} });
        
        } else if (typeof session['matiereProf'] == 'undefined') {
            res.render('accueil', { user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: {}, classe: session.classeProf });
        
        } else {
            res.render('accueil', { user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: session.matiereProf, classe: session.classeProf });
        }
    }
}