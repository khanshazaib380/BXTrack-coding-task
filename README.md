


## ✨ Features

-- user authentication
--user registration (both by admin and self)
--roles creation with permissions ['create','read','update','delete']
--roles assigning to users
-- role and permission based access to all the routes
-- IP and api based rate limiters
--swagger documantation: If you are running on you localhost you can see the Swagger UI documentation on: http://localhost:3005/api-docs/.
--https support: include in env file the configuration.

## 📝 Getting Started

```

npm install
set configurations in env or config file.
node seed.js (admin , user and guest roles will be seeded to the DB. also an admin will be also seeded to the DB. admin user will change his password afterwards.)

node server.js
```

```








## 🚀 Endpoints
The following endpoints are available

Register Endpoint:
Request:
  Method: POST
  URL: http://localhost:3000/api/register (replace localhost:3000 with your actual server address)
  Headers: No special headers required
  Body: JSON (application/json)
        {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "user" // Optional, if not provided, default role will be assigned
    }  


Response (Success):
        {
        "code": 201,
        "success": true,
        "message": "User registered successfully.",
        "data": {
            "_id": "60c301c04c78db001fa6d355",
            "username": "john_doe",
            "email": "john.doe@example.com",
            "role": {
                "_id": "609dbe1b22f033001fe0f06e",
                "roleName": "user"
            },
            "__v": 0
        }
    }


Response (Error - Email Already Exists):

    {
        "code": 400,
        "success": false,
        "message": "Email already exists.",
        "data": null
    }





Login Endpoint:
Request:

    Method: POST
    URL: http://localhost:3000/api/login (replace localhost:3000 with your actual server address)
    Headers: No special headers required
    Body: JSON (application/json)
            {
            "email": "john.doe@example.com",
            "password": "password123"
        }


Response (Success):
        {
            "code": 200,
            "success": true,
            "message": "User authenticated successfully.",
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGMzMDFjMDRjNzhkYjAwMWZhNmQzNTUiLCJpYXQiOjE2Mzg5MDM2MzUsImV4cCI6MTYzODkwNjIzNX0.yV0GZAKvmOFL8H2yrFBj-R5oB3zNLLKrL1mdyO7N8-s"
            }
        }


Response (Error - User Not Found):
            {
            "code": 404,
            "success": false,
            "message": "User not found.",
            "data": null
        }


Response (Error - Invalid Credentials):
            {
        "code": 401,
        "success": false,
        "message": "Invalid credentials.",
        "data": null
    }



Get All Users Endpoint:
Request:

    Method: GET
    URL: http://localhost:3000/api/users (replace localhost:3000 with your actual server address)
    Headers:    Authorization: token ( a valid JWT token)


Response (Success - Users Found):
                {
            "code": 200,
            "success": true,
            "message": "Users retrieved successfully.",
            "data": [
                {
                    "_id": "60c301c04c78db001fa6d355",
                    "username": "john_doe",
                    "email": "john.doe@example.com",
                    "role": {
                        "_id": "609dbe1b22f033001fe0f06e",
                        "roleName": "user"
                    }
                },
                {
                    "_id": "60c3020d4c78db001fa6d356",
                    "username": "jane_doe",
                    "email": "jane.doe@example.com",
                    "role": {
                        "_id": "609dbe1b22f033001fe0f06e",
                        "roleName": "user"
                    }
                }
            ]
        }


Response (Error - No Users Found):
            {
            "code": 404,
            "success": false,
            "message": "No users found.",
            "data": null
        }


Get User Profile Endpoint:
Request:

    Method: GET
    URL: http://localhost:3000/api/user-profile (replace localhost:3000 with your actual server address)
    Headers:
    Authorization: token ( a valid JWT token)

Response (Success - User Found):
        {
        "code": 200,
        "success": true,
        "message": "User profile retrieved successfully.",
        "data": {
            "_id": "60c301c04c78db001fa6d355",
            "username": "john_doe",
            "email": "john.doe@example.com",
            "role": {
                "_id": "609dbe1b22f033001fe0f06e",
                "roleName": "user"
            }
        }
    }


Response (Error - User Not Found):
        {
        "code": 404,
        "success": false,
        "message": "User not found.",
        "data": null
    }



Update User Profile Endpoint:

Request:

    Method: PUT
    URL: http://localhost:3000/api/update-profile (replace localhost:3000 with your actual server address)
    Headers:Authorization: token ( a valid JWT token)
    Content-Type: application/json
    Body: JSON (application/json)
                {
        "username": "john_new",
        "email": "john.new@example.com",
        "password": "newpassword123"
    }




Response (Success - Profile Updated):
        {
            "code": 200,
            "success": true,
            "message": "User profile updated successfully.",
            "data": {
                "_id": "60c301c04c78db001fa6d355",
                "username": "john_new",
                "email": "john.new@example.com",
                "role": {
                    "_id": "609dbe1b22f033001fe0f06e",
                    "roleName": "user"
                }
            }
        }



Response (Error - Invalid Token):
    {
        "code": 401,
        "success": false,
        "message": "Unauthorized. Invalid token.",
        "data": null
    }







Create Role Endpoint:
Request:
    Method: POST
    URL: http://localhost:3000/api/roles (replace localhost:3000 with your actual server address)
    Headers: Authorization: token ( a valid JWT token)
    Body: JSON (application/json)
                    {
            "roleName": "admin",
            "endpoints": [
                {
                    "route": "/api/users",
                    "permissions": {
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    }
                },
                {
                    "route": "/api/roles",
                    "permissions": {
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    }
                }
            ]
        }



Response (Success - Role Created):
            
                {
        "code": 200,
        "success": true,
        "message": "Role created successfully",
        "data": {
            "_id": "60c309b4f6573800174d2e2e",
            "roleName": "admin",
            "endpoints": [
                {
                    "_id": "60c309b4f6573800174d2e30",
                    "route": "/api/users",
                    "permissions": {
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    }
                },
                {
                    "_id": "60c309b4f6573800174d2e2f",
                    "route": "/api/roles",
                    "permissions": {
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    }
                }
            ],
            "__v": 0
        }
    }



Get All Roles Endpoint:
Request:

    Method: GET
    URL: http://localhost:3000/api/roles (replace localhost:3000 with your actual server address)
    Headers: Authorization: token ( a valid JWT token)

Response (Success - Roles Found):
        {
        "code": 200,
        "success": true,
        "message": "Roles retrieved successfully",
        "data": [
            {
                "_id": "60c309b4f6573800174d2e2e",
                "roleName": "admin",
                "endpoints": [
                    {
                        "_id": "60c309b4f6573800174d2e30",
                        "route": "/api/users",
                        "permissions": {
                            "create": true,
                            "read": true,
                            "update": true,
                            "delete": true
                        }
                    },
                    {
                        "_id": "60c309b4f6573800174d2e2f",
                        "route": "/api/roles",
                        "permissions": {
                            "create": true,
                            "read": true,
                            "update": true,
                            "delete": true
                        }
                    }
                ]
            }
        ]
    }





Get Role by ID Endpoint:
Request:

    Method: GET
    URL: http://localhost:3000/api/roles/:id (replace :id with the ID of the role you want to retrieve)
    Headers: Authorization: token ( a valid JWT token)

Response (Success - Role Found):

        {
            "code": 200,
            "success": true,
            "message": "Role retrieved successfully",
            "data": {
                "_id": "60c309b4f6573800174d2e2e",
                "roleName": "admin",
                "endpoints": [
                    {
                        "_id": "60c309b4f6573800174d2e30",
                        "route": "/api/users",
                        "permissions": {
                            "create": true,
                            "read": true,
                            "update": true,
                            "delete": true
                        }
                    },
                    {
                        "_id": "60c309b4f6573800174d2e2f",
                        "route": "/api/roles",
                        "permissions": {
                            "create": true,
                            "read": true,
                            "update": true,
                            "delete": true
                        }
                    }
                ]
            }
        }





Update Role by ID Endpoint:
Request:

Method: PUT
URL: http://localhost:3000/api/roles/:id (replace :id with the ID of the role you want to update)
    Headers: Authorization: token ( a valid JWT token)
    Body: JSON (application/json)
        {
        "roleName": "superadmin",
        "endpoints": [
            {
                "route": "/api/users",
                "permissions": {
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            }
        ]
    }

Response (Success - Role Updated):
        {
        "code": 200,
        "success": true,
        "message": "Role updated successfully",
        "data": {
            "_id": "60c309b4f6573800174d2e2e",
            "roleName": "superadmin",
            "endpoints": [
                {
                    "_id": "60c309b4f6573800174d2e30",
                    "route": "/api/users",
                    "permissions": {
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    }
                }
            ]
        }
    }




Delete Role by ID Endpoint:
Request:

    Method: DELETE
    URL: http://localhost:3000/api/roles/:id (replace :id with the ID of the role you want to delete)
    Headers: Authorization: token ( a valid JWT token)

Response (Success - Role Deleted):
        {
            "code": 200,
            "success": true,
            "message": "Role deleted successfully",
            "data": {
                "_id": "60c309b4f6573800174d2e2e",
                "roleName": "superadmin",
                "endpoints": [
                    {
                        "_id": "60c309b4f6573800174d2e30",
                        "route": "/api/users",
                        "permissions": {
                            "create": true,
                            "read": true,
                            "update": true,
                            "delete": true
                        }
                    }
                ]
            }
        }





Assign Role to User Endpoint:
Request:

    Method: POST
    URL: http://localhost:3000/api/assign-role (replace localhost:3000 with your actual server address)
    Headers: Authorization: token ( a valid JWT token)
    Body: JSON (application/json)
        {
            "userId": "60c301c04c78db001fa6d355",
            "roleId": "60c309b4f6573800174d2e2e"
        }

Response (Success - Role Assigned):
            {
            "code": 200,
            "success": true,
            "message": "Role assigned to user successfully",
            "data": {
                "user": {
                    "_id": "60c301c04c78db001fa6d355",
                    "username": "john_new",
                    "email": "john.new@example.com",
                    "role": "60c309b4f6573800174d2e2e"
                },
                "role": {
                    "_id": "60c309b4f6573800174d2e2e",
                    "roleName": "superadmin",
                    "endpoints": [
                        {
                            "_id": "60c309b4f6573800174d2e30",
                            "route": "/api/users",
                            "permissions": {
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        }
                    ]
                }
            }
        }











