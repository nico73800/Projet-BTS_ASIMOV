/**
 * Controleur Prof 
 */

import { Request, Response } from "express";
import * as profService from "./prof.service";
let session;


export function auth(req: Request, res: Response) {
    let id = req.body.usr_id;
    let pwd = req.body.pwd;
    profService.findProf(id, pwd, req, res);
}

export function logout(req: Request, res: Response) {
    let session = req.session
    session.destroy(function(err) {
        console.log("session inaccessible !");
    });
    res.redirect('/');
}

export function accueil(req: Request, res: Response) {
    session = req.session;
    if (typeof session.userid == 'undefined') {
        res.redirect('/');
    } else {
        console.log(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);
        profService.getMatiereProf(session.userid[0]['idProfesseur'], req, res);
        profService.getClasseProf(session.userid[0]['idProfesseur'], req, res);
        if (typeof session.error !== 'undefined') {
            console.log(session.error);
            res.send(session.error);
        } else {
            res.render('accueil', {user: session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur'], matiere: session.matiereProf, classeProf: session.classeProf});
        }
    }
}