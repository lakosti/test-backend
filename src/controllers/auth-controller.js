//ASYNC AWAIT - розпаковуємо проміс
//АВТОМАТИЧНЕ ОНОВЛЕННЯ ACCESS TOKENA -- НА ФРОНТЕНДІ ЦЕ AXIOS.INTERCEPTORS

import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';
import { compareHash } from '../utils/hash.js';
import {
  createSession,
  deleteSession,
  findSession,
} from '../services/session-services.js';

const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUt, _id },
) => {
  //КУКИИ - COOKIES  дані які надходять з бекенда (додаткові налаштування)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, //куки можна лише прочитати (фронт їх ніяк не змінить)
    expires: refreshTokenValidUt, //коли закінчиться срок дії токену
  }); // назва кука, значення, налаштування

  //додаємо session id
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUt,
  });
};

export const signupController = async (req, res) => {
  //отримуємо дані користувача і зберігаємо в базі
  //req.body -- тіло запиту

  //* дивимось чи є такий користувач і виводимо правильний текст повідомлення
  const { email } = req.body;
  const user = await findUser({ email });

  //якщо повернувся об'єкт з таким email (true) викидаємо помилку
  if (user) {
    // throw createHttpError(401, 'Email or password invalid'); // підвищує захист від взлому оскільки не зрозуміло яка саме помилка
    throw createHttpError(409, 'Email already in use');
  }

  //? запит до бази
  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  //* видаляємо пароль з об'єкта повністью (в монгусі можна прописати і свої методи також)
  // usersSchema.methods.toJSON = function () {
  //   const obj = this.toObject();
  //   delete obj.password;
  //   return obj;
  // };

  //? відповідь з бази
  res.status(201).json({
    status: 201,
    data,
    message: 'User signup successfully',
  });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body; //? те шо пише юзер в тілі запиту (свої дані)

  //перевіряємо чи є такий імейл уже
  const user = await findUser({ email }); //? те що вже є в базі

  //якщо немає з таким імейлом
  if (!user) {
    throw createHttpError(404, 'Email not found');
    //throw createHttpError(401, 'Email or password invalid')// ДЛЯ БЕЗПЕКИ
  }

  //якщо є такий користувач - порівнюємо пароль (bcrypt - асинхронний тому await (РОЗПАКОВУЄМО ПРОМІС))
  const comparePassword = await compareHash(password, user.password);
  //якщо паролі не співпадають
  if (!comparePassword) {
    throw createHttpError(401, 'Password invalid');
  }
  // const data = {
  //   email: user.email,
  //   password: user.password, // захешований пароль
  // };

  // надсилаємо статус і смс на фронт (RETURN)
  // res.status(201).json({
  //   status: 201,
  //   data,
  //   message: 'User signin successfully',
  // });

  //?CЕСІЯ - ЦЕ ПЕРІОДИ ЖИТТЯ  accessToken І refreshTokenToken (під час сесії зберігаються дані про користувача)

  // const accessToken = '1254fv5855rr'; //токен який прикріпляється до запиту (недовгий термін дії)
  // const refreshTokenToken = '115154er4freferf'; // оновлює дані

  const session = await createSession(user._id); // бо у базі таке id ---- _id

  //*утилітарна функція для куків
  setupResponseSession(res, session);

  //надсилаємо відповідь (json/send) (RETURN)
  res.json({
    status: 200,
    message: 'User signin successfully',
    data: {
      accessToken: session.accessToken, //на фронт надсилаємо лише  access token, бо деякі програми(розширення) можуть зчитувати ці токени
    },
  });
};

export const refreshController = async (req, res) => {
  //* необхідно отримати доступ до cookie щоб взяти refreshToken token
  // console.log(req.cookies); --- В ТАКОМУ ВИГЛЯДІ ЕКСПРЕС НЕ БАЧИТЬ КУКИ, ТОМУ НАМ ПОТРІБНО ПРОПИСАТИ midleware + встановити пакет cookie-parser
  const { refreshToken, sessionId } = req.cookies;

  //перевіряємо чи сесія ще активна чи вже ні
  const currentSession = await findSession({ _id: sessionId, refreshToken });

  //якщо сесії уже немає, людина розлогінилась
  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }

  //чи дійсний refreshToken token
  const refreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUt);

  //якщо true - вийшов строк дії токену
  if (refreshTokenExpired) {
    throw createHttpError(401, 'Session expired');
  }

  //якщо все добре то створюємо нову сесію за новим refreshToken токеном
  const newSession = await createSession(currentSession.userId);

  setupResponseSession(res, newSession);

  //якщо все добре повертаємо таку саму відповідь
  res.json({
    status: 200,
    message: 'User refresh successfully',
    data: {
      accessToken: newSession.accessToken, //на фронт надсилаємо лише  access token, бо деякі програми(розширення) можуть зчитувати ці токени
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  //перед тим як вийти ми перевіряємо чи взагалі існує sessionId (тобто чи взагалі людина залогінена)
  if (!sessionId) {
    throw createHttpError(401, 'User not logged in');
  }

  //створюємо функцію яка видаляє сесію
  await deleteSession({ _id: sessionId });

  //очищаємо куки (це робить лише бек)
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.json({
    status: 204,
    message: 'Successfully log out',
  });
};
