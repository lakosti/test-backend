import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import dotevn from 'dotenv';
// //? як додати локально дані на комп у process.env -- встановлюємо пакет npm i dotenv
// dotevn.config(); //? дивиться чи є файл .env і читає його

// import movies from './db/movies.js';
import env from './utils/env.js';

import { getMovies } from './services/movies-services.js';

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
    const result = await getMovies(); //! запит до бази

    res.json(result); //! відправляємо відповідь на фронтенд
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
