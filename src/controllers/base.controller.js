import { baseService } from "../services/index.js";

const { getAll, getOne, createOne, updateOne, deleteOne } = baseService;

const getAllItems = (Model) => async (req, res) => {
  const items = await getAll(Model);

  res.json({
    status: "success",
    data: {
      items,
    },
  });
};

const getItem = (Model) => async (req, res) => {
  const item = await getOne(Model, req.params.id);

  res.json({
    status: "success",
    data: {
      item,
    },
  });
};

const postItem = (Model) => async (req, res) => {
  const item = await createOne(Model, req.body);

  res.json({
    status: "success",
    data: {
      item,
    },
  });
};

const updateItem = (Model) => async (req, res) => {
  const itemUpdated = await updateOne(Model, req.params.id, req.body);

  res.json({
    status: "success",
    data: {
      item: itemUpdated,
    },
  });
};

const deleteItem = (Model) => async (req, res) => {
  await deleteOne(Model, req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

export default { getAllItems, getItem, postItem, deleteItem, updateItem };
