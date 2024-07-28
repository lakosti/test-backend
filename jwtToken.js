import env from '../utils/env.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = env('JWT_SECRET');

//JWT - складається з заголовків (зашифровані), об'єкт payload, + JWT_SECRET секретний підпис
// його можна легко розшифрувати, тому паролі не зберігаємо (jwt.decode(token))
// перевірка токену на валідність (чи ми його створювали) -- jwt.verify(token, JWT_SECRET ) // якщо немає  JWT_SECRET - це підробний код, і викидається помилка + verify - перевіряє токен на  строк дії

const payload = {
  id: '66a4d89911d5f682fccca879',
  email: '2803yroclava1999@gmail.com',
};

//створюємо токен
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }); // expiresIn час життя

// const decodeToken = jwt.decode(token); //розкодування

try {
  //перевірка на валідність токену
  const tokenPayload = jwt.verify(token, JWT_SECRET);
} catch (error) {
  console.log(error.message);
}
