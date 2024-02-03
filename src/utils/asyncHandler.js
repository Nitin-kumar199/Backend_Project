const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

//step1
// const asyncHandler = () => {};
// //step2
// const asyncHandler = (func) => () => {}
// //step3
// const asyncHandler = (func) => async () =>{}

//final function
// const asyncHandler = (fn) => async (req, res, next) => {
//      try {
//         fn(req, res, next)
//      } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//      }
// }
export { asyncHandler };
