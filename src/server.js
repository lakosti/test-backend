import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotevn from 'dotenv';

import movies from './db/movies.js';

//? як додати локально дані на комп у process.env -- встановлюємо пакет npm i dotenv
dotevn.config(); //? дивиться чи є файл .env і читає його

const { PORT = 3000 } = process.env;
console.log(PORT);
// console.log(process.env); //* змінні оточення (налаштування компютера на якому запускаєтсья код) //на гіт не пушиться, віддалено потрібно самому писати (це різні паролі, логіни)

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

  app.get('/api/movies', (req, res) => {
    res.json(movies);
  });

  //?адреса якої не існує
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

export default startServer;
