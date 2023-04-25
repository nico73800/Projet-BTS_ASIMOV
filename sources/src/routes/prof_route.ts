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

// Routage vers l'authentification des enseignants 
router_prof.get('/auth_prof', ctrl_prof.connexion_page);

// Routage vers l'accueil : en passant par un formulaire d'authentification 
router_prof.post('/accueil', urlencodedParser, (req: Request, res: Response) => {
    console.log(req.session)
    ctrl_prof.accueil(req,res);
});

// Routage vers l'accueil : san passer par un formulaire d'authentification
// Nécessite d'avoir déjà été authentifié 
router_prof.get('/accueil', ctrl_prof.accueil_noauth);

// Routage vers la page des matières d'un enseignant 
router_prof.get('/matieres', (req: Request, res: Response) => {
    ctrl_prof.matiere(req, res);
});

// Routage vers la page classe d'un enseignant 
router_prof.get('/classes', (req: Request, res: Response) => {
    ctrl_prof.classe(req, res);
});

router_prof.get('/notes/:id', (req: Request, res: Response) => {
    ctrl_prof.noteParSection(req, res);
});

router_prof.get('/saisie_notes/:id',(req: Request, res: Response) => {
    ctrl_prof.getEleve(req, res);
});

router_prof.post('/addNote/:id',urlencodedParser, (req: Request, res: Response) => {
    ctrl_prof.addNote(req, res);
});