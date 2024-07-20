import bcrypt from 'bcrypt';

// ХЕШУВАННЯ -- строка перетворюється на символи і назад уже в строку її не перетворити
// ШИФРУВАННЯ -- петерворюють строку в шифр і відповідно тими самими алгоритмами перетворюють назад у строку

const hashPassword = async (password) => {
  // Sult (сіль) -- набір випадкових даних - щоб не можна було ніяк розхешувати строку
  //   const salt = await bcrypt.genSalt(10); // 10 - складність алгоритму генерації (10 - середній)

  const result = await bcrypt.hash(password, 10);
  //якщо другий раз захешуємо ту саму строку то буде нове хешування

  const compareResult = await bcrypt.compare(password, result); //порівнюються паролі для логіна // ПОВЕРТАЄ TRUE АБО FALSE
};

hashPassword('1233456');
