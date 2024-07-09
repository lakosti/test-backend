import Joi from 'joi';
import { releaseYearRegexp, typeList } from '../constans/movies-constants.js';

//JOI - ВАЛІДАЦІЯ ТИХ ДАНИХ ЩО ПРИЙШЛИ при додаванні фільму (ПРИКЛАД ТОГО ЯК МАЄ ВИГЛЯДАТИ ЦЕЙ ОБ'ЄКТ)
export const movieAddSchema = Joi.object({
  title: Joi.string().required(),
  releaseYear: Joi.string().required().pattern(releaseYearRegexp),
  director: Joi.string().required(),
  type: Joi.string().valid(...typeList),
});

//pattern -- регулярний вираз
//valid(...) -- перелік чогось

//при частковому оновленні прибираємо всі обов'язкові поля
export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
  director: Joi.string(),
  type: Joi.string().valid(...typeList),
});
