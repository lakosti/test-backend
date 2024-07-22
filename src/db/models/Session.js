import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

//АВТОРИЗАЦІЯ -- ПЕРЕВІРКА ПРАВ ДОСТУПУ (юзер/адмін)
//АУТЕНТИФІКАЦІЯ -- ЛОГІН(хто ти)

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user', //вказати з якої колекції цей айді
      required: true,
    },
    accessToken: {
      // пропуск
      type: String,
      required: true,
    },
    refreshToken: {
      //дозволяє оновити access токен
      type: String,
      required: true,
    },
    accessTokenValidUt: {
      type: Date, //час життя токену доступу
      required: true,
    },
    refreshTokenValidUt: {
      type: Date, //час життя токену оновлення
      required: true,
    },
  },

  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', mongooseSaveError);

sessionSchema.pre('findOneAndUpdate', setUpdateSettings);

sessionSchema.post('findOneAndUpdate', mongooseSaveError);

const Session = model('session', sessionSchema);

export default Session;
