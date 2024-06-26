//? маршрути що стосуються фільмів
import express from 'express';
import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
  updateMovieController,
  patchMovieController,
  deleteMovieController,
} from '../controllers/movies-controllers.js';

import ctrWrapper from '../utils/controllerWrapper.js';

import isValidId from '../middlewares/isValidID.js';

const moviesRouter = express.Router();

//? ОТРИМАТИ ВСІ ДАНІ GET
moviesRouter.get('/', ctrWrapper(getAllMoviesController));

//? ДИНАМІЧНИЙ МАРШРУТ (знаходження по id) (id - це лише динамічна змінна)
moviesRouter.get('/:id', isValidId, ctrWrapper(getMovieByIdController));

//? ДОДАВАННЯ POST
//додавання на головну одресу тому /
moviesRouter.post('/', ctrWrapper(addMovieController));

//? ОНОВЛЕННЯ(ЗАМІНА) повністю PUT
//в проєктах put запит може виконувати різні речі
//-- (десь повністю оновлювати(замінюють) дані) якщо ми змінюємо одне поле, то друге пишемо таке як було,
//-- в деяких проєктах put викор для часткового оновлення,
//-- в деяких проєктах put може створювати об'єкт якщо такого немає, або викидати помилку 404 -- цей варіант зараз робимо

moviesRouter.put('/:id', isValidId, ctrWrapper(updateMovieController));

//? ОНОВЛЕННЯ частково PATCH

moviesRouter.patch('/:id', isValidId, ctrWrapper(patchMovieController));

//? ВИДАЛЕННЯ DELETE
moviesRouter.delete('/:id', isValidId, ctrWrapper(deleteMovieController));

export default moviesRouter;
