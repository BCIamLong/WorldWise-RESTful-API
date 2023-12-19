const asyncCatch = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// const asyncCatch = (fn) => (req, res, next) => {
//   try {
//     fn(req, res, next);
//   } catch (err) {
//     next(err);
//   }
// };

export default asyncCatch;
