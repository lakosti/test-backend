import 'dotenv/config';

const env = (name, defaultValue) => {
  const value = process.env[name]; //* назва змінного оточення

  if (value) return value; //* якщо є оточення повертаємо його

  if (defaultValue) return defaultValue; //* якщо є значення по замовчуванню повертаємо його

  throw new Error(`Missing: process.env[${name}]`); //* якщо немає ні того ні того - помилка

  // console.log(process.env); //? змінні оточення (налаштування компютера на якому запускаєтсья код) //на гіт не пушиться, віддалено потрібно самому писати (це різні паролі, логіни)
};

export default env;
