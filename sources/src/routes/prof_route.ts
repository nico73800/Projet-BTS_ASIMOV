import * as ctrl_prof from "../resources/professeur/prof.ctrl";
import express from 'express';

export const router_prof = express.Router();

const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Routage des opérations CRUD
router_prof.get('/auth', ctrl_prof.auth);
