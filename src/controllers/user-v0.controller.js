import { userService } from "../services/index.js";

const { getUsers, fetchUser, createUser } = userService;

const getUsersList = async (req, res) => {
  const users = await getUsers();
  res.json({
    status: "success",
    data: {
      users,
    },
  });
};

const getUser = async (req, res) => {
  const user = await fetchUser(req.params.id);
  res.json({
    status: "success",
    data: {
      user,
    },
  });
};

const postUser = async (req, res) => {
  const user = await createUser(req.body);
  res.json({
    status: "success",
    data: {
      user,
    },
  });
};

export default { getUsersList, getUser, postUser };

// const getUsersList = async (req, res) => {
//   try {
//     const users = await getUsers();
//     res.json({
//       status: "success",
//       data: {
//         users,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
