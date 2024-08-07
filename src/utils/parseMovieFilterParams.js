//фільтр створюємо для кожної колекції окремо

import { typeList } from '../constans/movies-constants.js';

//перетворюємо на буль
const parseBoolean = (value) => {
  const isBoolean = value === 'true' || value === 'false';

  if (!isBoolean) return;

  return value === 'true' ? true : false;

  // Богдан

  // if (typeof value !== 'string') return;
  // if (!['true', 'false'].includes(value)) return;
  // return value === 'true';
};

const parseMovieFitlerParams = ({ type, fav }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parsedFavorite = parseBoolean(fav);

  return {
    type: parsedType,
    fav: parsedFavorite,
  };
};

export default parseMovieFitlerParams;
