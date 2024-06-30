import Movie from '../db/models/Movie.js';

//GET
export const getMovies = () => Movie.find();

//GET
export const getMovieById = (id) => Movie.findById(id); //?повертає фільм або null

//POST
export const addMovie = (data) => Movie.create(data);

//PATCH/PUT

// filter - який об'єкт оновлювати (по id)
// data -- дані для оновлення
// options -- налаштування
// upsert -- оновити якщо є і додати якщо немає
//* findOneAndUpdate -- оновлює дані в базі але повертає неоновлений об'єкт

export const upsertMovie = async (filter, data, options = {}) => {
  const result = await Movie.findOneAndUpdate(filter, data, {
    new: true, //повернеться вже оновлений об'єкт в монгусі
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
