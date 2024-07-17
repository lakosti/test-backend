import { sortedList } from '../constans/sortConstans.js';

const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
  //витягли sortBy sortOrder з req.query, а fieldList передали як параметром у controller

  // якшо наш список сортувань містить таке сортування яке написав користувач - вибираємо його - інакше ставимо значення по замовчуванню - перший в масиві
  const parsedSortOrder = sortedList.includes(sortOrder)
    ? sortOrder
    : sortedList[0];

  // перевірка з яким полем можемо сортувати
  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
