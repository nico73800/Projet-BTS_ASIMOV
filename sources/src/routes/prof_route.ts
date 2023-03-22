import * as ctrl_prof from "../resources/professeur/prof.ctrl";
import * as express from 'express';

export const router_prof = express.Router();

const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Routage des opérations CRUD
router_prof.post('/auth', urlencodedParser, ctrl_prof.auth);
