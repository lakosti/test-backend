//фільтр створюємо для кожної колекції окремо

// import { typeList } from '../constans/movies-constants.js';

//перетворюємо на буль
const parsedBoolean = (value) => {
  //   if (typeof value !== 'string') return;

  //   if (!['true', 'false'].includes(value)) return;

  //   const parsedValue = JSON.parse(value);

  //   return parsedValue;
  ///////
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

const parseMovieFilterParams = ({ type, favourite }) => {
  // витягуємо тип з квері

  //   const parsedType = typeList.includes(type) ? type : null;

  const parsedFavourite = parsedBoolean(favourite);

  return {
    type,
    favourite: parsedFavourite,
  };
};

export default parseMovieFilterParams;
