import { cityService } from "../services/index.js";

const { getCities, getCity, removeCity, createCity } = cityService;

// const getCitiesList =

const getCitiesList = async (req, res) => {
  const cities = await getCities();
  res.json({
    status: "success",
    data: {
      cities,
    },
  });
};

const getCityInfo = async (req, res) => {
  const city = await getCity(req.params.id);

  res.json({
    status: "success",
    data: {
      city,
    },
  });
};

const postCity = async (req, res) => {
  const newCity = await createCity(req.body);
  res.status(201).json({
    status: "success",
    data: {
      city: newCity,
    },
  });
};

const deleteCity = async (req, res) => {
  await removeCity(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

export default { getCitiesList, getCityInfo, deleteCity, postCity };

// const getCitiesList = async (req, res) => {
//   try {
//     const cities = await getCities();
//     res.json({
//       status: "success",
//       data: {
//         cities,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

// const getCityInfo = async (req, res) => {
//   try {
//     const city = await getCity(req.params.id);
//     // if (!city) throw new AppError("No city found with this id!", 404);

//     res.json({
//       status: "success",
//       data: {
//         city,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

// const postCity = async (req, res) => {
//   try {
//     const newCity = await createCity(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         city: newCity,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

// const deleteCity = async (req, res) => {
//   try {
//     await removeCity(req.params.id);

//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
