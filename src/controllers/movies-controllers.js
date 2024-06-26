//* контролер - це запит до бази і відповідь з неї, яку ми передаємо на фронтенд

import { getMovieById, getMovies } from '../services/movies-services.js';

export const getAllMoviesController = async (req, res) => {
  //у mongoose метод find який знаходить все(якщо нічого не вказано) або щось одне

  const data = await getMovies(); // запит до бази

  res.json({
    status: 200,
    data,
    message: 'Success found movies',
  }); // відправляємо відповідь на фронтенд
};

export const getMovieByIdController = async (req, res) => {
  //? :id - це як змінна
  // console.log(req.params); // {id: refreferferfre} - айді можемо витягнути так
  // якщо ми ввели неправильний айді то mongoose сам викидає помилку, тому огортаємо в try catch
  try {
    const { id } = req.params;
    const data = await getMovieById(id);

    // якщо нам повернувся null, тобто такого id немає, викидаємо помилку
    if (!data) {
      return res.status(404).json({
        message: 'Movie not found',
      });
    }

    res.json({
      status: 200,
      data,
      message: `Success found movie by id ${id}`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    const { status = 500 } = error;
    res.status(status).json({
      message: error.message,
    });
  }
};
