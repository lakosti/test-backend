import Movie from '../db/models/Movie.js';
import calcPages from '../utils/calcPages.js';

//findOneAndDelete, find, findById --- методи mongoose

//? GET
// export const getMovies = () => Movie.find(); //повертає всі фільми

//? СОРТУВАННЯ
// sortBy(за чим) sortOrder(сортування за спаданням / зростанням))
// по зменшенню -- descending (DESC)
// по зростанню -- ascending (ASC)

//? ПАГІНАЦІЯ http://localhost:3000/api/movies?page=1&perPage=2

export const getMovies = async ({
  filter,
  page,
  perPage: limit,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * limit;

  const databaseQuery = Movie.find();
  //якщо фільтер має айді, то видавай відповідь по айді
  if (filter.userId) {
    databaseQuery.where('userId').equals(filter.userId);
  }
  if (filter.type) {
    databaseQuery.where('type').equals(filter.type);
  }
  if (filter.fav !== undefined) {
    databaseQuery.where('fav').equals(filter.fav); // фільтрація - де (where) filter == (equals)
  }

  //*повертаємо за пагінацією +сортування (методи монгусу)
  const items = await databaseQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  // [sortBy] -- властивість що вираховується тому в дужках

  //skip = page -- скільки об'єктів(фільмів) на початку пропустити
  //limit = perPage-- скільки всього об'єктів відображать(повернути)

  //*повертаємо кількість всіх об'єктів
  const totalItems = await Movie.find().merge(databaseQuery).countDocuments(); // ПОВЕРТАЄ кількість всіх фільмів

  //витягуємо кількість сторінок, наступну і попередню
  const { totalPages, hasNextPage, hasPrevPage } = calcPages({
    total: totalItems,
    limit,
    page,
  });

  return {
    items,
    totalItems,
    page,
    limit, // = perPage
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

//? GET
export const getMovieById = (filter) => Movie.findById(filter); //?повертає фільм або null

//? POST
export const addMovie = async (data) => Movie.create(data);
// const newMovie = data.title;
// const movieFromBD = await Movie.create(data);
// if (newMovie === movieFromBD.title) {
//   throw new Error('title the same');
// }

//? PATCH/PUT

// filter - який об'єкт оновлювати (по id)
// data -- дані для оновлення
// options -- налаштування
// upsert -- оновити якщо є і додати якщо немає
//* findOneAndUpdate -- оновлює дані в базі але повертає неоновлений об'єкт

export const upsertMovie = async (filter, data, options = {}) => {
  const result = await Movie.findOneAndUpdate(filter, data, {
    // new: true, //повернеться вже оновлений об'єкт в монгусі
    // runValidators: true, //роби валідацію під час оновлення
    includeResultMetadata: true, // перевіряє чи об'єкт був оновлений чи створений (з'являється LastErrorObject)
    //upserted -- значить сттворений // updatedExisting -- true  -- значить оновлений
    ...options, // додаткові налаштування які ще можуть передати (upsert), і щоб не втратити new:true ми їх розпиляємо
  });
  //якщо нічого немає повертаємо нал
  if (!result || !result.value) return null;

  //   const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;
  const isNew = Boolean(result?.lastErrorObject?.upserted); //перевірка на перший нал(?) перевіряємо чи є upserted (якщо є то значить створений)

  return {
    data: result.value,
    isNew,
  };
};

export const deleteMovie = (filter) => Movie.findOneAndDelete(filter); //видаляє або повертає null
