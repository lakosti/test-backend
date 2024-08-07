//* контролер - це запит до бази і відповідь з неї, яку ми передаємо на фронтенд -- ТЕ ЩО ВІДПРАВЛЯЄМО НА ФРОНТ
//? req.params -- те що іде після /: у маршруті (змінна по типу id)
//? req.query -- те шо ми пишемо в параметри запиту після ? повертається нам у вигляді об'єкта (тип даних строка - його необхідно перевести в число + зробити перевірку на більше 0 і на число)

import {
  addMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  upsertMovie,
} from '../services/movies-services.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { fieldList } from '../constans/sortConstans.js';
import parseMovieFilterParams from '../utils/parseMovieFilterParams.js';

//GET
export const getAllMoviesController = async (req, res) => {
  //у mongoose метод find який знаходить все(якщо нічого не вказано) або щось одне
  //? ПЕРСОНАЛІЗОВАНА КОЛЕКЦІЯ ФІЛЬМІВ
  const { _id: userId } = req.user;

  //? ПАГІНАЦІЯ
  const { page, perPage } = parsePaginationParams(req.query);

  //? СОРТУВАННЯ
  //параметри сортування також містяться в req.query
  const { sortBy, sortOrder } = parseSortParams(req.query, fieldList);

  //? ФІЛЬТРАЦІЯ
  //розпиляємо фільт щоб додати айді
  const filter = { ...parseMovieFilterParams(req.query), userId };

  const data = await getMovies({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  }); //! передаємо в запиті сторінку і кількість на сторінці + параметри сортування

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

  //*персоналізована відповідь за айді користувачем
  const { _id: userId } = req.user;

  const { id } = req.params;
  const data = await getMovieById({ _id: id, userId }); //айді = _id з бази, не userId

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
  // //*тіло запиту збергіється в req.body
  // console.log(req.body);

  //? отримуємо інформацію про людину яка додала фільм
  // console.log(req.user);
  const { _id: userId, name, email } = req.user;

  const data = await addMovie({ ...req.body, userId, name, email });

  res.status(201).json({
    status: 201,
    data,
    message: 'Success add movie',
  });
};

// PUT/:id

export const updateMovieController = async (req, res) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const data = await upsertMovie({ _id: id, userId }, req.body, {
    upsert: true,
  }); // upsert: true -- якщо немає такого об'єкту то додає

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
  const { _id: userId } = req.user;
  const result = await upsertMovie({ _id: id, userId }, req.body);

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
  //щоб людина не могла видалити чужий об'єкт
  const { _id: userId } = req.user;
  const result = await deleteMovie({ _id: id, userId });

  if (!result) {
    throw createHttpError(404, 'Movie not exist');
  }
  res.json({
    status: 200,
    message: 'Movie delete successfully',
    data: result,
  });
};
