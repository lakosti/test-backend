//* контролер - це запит до бази і відповідь з неї, яку ми передаємо на фронтенд -- ТЕ ЩО ВІДПРАВЛЯЄМО НА ФРОНТ

import { getMovieById, getMovies } from '../services/movies-services.js';
import createHttpError from 'http-errors';

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
