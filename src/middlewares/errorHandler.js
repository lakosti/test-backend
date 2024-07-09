import { HttpError } from 'http-errors';

//? ця функція обовязково повинна містити 4 параметри, бо таким чином її шукає next()
const errorHandler = (error, req, res, next) => {
  //*описуємо відправлення відповіді з помилкою на фронтенд

  // const { status = 500, message } = error;

  // res.status(status).json({
  //   status,
  //   message,
  //   data: error,
  // });

  //? більш складніший варіант

  if (error instanceof HttpError) {
    // якщо це наша помилка (нами створена) то ми беремо звідти status і message і передаємо на фронт
    const { status, message, errors } = error;
    res.status(status).json({
      status,
      message,
      data: errors || error, // якщо є errors передаємо їх - немає - error
    });
    return;
  }

  // якщо виникла якась невідома помилка
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    status,
    message,
    data: error.message,
  });
};

export default errorHandler;
