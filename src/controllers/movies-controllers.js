//* контролер - це запит до бази і відповідь з неї, яку ми передаємо на фронтенд -- ТЕ ЩО ВІДПРАВЛЯЄМО НА ФРОНТ

import {
  addMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  upsertMovie,
} from '../services/movies-services.js';
import createHttpError from 'http-errors';

//GET
export const getAllMoviesController = async (req, res) => {
  //у mongoose метод find який знаходить все(якщо нічого не вказано) або щось одне

  const data = await getMovies(); //! запит до бази

  res.json({
    status: 200,
    data,
    message: 'Success found movies',
  }); //! відправляємо відповідь на фронтенд
  // } catch (error) {
  //   next(error); //? якщо у функцію некст передаємо об'єкт помилок то він шукає обродник помилок (midleware де є 4 параметри)
  //   // res.status(500).json({
  //   //   status: 500, //*це не обо'язковий статус(вказівка для фронтенду), головне той що зверху res.status()
  //   //   message: error.message,
  //   //   data: error,
  //   // });
  // }
};
//GET/:id
export const getMovieByIdController = async (req, res) => {
  //? :id - це як змінна
  // console.log(req.params); // {id: refreferferfre} - айді можемо витягнути так
  // якщо ми ввели неправильний айді то mongoose сам викидає помилку, тому огортаємо в try catch

  const { id } = req.params;
  const data = await getMovieById(id);

  // якщо нам повернувся null, тобто такого id немає,  створюємо помилку и викидаємо її, вона переходить у розділ catch де потім переходить  у errorHandler
  if (!data) {
    throw createHttpError(404, `Movies with ${id} not found`); //? функція приймає статус і текст
    // const error = new Error(`Movies with ${id} not found`);
    // error.status = 404;
    // throw error;
  }
  res.json({
    status: 200,
    data,
    message: `Success found movie by id ${id}`,
  });
  // } catch (error) {
  //   next(error);
  // }
};

//POST
export const addMovieController = async (req, res) => {
  //*тіло запиту збергіється в req.body
  // console.log(req.body);

  const data = await addMovie(req.body);

  res.status(201).json({
    status: 201,
    data,
    message: 'Success add movie',
  });
};

// PUT/:id

export const updateMovieController = async (req, res) => {
  const { id } = req.params;

  const data = await upsertMovie({ _id: id }, req.body, { upsert: true }); // upsert: true -- якщо немає такого об'єкту то додає

  const status = data.isNew ? 201 : 200;
  const message = data.isNew ? 'Success create movie' : 'Success update movie';

  res.json({
    status,
    data: data.value,
    message,
  });
};

// PATCH/:id

export const patchMovieController = async (req, res) => {
  const { id } = req.params;
  const result = await upsertMovie({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, 'Movie not exist');
  }
  res.json({
    status: 200,
    message: 'Movie updated successfully',
    data: result.data,
  });
};

//DELETE /:id

export const deleteMovieController = async (req, res) => {
  const { id } = req.params;

  const result = await deleteMovie({ _id: id });

  if (!result) {
    throw createHttpError(404, 'Movie not exist');
  }
  res.json({
    status: 200,
    message: 'Movie delete successfully',
    data: result,
  });
};
