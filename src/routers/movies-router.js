//? маршрути що стосуються фільмів
import express from 'express';
import {
  getAllMoviesController,
  getMovieByIdController,
} from '../controllers/movies-controllers.js';

import ctrWrapper from '../utils/controllerWrapper.js';

import isValidId from '../middlewares/isValidID.js';

const moviesRouter = express.Router();

// звичайний маршрут отримання всіх фільмів
moviesRouter.get('/', ctrWrapper(getAllMoviesController));

// динамічний маршрут (знаходження по id)
moviesRouter.get('/:id', isValidId, ctrWrapper(getMovieByIdController));

export default moviesRouter;
