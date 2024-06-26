//? маршрути що стосуються фільмів
import express from 'express';
import {
  getAllMoviesController,
  getMovieByIdController,
} from '../controllers/movies-controllers.js';

const moviesRouter = express.Router();

// звичайний маршрут отримання всіх фільмів
moviesRouter.get('/', getAllMoviesController);

// динамічний маршрут (знаходження по id)
moviesRouter.get('/:id', getMovieByIdController);

export default moviesRouter;
