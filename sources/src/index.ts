/**
 * Fichier main en typescript
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
import { MemoryStore } from 'express-session';
import session from 'express-session';
import { NextFunction } from 'express';


let app = express();

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'))
app.use(express.json());


// Paramétrage des sessions 
app.use(cookieParser());
app.use(session({
    store: new MemoryStore(),
    secret: "azertyuiop",
    saveUninitialized: false,
    // cookie: {maxAge: 30 * 60 * 1000},
    cookie: { 
        secure: false, 
        maxAge: 30 * 60 * 1000 * 10000,
        httpOnly: false
    },
    name:'session',
    resave: false,
}));


// Redeclaration du module session d'express
declare module 'express-session' {
    export interface Session {
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
    // req.session = express.request.session;
    res.render('connexion');
});

app.use(function (req, res, next) {
    express.request.session = req.session;
    next();
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

// écoute du port 3000 sur l'adresse localhost
app.listen(3000, "127.0.0.1", () => {
    console.log("Projet fonctionnel");
});
