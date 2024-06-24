//*запрос в базу даних ств на основі моделі
import { Schema, model } from 'mongoose';

//? клас який буде описувати колекцію
const movieSchema = new Schema({
  //*описуємо назву та тип даних
  title: String,
  director: String,
  // year: Schema.Types.BigInt //* якщо в js немає такого типа даних
});

//? модель яка буде взаємодіяти з цією колекцією
const Movie = model('movie', movieSchema);
//?пишемо назву колекції в однині (movie), mongoose її перетворить на множину
//mouse - mice

export default Movie;
