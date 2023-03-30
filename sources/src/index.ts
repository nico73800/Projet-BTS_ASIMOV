/**
 * Fichier main en typescript
 * Auteur : Nicolas CHALOYARD
 */

import express, { NextFunction, Request, Response } from 'express';
// import createError from 'http-errors';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import path from 'path';
import { router_prof } from './routes/prof_route';
import session from 'express-session';
import { Session } from 'express-session';
import { randomInt } from 'crypto';
import cookieParser from 'cookie-parser';
import sha1 from 'sha1';

const urlencodedparser = bodyParser.urlencoded({ extended: false});

// Redeclaration du module session d'express
declare module 'express-session' {
    export interface Session {
        userid: { [key: string]: any},
        message: string;
    }
}

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
    secret: "azertyuiop",
    saveUninitialized: true,
    // cookie: {maxAge: 30 * 60 * 1000},
    cookie: {maxAge: 30 * 60 * 1000 * 1000000000000},
    resave: false
}));

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.locals.session = req.session;
    next();
})

let sessions;

// Accueil
app.get('/', (req,res) => {
    sessions = req.session;
    res.render('connexion', {});
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
    console.log("Projet fonctionnel")
});
