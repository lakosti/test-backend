//ЛОГІКА РОБОТИ ПІД ЧАС СЕССІЇ
import { randomBytes } from 'node:crypto';

import Session from '../db/models/Session.js';
import {
  REFRESH_TOKEN_LIFETIME,
  ACCESS_TOKEN_LIFETIME,
} from '../constans/users-constants.js';

//ЗНАХОДИМО сесію
export const findSession = (filter) => Session.findOne(filter);

//створюємо сесію - це просто об'єкт який містить айді, і токени ( створення сессії - це запис її до колекції)
export const createSession = async (userId) => {
  //якщо є така сесія -- видаляємо
  await Session.deleteOne({ userId });

  //генеруємо рандомну строку (токен) через crypto (повертає буфер)
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  //до яктуального часу додаємо кількість хвилин що житиме токен
  const accessTokenValidUt = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUt = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

  //створюємо сесію
  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUt,
    refreshTokenValidUt,
  });
};

export const deleteSession = (filter) => Session.deleteOne(filter);
