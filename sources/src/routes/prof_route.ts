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
    ctrl_prof.accueil(req,res);
});

router_prof.get('/logout', (req: Request, res: Response) => {
    // req.session = express.request.session;
    // express.request.session = req.session;
    ctrl_prof.logout(req,res);
});
