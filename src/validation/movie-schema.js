import Joi from 'joi';
import { releaseYearRegexp, typeList } from '../constans/movies-constants.js';

//ПОМИЛКА ВАЛІДАЦІЇ ЦЕ 400 ТА 422
//404 - НЕ ЗНАЙДЕНО / НЕМАЄ ВІДПОВІДІ ВІД СЕРВЕРА (ЦЕ НЕ ПОМИЛКА ВАЛІДАЦІЇ)
//401 - НЕАВТОРИЗОВАНИЙ КОРИСТУВАЧ (ЦЕ НЕ ПОМИЛКА ВАЛІДАЦІЇ)

//JOI - ВАЛІДАЦІЯ ТИХ ДАНИХ ЩО ПРИЙШЛИ при додаванні фільму (ПРИКЛАД ТОГО ЯК МАЄ ВИГЛЯДАТИ ЦЕЙ ОБ'ЄКТ)
export const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'title must be',
  }),
  releaseYear: Joi.string().required().pattern(releaseYearRegexp),
  director: Joi.string().required(),
  type: Joi.string().valid(...typeList),
});

//pattern -- регулярний вираз
//valid(...) -- перелік чогось

//при частковому оновленні видаляємо всі обов'язкові поля
export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
  director: Joi.string(),
  type: Joi.string().valid(...typeList),
});
