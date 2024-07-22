//ASYNC AWAIT - розпаковуємо проміс

import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';
import { compareHash } from '../utils/hash.js';
import { createSession } from '../services/session-services.js';

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

  //?CЕСІЯ - ЦЕ ПЕРІОДИ ЖИТТЯ  accessToken І refreshToken (під час сесії зберігаються дані про користувача)

  // const accessToken = '1254fv5855rr'; //токен який прикріпляється до запиту (недовгий термін дії)
  // const refreshToken = '115154er4freferf'; // оновлює дані

  const { _id, accessToken, refreshToken, refreshTokenValidUt } =
    await createSession(user._id); // бо у базі таке id ---- _id

  //КУКИИ - COOKIES  дані які надходять з бекенда (додаткові налаштування)
  res.cookie('refresh', refreshToken, {
    httpOnly: true, //куки можна лише прочитати (фронт їх ніяк не змінить)
    expires: refreshTokenValidUt, //коли закінчиться срок дії токену
  }); // назва кука, значення, налаштування

  //додаємо session id
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUt,
  });

  //надсилаємо відповідь (json/send) (RETURN)
  res.json({
    status: 200,
    message: 'User signin successfully',
    data: {
      accessToken, //на фронт надсилаємо лише  access token, бо деякі програми(розширення) можуть зчитувати ці токени
    },
  });
};
