import * as ctrl_prof from "../resources/professeur/prof.ctrl";
import * as express from 'express';

export const router_prof = express.Router();

const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Routage des opérations CRUD
router_prof.post('/auth', urlencodedParser, ctrl_prof.auth);
router_prof.get('/logout', ctrl_prof.logout);
router_prof.get('/accueil', ctrl_prof.accueil);