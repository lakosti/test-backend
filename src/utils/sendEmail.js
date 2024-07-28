// import 'dotenv/config';
// const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env; // змінні оточення містяться тут (якщо немає функції env)

//* Є ДВА ШЛЯХИ ВІДПРАВКИ EMAIL (вони повністью різні)
//? 1. ЧЕРЕЗ ПОСЕРЕДНИКА(кожен посередник різний) (як визначити посередника (на сайті є ціни + є npm пакет)) (принцип роботи - бекенд надсилає посереднику, він перевіряє і надсилає людині (приклад НП))
// -- генеруємо пароль
// -- api ключ + емайл у змінні оточення
// Посередники не перевіряють чи лист дійшов до людини

//? 2. ЧЕРЕЗ ПОШТОВИЙ СЕРВЕР ЗАМОВНИКА (принцип роботи - бекенд підключається до серверу замовника до конкретної пошти, і з неї відправляє листи) (підключаються до пошти за допомогою пакету nodemailer)

import nodemailer from 'nodemailer';
import env from './env.js';

const emailFrom = env('URK_NET_EMAIL');
const password = env('UKR_NET_PASSWORD');

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465, // 25, 465, 2525
  secure: true, //чи потрібне шифрування (465 - шифрується тому ставимо тру)
  auth: {
    user: emailFrom, //емайл до якого потрібно підключитися
    pass: password,
  },
};
//об'єкт що займається надсиланням листів
const transport = nodemailer.createTransport(nodemailerConfig);

/*
const data = {
    to: "velate1125@bacaki.com", // кому
    subject: "Test email", // тема
    html: "<strong>Test email</strong>", // вміст
};
*/

//створюємо сам лист
const sendEmail = (data) => {
  const email = { ...data, from: emailFrom }; //поле фром завжди одне і те саме в кожному листі, а от об'єкт data різній
  return transport.sendMail(email);
};

export default sendEmail;
