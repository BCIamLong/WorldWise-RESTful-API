import { City } from "../database/index.js";
import { AppError } from "../utils/index.js";

const getCities = async () => {
  const cities = await City.find();
  if (!cities) throw new AppError("No city found!", 404);
  return cities;
};

const getCity = async (id) => {
  const city = await City.findById(id);
  if (!city) throw new AppError("No city found with this id!", 404);
  return city;
};

const removeCity = async (id) => {
  const city = await City.findByIdAndDelete(id);
  if (!city) throw new AppError("No city found with this id!", 404);
};

const createCity = async (data) => {
  const newCity = await City.create(data);
  // if (newCity) throw new AppError("Required data invalid!", 400);
  return newCity;
};

export default { getCities, getCity, removeCity, createCity };

// * we don't need use try catch in service because we have asyncCatch function wrap to catch error from controller and also for service
// * maybe we can use try catch in case we need to custom error
// * but in development we need more info error as possible
// * when using mongoDB some errors occurs in itself and mongoDB auto throw that error for us
// * so we can catch it in here and custom that error
// * but it's good to custom it in the global error handler

// const getCities = async () => {
//   try {
//     const cities = await City.find();
//     return cities;
//   } catch (err) {
//     throw new AppError("No city found!", 404);
//     // throw new Error("No city found!");
//   }
// };

// const getCity = async (id) => {
//   try {
//     const city = await City.findById(id);
//     return city;
//   } catch (err) {
//     throw new AppError("No city found with this id!", 404);
//     // throw new Error("No city found with this id!");
//   }
// };

// const removeCity = async (id) => {
//   try {
//     await City.findByIdAndDelete(id);
//   } catch (err) {
//     throw new AppError("No city found with this id!", 404);
//     // throw new Error("No city found with this id!");
//   }
// };

// const createCity = async (data) => {
//   try {
//     const newCity = await City.create(data);
//     return newCity;
//   } catch (err) {
//     throw new AppError("Required data invalid!", 400);
//   }
// };
