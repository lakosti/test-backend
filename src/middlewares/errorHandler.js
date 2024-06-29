const errorHandler = (error, req, res, nest) => {
  //*описуємо відправлення відповіді з помилкою на фронтенд
  const { status = 500, message } = error;

  res.status(status).json({
    status,
    message,
    data: error,
  });
};

export default errorHandler;
