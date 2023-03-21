/**
 * Fichier main en typescript
 * Auteur : Nicolas CHALOYARD
 */

import express from 'express';
// import createError from 'http-errors';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import path from 'path';
import { router_prof } from './routes/prof_route';
const urlencodedparser = bodyParser.urlencoded({ extended: false});

let app = express();

// Paramétrage de l'app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.set('public', path.join(__dirname, "public"));
app.use(express.static('src'))
app.use(express.json());


// Accueil
app.get('/', (req,res) => {
    // res.send(path.join('/', 'views'));
    res.render('connexion', {message:''});
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