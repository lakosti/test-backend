import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import dotevn from 'dotenv';
// //? як додати локально дані на комп у process.env -- встановлюємо пакет npm i dotenv
// dotevn.config(); //? дивиться чи є файл .env і читає його

// import movies from './db/movies.js';
import env from './utils/env.js';

import { getMovies, getMovieById } from './services/movies-services.js';

const port = env('PORT', '3000');

const startServer = () => {
  const app = express();

  //?прописуємо логи (для знаходження помилки)
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger); //*мідлваре pino
  app.use(cors());

  app.get('/api/movies', async (req, res) => {
    //*у mongoose метод find який знаходить все(якщо нічого не вказано) або щось одне
    const data = await getMovies(); //! запит до бази

    res.json({
      status: 200,
      data,
      message: 'Success found movies',
    }); //! відправляємо відповідь на фронтенд
  });

  //! динамічний маршрут (знаходження по id)
  app.get('api/movies/:id', async (req, res) => {
    //? :id - це як змінна
    // console.log(req.params); // {id: refreferferfre} - айді можемо витягнути так
    //!якщо ми ввели неправильний айді то mongoose сам викидає помилку, тому огортаємо в try catch
    try {
      const { id } = req.params;
      const data = await getMovieById(id);

      //* якщо нам повернувся null, тобто такого id немає, викидаємо помилку

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
  });

  //?адреса якої не існує
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(port, () => console.log(`Server running on ${port}`));
};

export default startServer;
