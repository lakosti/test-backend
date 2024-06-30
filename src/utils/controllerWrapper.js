//? функція декоратор - функція яка приймає функцію і створює обгортку(тут ми оброблюємо помилку (next(err)))

const ctrWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};

export default ctrWrapper;
