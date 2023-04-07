/**
 * Fichier principal de l'application
 * Auteur : Nicolas CHALOYARD
 */

import ejs from 'ejs';
import express from 'express';
import bodyParser from 'body-parser';
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler';
import path from 'path';
import { router_prof } from './routes/prof_route';
import cookieParser from 'cookie-parser';
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import session from 'express-session';
import * as mysql from 'mysql2';

let app = express();

const genuuid = require('uuid');
const MySQLStore = require('express-mysql-session')(session);

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'))
app.use(express.json());

const options ={
    connectionLimit: 10,
    user: 'root',
    password: 'root',
    database: 'Asimov',
    host: 'localhost',
    port: 3306
}

let sess_id = function() {
    console.log("Session ID Généré : " + genuuid.v4());
    return genuuid.v4();
}

const pool = mysql.createConnection(options);

const sessionStore = new MySQLStore({}, pool);

// Paramétrage des sessions 
app.use(cookieParser());
app.use(session({
    name: "AsiNote",
    store: sessionStore,
    secret: "azertyuiop",
    rolling:true,
    saveUninitialized: false,
    genid: sess_id,
    // cookie: {maxAge: 30 * 60 * 1000},
    cookie: { 
        secure: false, 
        maxAge: 30 * 60 * 1000 * 10000,
        httpOnly: false
    },
    resave: false,
}));


// Redeclaration du module session d'express
declare module 'express-session' {
    export interface Session {
        session_id: any,
        userid: { [key: string]: any},
        message: string;
        matiereProf: { [key: string]: any};
        classeProf: { [key: string]: any};
        error: string;
    }
}

// Accueil
app.get('/', function(req, res, next) {
    express.request.session = req.session;
    req.session.session_id = sess_id();
    // req.session = express.request.session;
    res.render('connexion');
});

app.use(function (req, res, next) {
    express.request.session = req.session;
    req.session.session_id = sess_id();
    next();
});

// Ajouter les routes ici 
//--
app.use('/prof', router_prof);

//--

// Pour toutes les routes non définies
// app.all('*', UnknownRoutesHandler);

// Gestion des erreurs 
// Doit être le dernier use
// app.use(ExceptionsHandler);

// écoute du port 3000 sur l'adresse localhost
app.listen(3000, "127.0.0.1", () => {
    console.log("Projet fonctionnel");
});
