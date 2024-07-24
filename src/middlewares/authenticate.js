//ПЕРЕВІРЯЄМО ЧИ АВТОРИЗОВАНИЙ КОРИСТУВАЧ

import createHttpError from 'http-errors';
import { findSession } from '../services/session-services.js';
import { findUser } from '../services/auth-services.js';

const authenticate = async (req, res, next) => {
  //витягуємо заголовок авторизації

  //   const { Authorization } = req.headers;
  const authHeader = req.get('Authorization');

  //якщо немає заголовку вакидаємо помилку
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header missing'));
  }
  //витягуємо слово Bearer (використовучи деструктирізацію + спліт)
  const [bearer, accessToken] = authHeader.split(' ');

  //перевіряємо чи є слово Bearer
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Token must be have Bearer type'));
  }

  //перевіряємо чи є сам токен
  if (!accessToken) {
    return next(createHttpError(401, 'Token missing'));
  }

  //перевіряємо чи є сесія з таким токеном
  const session = await findSession({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  //перевірка чи час життя токену не закінчився
  const accessTokenExpired = new Date() > new Date(session.accessTokenValidUt); // new Date () нам повертається нормальне значення часу ( цей об'єкт враховує часові зони)

  //якщо час життя токену закінчився (true)
  if (accessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  //перевіряємо чи є такий користувач (може бути таке що людина залогінилась але її видалило з бази )
  const user = await findUser(session.userId);
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  //! і якщо всі перевірки пройдені -- то ти можеш отримати свої фільми (next - іди далі)

  next();
};

export default authenticate;
