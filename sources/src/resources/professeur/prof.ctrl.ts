/**
 * Controleur Prof 
 */

import { Request, Response, NextFunction } from 'express';
import * as profService from "./prof.service";
import sessions, { Session } from 'express-session';
import * as express from 'express';

let session;

// export function auth(req: Request, res: Response) {

// }

export function logout(req: Request, res: Response) {
    session = req.session;
    session.destroy(function(err) {
        console.log("session inaccessible !");
    });
    res.redirect('/');
}

export function accueil(req: Request, res: Response) {
    session = req.session;

    let id = req.body.usr_id;
    let pwd = req.body.pwd;

    profService.findProf(id, pwd, req, res);        

    // session = req.session;   
    // res.locals.message = req.session.message;
    // res.locals.userid = req.session.userid;
    // res.locals.error = req.session.error;

    // session.reload;
    // console.log(req.session);
    console.log("----------------");
    console.log(session['userid']);
    
    if (typeof session['userid'] == 'undefined') {
        res.redirect('/');
    } else {
        // console.log(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);
        profService.getMatiereProf(session['userid'][0]['idProfesseur'], req, res);
        profService.getClasseProf(session['userid'][0]['idProfesseur'], req, res);
        if (typeof session['classeProf'] == 'undefined') {
            res.render('accueil', {user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: session.matiereProf, classe: {}});
        } else if (typeof session['matiereProf'] == 'undefined') {
            res.render('accueil', {user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: {}, classe: session.classeProf});
        } else {
            res.render('accueil', {user: req.session['userid'][0]['nomProfesseur'] + " " + req.session['userid'][0]['prenomProfesseur'], matiere: session.matiereProf, classe: session.classeProf});
        }
    }
}