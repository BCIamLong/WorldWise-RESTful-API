import { AppError } from "../utils/index.js";

const getAll = async (Model) => {
  const data = await Model.find();
  if (!data) throw new AppError("No data found!", 404);
  return data;
  // throw new Error("No user found!");
};

const getOne = async (Model, id) => {
  const data = await Model.findById(id);
  if (!data) throw new AppError("No data found with this id!", 404);
  return data;
  // throw new Error("No user found!");
};

const createOne = async (Model, data) => {
  const newData = await Model.create(data);
  return newData;
};

const deleteOne = async (Model, id) => {
  const data = await Model.findByIdAndDelete(id);
  if (!data) throw new AppError("No data found with this id!", 404);
  return data;
};

const updateOne = async (Model, id, data) => {
  const dataUpdated = await Model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!dataUpdated) throw new AppError("No data found with this id!", 404);
  return dataUpdated;
};

export default { getAll, getOne, createOne, deleteOne, updateOne };
