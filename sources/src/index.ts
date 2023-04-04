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
import sessions from 'express-session';
import cookieParser from 'cookie-parser';


const urlencodedparser = bodyParser.urlencoded({ extended: true});

// Redeclaration du module session d'express

declare module 'express-session' {
    export interface SessionData {
        userid: { [key: string]: any},
        message: string;
        matiereProf: { [key: string]: any};
        classeProf: { [key: string]: any};
        error: string;
    }
}

let app = express();

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'))
// app.use(urlencodedparser);
app.use(express.json());

// const CI = process.env.CI;
// const server = express().disable('x-powered-by');

// Paramétrage des sessions 
app.use(cookieParser());

app.use(sessions({
    secret: "azertyuiop",
    saveUninitialized: true,
    // cookie: {maxAge: 30 * 60 * 1000},
    cookie: { secure: true, maxAge: 30 * 60 * 1000 * 10000 },
    resave: false
}));

app.use(function(req:Request, res:Response, next:NextFunction) {
    // res.locals = req.session;
    // res.locals.message = req.session.message;
    // res.locals.error = req.session.error;
    // res.locals.session = req.session;
    next();
})

// let session;

// Accueil
app.get('/', function(req:Request, res:Response) {
    // res.locals.message = req.session.message;
    // res.locals.error = req.session.error;
    res.render('connexion');
});

// Ajouter les routes ici 
//--
app.use('/prof', router_prof);

//--

// Pour toutes les routes non définies
app.all('*', UnknownRoutesHandler);

// Gestion des erreurs 
// Doit être le dernier use
// app.use(ExceptionsHandler);

// écoute du port 3000 sur l'adresse localhost
app.listen(3000, "127.0.0.1", () => {
    console.log("Projet fonctionnel");
});
