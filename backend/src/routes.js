const express = require('express');
const ongController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')

const routes = express.Router();

// ROTAS DAS ONGS
routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);

// ROTAS DOS INCIDENTES
routes.get('/incidents', incidentController.list);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

// ROTAS DOS PROFILES
routes.get('/profile', profileController.list);

// ROTAS DA SESSION
routes.post('/session', sessionController.create);



module.exports = routes;