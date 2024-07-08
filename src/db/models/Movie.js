//*запрос в базу даних ств на основі моделі
import { Schema, model } from 'mongoose';
import {
  releaseYearRegexp,
  typeList,
} from '../../constans/movies-constants.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

//? клас який буде описувати колекцію
// ТЕ ЩО МИ ЗБЕРІГАЄМО В БАЗІ (перевіряється під час додавання (Монгус схема))
//під час оновлення mongoose не робить валідації

//ВАЛІДАЦІЯ ТИХ ДАНИХ ЩО ДОБАВЛЯЄМО
const movieSchema = new Schema(
  {
    //*описуємо назву та тип даних
    title: {
      type: String,
      required: [true, 'title is must'],
    },
    director: {
      type: String,
      required: [true, 'director is must'],
    },
    // year: Schema.Types.BigInt //* якщо в js немає такого типа даних
    type: {
      type: String,
      enum: typeList, //* перелік основних видів, де один співпадає (або фільм або серіал)
      default: 'film',
    },
    releaseYear: {
      type: String,
      match: releaseYearRegexp, //*регулярний вираз для року
      required: true,
    },
    // тип фільму - це строка з назвою або фільм або серіал, по дефолту фільм
  },
  { versionKey: false, timestamps: true }, // timestamps -- дата додавання та дана оновлення
);

//МОНГУС ХУКИ - це те що потрібно зробити перед або після (.pre / .post)
//якщо після збереження сталася помилка (undefined) виконай цей колбек
//додаємо статус помилки
//save - це операція з базою (збереження, оновлення(findOneAndUpdate), видалення)
//*дослівно якщо після (post) збереження (save) сталася помилка, присвой їй статус 200 (щоб фронтенд розумів що проблема не з сервером (500), а коли неправильний об'єкт)

// movieSchema.post('save', mongooseSaveError);
movieSchema.post('save', mongooseSaveError);

//перед оновленням ми повертаємо оновлений об'єкт у постмані і вмикаємо валідацію
movieSchema.pre('findOneAndUpdate', setUpdateSettings);

movieSchema.post('findOneAndUpdate', mongooseSaveError);

//? модель яка буде взаємодіяти з цією колекцією

const Movie = model('movie', movieSchema);

//пишемо назву колекції в однині (movie), mongoose її перетворить на множину
//mouse - mice

export default Movie;
