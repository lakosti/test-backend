import express from 'express';
import cors from 'cors';
//шоб витягти cookie із запиту
import cookieParser from 'cookie-parser';
// import pino from 'pino-http';
// import dotevn from 'dotenv';
// //? як додати локально дані на комп у process.env -- встановлюємо пакет npm i dotenv
// dotevn.config(); //? дивиться чи є файл .env і читає його

import env from './utils/env.js';

import moviesRouter from './routers/movies-router.js';
import authRouter from './routers/auth-router.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const port = env('PORT', '3000');

const startServer = () => {
  const app = express();

  //?прописуємо логи (для знаходження помилки)
  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });

  //! middlewares

  // app.use(logger); //*мідлваре pino
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json()); //*при post запиті зчитує тіло запиту(req.body) і перетворює з бінарного формату на звичайний json / [] і записує в req.body (шукає Content-Type) працює лише із json форматом

  //*логін користувача
  app.use('/api/auth', authRouter);

  // будь який запит який іде на /api/movies потрібно шукати в moviesRouter
  // приставка api вказує на те шо повертаються якісь дані а не просто розмітка
  app.use('/api/movies', moviesRouter);
  //параметри запиту пишемо після ?page=5&perPage=10

  //? якщо нічого не знайдено, помилка 404
  //помилки прописуємо в самому кінці

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server running on ${port}`));
};

export default startServer;
