import { isValidObjectId } from 'mongoose'; //? перевіряє чи валідний айді
import createHttpError from 'http-errors';

//? обробна помилки 404 коли не знайдено по айді, у мідлеварі next по замовчуванні помилка 500
//головне писати next в middleware

const isValidId = (req, res, next) => {
  //витягуємо айді з req.params
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createHttpError(404, `${id} not valid id`));
  }
  next(); // якщо все добре ідемо далі
};

export default isValidId;
