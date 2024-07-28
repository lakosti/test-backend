import { Router } from 'express';

import ctrWrapper from '../utils/controllerWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSigninSchema,
  userSignupSchema,
} from '../validation/user-schema.js';
import {
  logoutController,
  refreshController,
  signinController,
  signupController,
  verifyController,
} from '../controllers/auth-controller.js';

const authRouter = Router();

//реєстрація це завжди POST (бо змінює бекенд)
authRouter.post(
  '/signup',
  validateBody(userSignupSchema), //JOI VALIDATION
  ctrWrapper(signupController), //MONGOOSE VALIDATION
);

//перехід за посиланням це завжди гет запит
authRouter.get('/verify', ctrWrapper(verifyController));
//логін це також POST
authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrWrapper(signinController),
);

//маршрут оновлення
authRouter.post('/refresh', ctrWrapper(refreshController));

authRouter.post('/logout', ctrWrapper(logoutController));

export default authRouter;
