// СЕРВІСИ НАПРЯМУ ПОСИЛАЮТЬ ЗАПИТИ ДО БАЗИ

import User from '../db/models/User.js';
import bcrypt from 'bcrypt';

//перевірка чи такий користувач існує (щоб вивести текст помилки про унікальність)
export const findUser = (filter) => User.findOne(filter);

//створюємо нового юзера + хешування паролю
export const signup = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({ ...data, password: hashedPassword }); //розпиляємо дані і в поле пароль підставляємо захешований пароль
};
