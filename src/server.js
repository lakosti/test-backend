import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import movies from './db/movies.js';

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

  app.listen(3000, () => console.log('Server running on 3000'));
};

export default startServer;
