/**
 * Fichier main en typescript
 * Auteur : Nicolas CHALOYARD
 */

import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import path from 'path';
import { router_prof } from './routes/prof_route';
import session from 'express-session';
import { NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { createClient } from "redis";
import RedisStore from 'connect-redis';

const urlencodedparser = bodyParser.urlencoded({ extended: true});

let app = express();

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'))
app.use(express.json());

const redisClient = createClient();

redisClient.on('error', err => console.log("Redis Client Error", err));

// Pas oublié de start le server redis sur WSL Debian
redisClient.connect();
redisClient.set('key', 'value');
const redisStore = (session);

// Paramétrage des sessions 
app.use(cookieParser());
app.use(session({
    secret: "azertyuiop",
    saveUninitialized: false,
    // cookie: {maxAge: 30 * 60 * 1000},
    cookie: { 
        secure: true, 
        maxAge: 30 * 60 * 1000 * 10000,
        httpOnly: false
    },
    resave: true,
}));

// Redeclaration du module session d'express
declare module 'express-session' {
    export interface Session {
        userid: { [key: string]: any},
        message?: string;
        matiereProf?: { [key: string]: any};
        classeProf?: { [key: string]: any};
        error?: string;
    }
}

// Accueil
app.get('/', function(req, res, next) {
    // req.session = express.request.session;
    res.render('connexion');
});

app.use(function (req, res, next) {
    let err = req.session.error;
    req.session.error = "";
    if (err) {
        res.locals.message = err;
        next();
    }
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
