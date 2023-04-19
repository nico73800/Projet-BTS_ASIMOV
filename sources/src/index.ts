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
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import * as expressSession from 'express-session';
import * as mysql from 'mysql2';
import cors from 'cors';
import MySQLStore from "express-mysql-session";
import { Request, Response } from 'express';
import session from 'express-session';

let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: true })

// Constnate pour générer des UUID (identifiant unique universel)
const genuuid = require('uuid');
// const MySQLStore = require('express-mysql-session');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions));

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'));
app.use(bodyParser.json());
app.use(express.json());

const options = {
    connectionLimit: 10,
    user: 'root',
    password: 'root',
    database: 'Asimov',
    host: 'localhost',
    port: 3306,
}

let sess_id = function () {
    console.log("Session ID Généré : " + genuuid.v4());
    return genuuid.v4();
}

const pool = mysql.createConnection(options);

// Création de la table session dans une base de données MySQL
// Utile pour le stockage d'une session dans un serveur
const MySQLStores = MySQLStore(expressSession);
const sessionsStore = new MySQLStores(options);


// Paramétrage des sessions 
app.use(session({
    name: "AsiNote",
    secret: "azertyuiop",
    store: sessionsStore,
    rolling: true,
    saveUninitialized: true,
    genid: sess_id,
    cookie: {
        secure: false,
        expires: new Date(Date.now() + 86400000),
        maxAge: 86400000,
        httpOnly: false
    },
    resave: true,
}));

// Redeclaration du module session d'express
// Module personnalisé pour les sessions
declare module 'express-session' {
    export interface Session {
        session_id: any,
        userid: { [key: string]: any },
        message: string;
        error: string;
        // matiereProf: { [key: string]: any };
        // classeProf: { [key: string]: any };
    }
}

// Middleware inutile : car il stocke les sessions même après le destroy 
// (Il les mets en cache)
// app.use(function (req, res, next) {
//     express.request.session = req.session;
//     // req.session.session_id = sess_id();
//     next();
// });

// Accueil
app.get('/', (req:Request, res:Response, next) => {
    res.render('choix_auth');
});

// Routage vers l'authentification pour le rôle de l'utilisateur demandé (élève ou prof)
app.post('/auth', urlencodedParser, (req:Request, res:Response, next) => {
    if (req.body.type == "prof") {
        res.redirect('/prof/auth_prof');
    } else if (req.body.type == "eleve") {
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

// Fonction de déconnexion 
app.get('/logout', (req:Request, res:Response, next) => {
    /// On détruit les sessions présentes dans Express
    req.session.destroy((err => {
        if (err) {
            console.log("Problème avec la session : " + err);
            res.redirect('/');
        }        
    }));

    // On détruit le stockage des sessions dans MySQL
    sessionsStore.clear((err => {
        if (err) {
            console.log("Problème avec la session : " + err);
        }
    }));

    // On nettoie les cookies
    res.clearCookie("AsiNote");

    // Et on redirige vers la page d'accueil
    res.redirect('/');


});

// Ajouter les routes ici 
//--
app.use('/prof', router_prof);

//--

// Pour toutes les routes non définies
app.all('*', UnknownRoutesHandler);

// Gestion des erreurs 
// Doit être le dernier use
app.use(ExceptionsHandler);

// écoute du port 3000 sur l'adresse spécifiée
app.listen(3000, "0.0.0.0", () => {
    console.log("Projet fonctionnel");
});
