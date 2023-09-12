package policy

import future.keywords.if

default allow = false


user := data.users[input.user_id]

allow = {
    "decision": "allow",
    "user": user
} if {
    r := user.roles[_]
    action = data.roles[r].permissions[input.resource][_]
    action == input.action
}


# opa eval --format raw --input input.json --data roles-data.json --data users-data.json -d policy.rego data.policy.allow