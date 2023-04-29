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
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: true })

// Import pour générer des UUID (identifiant unique universel)
import { v4 as uuid } from 'uuid';

// Constante pour les Cross-origin resource sharing  
// Probablement penser à supprimer ça si inutile 
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

// Fonction de création d'un ID pour la session 
let sess_id = function () {
    console.log("Session ID Généré : " + uuid());
    return uuid();
}

// Option mysql pour permettre la connexion à un serveur de stockage des sessions 
const options = {
    connectionLimit: 10,
    user: 'root',
    password:'root',
    database: 'Asimov',
    host: 'localhost',
}

// Inutilisé à l'heure actuelle 
// const pool = mysql.createConnection(options);

// constante permettant le stockage des sessions dans une base de données MySQL
const MySQLStores = MySQLStore(expressSession);

// constante instanciant la constante de stockage des sessions dans mysql (constante précédente) 
const sessionsStore = new MySQLStores(options);


// Paramétrage des sessions
app.use(session({
    // nom de la session
    name: "AsiNote",
    // paramètre pour signer la session
    secret: "azertyuiop",
    // paramètre pour stocker la session 
    store: sessionsStore,
    // Force le "renouvellement" de la session à chaque changement 
    rolling: true,
    // permet d'enregistrer des sessions vides
    saveUninitialized: true,
    // génération des id de session
    genid: sess_id,
    // Les cookies :
    cookie: {
        // sécurisation de la page
        secure: false,
        // durée d'expiration du cookie 
        expires: new Date(Date.now() + 86400000),
        // Durée maximale d'existante du cookie 
        maxAge: 86400000,
        httpOnly: false
    },
    // Force la session a être restocké même si elle n'a pas été modifiée 
    resave: true,
}));

// Redeclaration du module session d'express
// Module personnalisé pour les sessions
declare module 'express-session' {
    export interface Session {
        session_id: string,
        userid: { [key: string]: any },
        message: string;
        error: string;
        typeSession : string;
        // matiereProf: { [key: string]: any };
        // classeProf: { [key: string]: any };
    }
}

// Middleware inutile : car il stocke les sessions même après le destroy 
// (Il les met en cache)
// app.use(function (req, res, next) {
//     express.request.session = req.session;
//     // req.session.session_id = sess_id();
//     next();
// });

// Accueil
app.get('/', (req:Request, res:Response, next) => {
    res.render('choix_auth');
});

// Routage vers l'authentification pour le rôle de l'utilisateur demandé (élève ou prof ou le choix de l'utilisateur)
app.post('/auth', urlencodedParser, (req:Request, res:Response, next) => {
    if (req.body.type == "prof") {
        req.session.typeSession = "prof";
        res.redirect('/prof/auth_prof');
        
    } else if (req.body.type == "eleve") {
        req.session.typeSession = "eleve";
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

// Routage du bouton présent dans les views des erreurs (page inexistante, non autorisé, etc.)
app.get('/redirect_handler', (req:Request, res:Response, NextFunction) => {
    console.log(req.session);
    // Si quand le bouton est cliqué : 
    // La section utilisateur existe + le type de session (aka le rôle de la personne (prof / élève)) n'est pas "undefined" 
    // On redirige vers :
    if (typeof req.session.userid !== 'undefined' && typeof req.session.typeSession !== 'undefined') {
        console.log(req.session);
        // La page prof
        if (req.session.typeSession === "prof") {
            res.redirect("/prof/accueil");
        // La page élève (non implémentée)
        } else if (req.session.typeSession == "eleve") {
            res.redirect('/logout');
        // On supprime les session + redirige vers l'accueil
        } else {
            res.redirect('/logout');
        }
    // Si les deux param sont undefined on vide les sessions + on redirige vers l'accueil
    } else {
        res.redirect('/logout');
    }
})

// Fonction de déconnexion 
app.get('/logout', (req:Request, res:Response, next) => {
    /// On détruit les sessions présentes dans Express
    req.session.destroy(err => {
        if (err) {
            console.log("Problème avec la session : " + err);
            res.redirect('/');
        }        
    });

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
