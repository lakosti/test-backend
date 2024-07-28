//* Є ДВА ШЛЯХИ ВІДПРАВКИ EMAIL (вони повністью різні)
//? 1. ЧЕРЕЗ ПОСЕРЕДНИКА(кожен посередник різний) (як визначити посередника (на сайті є ціни + є npm пакет)) (принцип роботи - бекенд надсилає посереднику, він перевіряє і надсилає людині (приклад НП))
// -- генеруємо пароль
// -- api ключ + емайл у змінні оточення
// Посередники не перевіряють чи лист дійшов до людини

//? 2. ЧЕРЕЗ ПОШТОВИЙ СЕРВЕР ЗАМОВНИКА (принцип роботи - бекенд підключається до серверу замовника до конкретної пошти, і з неї відправляє листи) (підключаються до пошти за допомогою пакету nodemailer)

//? ПОСЕРЕДНИК
// import ElasticEmail from '@elasticemail/elasticemail-client';
// import 'dotenv/config';

// const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_EMAIL } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY;

// const api = new ElasticEmail.EmailsApi();

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [new ElasticEmail.EmailRecipient('dixic87777@sablecc.com')],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: 'HTML',
//         Content: '<strong>Test email</strong>', //можна писати розмітку + стилізацію
//       }),
//     ],
//     Subject: 'Test email',
//     From: ELASTICEMAIL_EMAIL,
//   },
// });

// //посередники не перевіряють чи лист дійшов до людини
// const callback = function (error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };

// api.emailsPost(email, callback);
