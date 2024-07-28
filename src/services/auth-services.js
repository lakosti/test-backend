// СЕРВІСИ НАПРЯМУ ПОСИЛАЮТЬ ЗАПИТИ ДО БАЗИ

import User from '../db/models/User.js';
import { hashValue } from '../utils/hash.js';

//перевірка чи такий користувач існує (щоб вивести текст помилки про унікальність)
export const findUser = (filter) => User.findOne(filter);

//оновлення користувача
export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
//створюємо нового юзера + хешування паролю
export const signup = async (data) => {
  const { password } = data;
  const hashedPassword = await hashValue(password, 10);

  return User.create({ ...data, password: hashedPassword }); //розпиляємо дані і в поле пароль підставляємо захешований пароль
};
