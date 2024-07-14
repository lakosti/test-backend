//? req.query -- те шо ми пишемо в параметри запиту після ? (page=5&perPage=10)
//? повертається нам у вигляді об'єкта (тип даних строка - його необхідно перевести в число + зробити перевірку на більше 0 і на число)

//створюємо шаблонну функцію
const parsedNumber = (value, defaultValue) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }
  //перетворюємо на ціле число
  const parsedValue = parseInt(value);
  //перевіряємо чи прийшло нам число чи шось інше
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }
  //повертаємо перетворене число (тобто ту сторінку яку необіхдно)
  return parsedValue;
};

//розбираємо параметри пагінації (витягує з об'єкту page і perPage і перетворює на норм дані)
const parsePaginationParams = ({ page, perPage }) => {
  // const { page, perPage } = query; // або написати це у параметрах

  const parsedPage = parsedNumber(page, 1);
  const parsedPerPage = parsedNumber(perPage, 10); //за замовчуванням 10 елем на сторінці

  //повертаємо об'єкт з відповідними параметрами
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationParams;
