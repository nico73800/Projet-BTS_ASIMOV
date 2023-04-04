/**
 * Controleur Prof 
 */

import { Request, Response } from "express";
import * as profService from "./prof.service";
import sessions from 'express-session';

// export function auth(req: Request, res: Response) {

let session;

// }

export function logout(req: Request, res: Response) {
    session = req.session;
    session.destroy(function(err) {
        console.log("session inaccessible !");
    });
    res.redirect('/');
}

export function accueil(req: Request, res: Response) {
    let id = req.body.usr_id;
    let pwd = req.body.pwd;
    profService.findProf(id, pwd, req, res);

    session = req.session;   
    // res.locals.message = req.session.message;
    // res.locals.userid = req.session.userid;
    // res.locals.error = req.session.error;

    console.log(req.session);
    // console.log(res.locals);
    
    
    
    if (typeof res.locals.userid === 'undefined') {
        console.log("CA MARCHE PAS");
        res.redirect('/');
    } else {
        // console.log(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);
        profService.getMatiereProf(res.locals.userid[0]['idProfesseur'], req, res);
        profService.getClasseProf(res.locals.userid[0]['idProfesseur'], req, res);
        if (typeof res.locals.error == 'undefined') {
            console.log(res.locals.error);
            res.send(res.locals.error);
        } else {
            console.log(session);
            // res.send(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);

            // res.render('accueil', {user: session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur'], matiere: session.matiereProf, classe: session.classeProf});
            res.render('accueil', {user: res.locals.userid[0]['nomProfesseur'] + " " + res.locals.userid[0]['prenomProfesseur'], matiere: session.matiereProf, classe: session.classeProf});
            // res.send(session);
            // res.send(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);            
        }
    }
}