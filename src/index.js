// import { releaseYearRegexp } from './constans/movies-constants.js';
// const validationResult = releaseYearRegexp.test('200');
// console.log(validationResult); // це як валідатор - повертає тру/ фолс

// import initMongoDB from './db/initMongoDB.js';
import initMongo from './db/initMongoDB.js';
import startServer from './server.js';

const bootstrap = async () => {
  //!спочатку підєднуємося до бази а потім запускаємо сервер

  await initMongo();
  startServer();
};

bootstrap();
//21NzrUMjusMP3hoj
