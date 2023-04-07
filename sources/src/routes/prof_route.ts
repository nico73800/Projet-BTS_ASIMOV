/**
 * Fichier des routes de la partie professeur 
 * Auteur : Nicolas CHALOYARD
 */

import { Request, Response } from "express";
import * as ctrl_prof from "../resources/professeur/prof.ctrl";
import * as express from 'express';

export const router_prof = express.Router();

const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: true })

// Routage des opérations CRUD
router_prof.post('/accueil', urlencodedParser, (req: Request, res: Response) => {
    // req.session = express.request.session;
    // express.request.session = req.session;
    console.log(req.session);
    
    ctrl_prof.accueil(req,res);
});

router_prof.get('/accueil', ctrl_prof.accueil_noauth);

// router_prof.post('/logout', (req: Request, res: Response) => {
//     // req.session = express.request.session;
//     // express.request.session = req.session;
//     ctrl_prof.logout(req,res);
// });


router_prof.get('/matieres', (req: Request, res: Response) => {
    // req.session = express.request.session;
    // express.request.session = req.session;
    ctrl_prof.matiere(req, res);
});