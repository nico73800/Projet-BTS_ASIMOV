/**
 * Controleur Prof 
 */

import * as profService from "./prof.service";
import { getInfoProf } from './prof.service';
let session;


export function auth(req: any, res: any) {
    let id = req.body.usr_id;
    let pwd = req.body.pwd;
    profService.findProf(id, pwd, req, res);
}

export function logout(req: any, res: any) {
    req.session.destroy();
    res.redirect('/');
}

export function accueil(req: any, res:any) {
    session = req.session;
    if (typeof session.userid == 'undefined') {
        res.redirect('/');
    } else {
        console.log(session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']);        
        res.render('accueil', {user: session.userid[0]['nomProfesseur'] + " " + session.userid[0]['prenomProfesseur']});
    }
    
}