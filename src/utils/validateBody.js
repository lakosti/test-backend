import createHttpError from 'http-errors';

//ПОМИЛКА ВАЛІДАЦІЇ ЦЕ 400 ТА 422
//404 - НЕ ЗНАЙДЕНО / НЕМАЄ ВІДПОВІДІ ВІД СЕРВЕРА (ЦЕ НЕ ПОМИЛКА ВАЛІДАЦІЇ)
//401 - НЕАВТОРИЗОВАНИЙ КОРИСТУВАЧ (ЦЕ НЕ ПОМИЛКА ВАЛІДАЦІЇ)

// валідація через Joi - об'єкт в якому написано як прийшла перевірка
// якщо все добре приходить об'єкт value з нашим req.body
// якщо помилка - приходить наше value і об'єкт error
// коли joi знаходить ПЕРШУ помилку вона далі не перевіряє
// validateAsync - асинхронний запит який викидає помилку тому огортаємо в  try catch

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false, //щоб не зупинялась якщо знайшла помилку
      });
      next();
    } catch (error) {
      const responseError = createHttpError(400, error.message, {
        errors: error.details,
      });
      next(responseError); //передаємо помилку далі
    }
  };
  return func;
};

export default validateBody;
