import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';

export const signupController = async (req, res) => {
  //отримуємо дані користувача і зберігаємо в базі
  //req.body -- тіло запиту

  //* дивимось чи є такий користувач і виводимо правильний текст повідомлення
  const { email } = req.body;
  const duplicateEmail = await findUser({ email });

  //якщо повернувся об'єкт з таким email (true) викидаємо помилку
  if (duplicateEmail) {
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
  const { email, password } = req.body;

  //перевіряємо чи є такий імейл уже
  const duplicateEmail = await findUser({ email });
  //якщо немає з таким імейлом
  if (!duplicateEmail) {
    throw createHttpError(404, 'Email not found');
    //throw createHttpError(401, 'Email or password invalid')// ДЛЯ БЕЗПЕКИ
  }
};
