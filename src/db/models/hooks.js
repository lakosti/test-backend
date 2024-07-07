//МОНГУС ХУКИ - це те що потрібно зробити перед або після (.pre / .post)
//якщо після збереження сталася помилка (undefined) виконай цей колбек
//додаємо статус помилки
//save - це операція з базою (збереження, оновлення, видалення)
//*дослівно якщо після (post) збереження (save) сталася помилка, присвой їй статус 200 (щоб фронтенд розумів що проблема не з сервером (500), а коли неправильний об'єкт)

export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
