
// PUT
// Ban a User
// http://localhost:3000/api/users/banneUser/6719246cfc91d824525d8522
// This endpoint allows the admin to ban a user by sending an HTTP PUT request to the specified URL. The request should include the required Admin authorization for this action.

// Upon a successful execution of the request, the server responds with a status code of 200 and a JSON object containing a message and the updated user details, including full name, username, email, avatar, phone number, CIN, roles, verification status, ban status, and trusted devices.

// Example response:

// View More
// json
// {
//     "message": "",
//     "user": {
//         "fullname": {
//             "fname": "",
//             "lname": ""
//         },
//         "_id": "",
//         "username": "",
//         "email": "",
//         "avatar": "",
//         "phoneNumber": "",
//         "password": "",
//         "CIN": "",
//         "roles": [""],
//         "isVerified": true,
//         "isBanned": true,
//         "trustedDevices": [],
//         "__v": 0
//     }
// }
// Request Body
// The request has no body

// Response
// Upon successful execution, the server will respond with a status code of 200 and a JSON object containing a message and the updated user's details, including their full name, username, email, avatar, phone number, CIN, roles, verification status, ban status, and other relevant information.

// Example Response:

// View More
// json
// {
//     "message": "",
//     "user": {
//         "fullname": {
//             "fname": "",
//             "lname": ""
//         },
//         "_id": "",
//         "username": "",
//         "email": "",
//         "avatar": "",
//         "phoneNumber": "",
//         "password": "",
//         "CIN": "",
//         "roles": [""],
//         "isVerified": true,
//         "isBanned": true,
//         "trustedDevices": [],
//         "__v": 0
//     }
// }
// AUTHORIZATION
// Bearer Token
// Token
// <token>

// Example Request
// Ban a User
// View More
// curl
// curl --location --request PUT 'http://localhost:3000/api/users/banneUser/6719246cfc91d824525d8522'
// 200 OK
// Example Response
// Body
// Headers (10)
// View More
// json
// {
//   "message": "User banned",
//   "user": {
//     "fullname": {
//       "fname": "User",
//       "lname": "Test"
//     },
//     "_id": "6719246cfc91d824525d8522",
//     "username": "just Updated again again",
//     "email": "test@example.com",
//     "avatar": "default.jpg",
//     "phoneNumber": "1234567890",
//     "password": "$2a$10$jkY.BVTiCnJe7WiwdrtIduz6pQ/E2sSnUxNL3KN5v6aaRuB3C8nH6",
//     "CIN": "ss112222",
//     "roles": [
//       "6710ec432e620a5399c3259f"
//     ],
//     "isVerified": true,
//     "isBanned": true,
//     "trustedDevices": [],
//     "__v": 0
//   }
// }
// POST
// Switch Role
// http://localhost:3000/api/users/switchRole/
// This endpoint allows the Clientto switch his role to Delivery Person by sending an HTTP PUT request to the specified URL, that precisely push a new role into the user's roles array The request should include the required authentication authorization for this action.

// Upon a successful execution of the request, the server responds with a status code of 200 and a JSON object containing a message and the user's details , including the new updated role with a message 'Role Switched to Delivery' .

// Method
// POST
// URL
// http://localhost:3000/api/users/switchRole
// Headers
// Authentication Auth
// Request
// No request body parameters are required for this endpoint.
// Example response:

// View More
// json
// {
//     "message": "Role switched to Delivery",
//     "user": {
//         "fullname": {
//             "fname": "Manager",
//             "lname": "Test"
//         },
//         "_id": "6717d2d2184066d54ae9cf11",
//         "username": "manager",
//         "email": "manager@email.com",
//         "avatar": "default.jpg",
//         "phoneNumber": "1111111111",
//         "password": "$2a$10$QVCcj5llII4Af.8FyjshDu1IBE4oBeLIczxFji2cCsH2NkH9dGOJu",
//         "CIN": "MM112233",
//         "roles": [
//             "6710ec432e620a5399c3259d",
//             "6710ec432e620a5399c325a0"
//         ],
//         "isVerified": true,
//         "isBanned": false,
//         "trustedDevices": [
//             {
//                 "agent": "PostmanRuntime/7.41.0",
//                 "deviceName": "Unknown Device",
//                 "addedAt": "2024-10-22T16:32:23.572Z",
//                 "_id": "6717d397184066d54ae9cf19"
//             }
//         ],
//         "__v": 4
//     }
// }
// AUTHORIZATION
// Bearer Token
// Token
// <token>

// Example Request
// Switch Role
// View More
// curl
// curl --location --request POST 'http://localhost:3000/api/users/switchRole/'
// 200 OK
// Example Response
// Body
// Headers (10)
// View More
// json
// {
//   "message": "Role switched to Delivery",
//   "user": {
//     "fullname": {
//       "fname": "Manager",
//       "lname": "Test"
//     },
//     "_id": "6717d2d2184066d54ae9cf11",
//     "username": "manager",
//     "email": "manager@email.com",
//     "avatar": "default.jpg",
//     "phoneNumber": "1111111111",
//     "password": "$2a$10$QVCcj5llII4Af.8FyjshDu1IBE4oBeLIczxFji2cCsH2NkH9dGOJu",
//     "CIN": "MM112233",
//     "roles": [
//       "6710ec432e620a5399c3259d",
//       "6710ec432e620a5399c325a0"
//     ],
//     "isVerified": true,
//     "isBanned": false,
//     "trustedDevices": [
//       {
//         "agent": "PostmanRuntime/7.41.0",
//         "deviceName": "Unknown Device",
//         "addedAt": "2024-10-22T16:32:23.572Z",
//         "_id": "6717d397184066d54ae9cf19"
//       }
//     ],
//     "__v": 4
//   }
// }
// GET
// Search Restaurant or Meal
// http://localhost:3000/api/search/?query=restaurant
// Search Restaurants
// This endpoint makes an HTTP GET request to search for restaurants or items based on the provided query parameter.

// Method
// GET
// URL
// http://localhost:3000/api/search/?query=restaurant
// Headers
// No specific headers provided
// Request
// No request body parameters are required for this endpoint.
// Response
// Status: 200

// Content-Type: application/json

// { "totalRestaurants": 0, "totalItems": 0, "restaurants": [ { "category": { "name": "", "description": "" }, "isApprouved": true, "isDeleted": true, "_id": "", "name": "", "address": "", "phoneNumber": "", "logo": "", "cover": "", "images": [], "owner": "", "openAt": "", "closeAt": "", "__v": 0 } ], "items": []}

// Example
// { "totalRestaurants": 0, "totalItems": 0, "restaurants": [ { "category": { "name": "", "description": "" }, "isApprouved": true, "isDeleted": true, "_id": "", "name": "", "address": "", "phoneNumber": "", "logo": "", "cover": "", "images": [], "owner": "", "openAt": "", "closeAt": "", "__v": 0 } ], "items": []}
// PARAMS
// query
// restaurant

import axios from "axios";

// get user by id and token
export const getUserByIdAndToken = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

