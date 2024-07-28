import path from 'node:path'; // за шляхи в ноді відповідає

export const releaseYearRegexp = /^\d{4}$/; // регулярний вираз року (який складається з 4 цифр ) (new Regexp(/^\d{4}$/))
export const typeList = ['film', 'serial'];

//зберігаємо шлях до папки templetes із шаблонами (абсолютний шлях)
//resolve - об'єднує шляхи + на початку вставляє абсолютний шлях до проекту
export const TEMPLATES_DIR = path.resolve('src', 'templates');
