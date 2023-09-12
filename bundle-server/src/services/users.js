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
    // console.log(users.every((user) => user instanceof UserModel)); // true
    //console.log("All users:", JSON.stringify(users, null, 2));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

//fetchUsers();

exports.fetchUsers = fetchUsers; // Call the async function to start the operation
