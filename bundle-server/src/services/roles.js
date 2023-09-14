const ActionModel = require("../models/actions");
const PermissionModel = require("../models/permissions");
const ResourceModel = require("../models/resources");
const RoleModel = require("../models/roles");

async function fetchRoles() {
  try {
    const roles = await RoleModel.findAll({
      attributes: ["rolename", "roleid"],
      include: [
        {
          model: PermissionModel,
          attributes: ["permissionid"],
          through: {
            attributes: [], // Exclude the junction table attributes
          },
          include: [
            {
              model: ResourceModel,
              attributes: ["resourceid", "resourcename"],
            },
            {
              model: ActionModel,
              attributes: ["actionid", "actionname"],
            },
          ],
        },
      ],
    });

    // console.log("All roles:", JSON.stringify(roles, null, 2));
    return roles;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

exports.fetchRoles = fetchRoles;
