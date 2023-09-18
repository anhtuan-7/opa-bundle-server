const UserModel = require("../models/users");
const RoleModel = require("../models/roles");

async function fetchUsers() {
  try {
    const users = await UserModel.findAll({
      attributes: ["username", "userid"],
      include: [
        {
          model: RoleModel,
          attributes: ["roleid", "rolename"],
          through: {
            attributes: [], // Exclude the junction table attributes
          },
        },
      ],
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

exports.fetchUsers = fetchUsers;
