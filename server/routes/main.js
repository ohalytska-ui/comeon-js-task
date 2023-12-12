import express from 'express';
import usersController from '../controllers/mainController.js';

const mainRoutes = express.Router();

mainRoutes.post('/login', usersController.login);
mainRoutes.post('/logout', usersController.logout);
mainRoutes.get('/games', usersController.getGames);
mainRoutes.get('/categories', usersController.getCategories);

export default mainRoutes;
