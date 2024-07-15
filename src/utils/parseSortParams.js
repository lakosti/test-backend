import { sortedList } from '../constans/sortConstans.js';

const parseSortParams = ({ sortBy, sortOrder }) => {
  // якшо нас список сортувань містить таке сортування яке написав користувач - вибираємо його - інакше ставимо значення по замовчуванню - перший в масиві

  const parsedSortOrder = sortedList.includes(sortOrder)
    ? sortOrder
    : sortedList[0];
};

export default parseSortParams;
