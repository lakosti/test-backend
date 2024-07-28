import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constans/users-constants.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp, // регулярний вираз для email
      unique: true, // в рамках цієї колекції буде тільки один такий самий email (перевірку робить сама БАЗА)
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      required: true, //коли людина реєсттрується емайл ще не підтверджений
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', mongooseSaveError);

const User = model('user', userSchema); // якщо такої колекції немає (монгус не може з нею з'єднатися) - монгус її створить сам у базі

export default User;
