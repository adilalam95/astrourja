Product Catalog System
A Node.js-based RESTful API for managing a product catalog with user authentication, built using Express, MongoDB, and JWT. The system supports CRUD operations for products, search/filter functionality, and secure user registration/login.
Features

Product Management: Create, read, update, and delete products with fields for name, description, price, and category.
Search and Filter: Search products by name, category, and price range (public access).
Authentication: JWT-based authentication for creating, updating, and deleting products.
Timestamps: Automatically track createdAt and updatedAt for products and users.
Logging: Centralized logging with context using Winston, stored in logs/app.log and console.
Modular Design: Uses service layer pattern (ProductService, AuthService), plain object controllers, and a class-based LoggerService.


Prerequisites

Node.js (v14 or higher)
MongoDB (local or cloud, e.g., MongoDB Atlas)
npm

Setup Instructions

Clone the Repository (or create the project structure manually):
git clone 
cd product-catalog-system


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the root directory with the following:
MONGO_URI=mongodb://localhost:27017/product-catalog
JWT_SECRET=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
PORT=3000


Replace MONGO_URI with your MongoDB connection string.
Use a secure, random JWT_SECRET (at least 32 characters, e.g., generated via node -e "console.log(require('crypto').randomBytes(32).toString('hex'))").


Create Required Folders:
mkdir logs
mkdir helpers


Start the Server:
npm start

Or for development with auto-restart:
npm run dev


Test the API:Use Postman, curl, or another API client to test the endpoints (see below).


Dependencies

express: Web framework for Node.js
mongoose: MongoDB ORM
jsonwebtoken: JWT for authentication
bcryptjs: Password hashing
dotenv: Environment variable management
winston: Logging
nodemon (dev): Auto-restart server during development

API Endpoints
Authentication

POST /api/auth/register

Description: Register a new user.
Authentication: None (public).
Request Body:{
  "email": "user@example.com",
  "password": "password123"
}


Response (201):{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Errors: 400 (email exists), 500 (server error).


POST /api/auth/login

Description: Log in a user and return a JWT token.
Authentication: None (public).
Request Body:{
  "email": "user@example.com",
  "password": "password123"
}


Response (200):{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Errors: 401 (invalid credentials), 500 (server error).



Products

GET /api/products

Description: Retrieve products with optional filters.
Authentication: None (public).
Query Parameters:
category (string, optional): Filter by category.
priceMin (number, optional): Minimum price.
priceMax (number, optional): Maximum price.
name (string, optional): Partial name match (case-insensitive).


Example:GET http://localhost:3000/api/products?category=Electronics&priceMin=500&priceMax=1000&name=laptop


Response (200):[
  {
    "_id": "1234567890abcdef",
    "name": "Laptop",
    "description": "High-end gaming laptop",
    "price": 999.99,
    "category": "Electronics",
    "createdAt": "2025-08-03T14:03:01.000Z",
    "updatedAt": "2025-08-03T14:03:01.000Z"
  }
]


Errors: 500 (server error).


GET /api/products/:id

Description: Retrieve a product by ID.
Authentication: None (public).
Example:GET http://localhost:3000/api/products/1234567890abcdef


Response (200):{
  "_id": "1234567890abcdef",
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 999.99,
  "category": "Electronics",
  "createdAt": "2025-08-03T14:03:01.000Z",
  "updatedAt": "2025-08-03T14:03:01.000Z"
}


Errors: 404 (product not found), 500 (server error).


POST /api/products

Description: Create a new product.
Authentication: JWT token in Authorization: Bearer <token> header.
Request Body:{
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 999.99,
  "category": "Electronics"
}


Response (201):{
  "_id": "1234567890abcdef",
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 999.99,
  "category": "Electronics",
  "createdAt": "2025-08-03T14:03:01.000Z",
  "updatedAt": "2025-08-03T14:03:01.000Z"
}


Errors: 400 (invalid input), 401 (unauthorized), 500 (server error).


PUT /api/products/:id

Description: Update a product by ID.
Authentication: JWT token in Authorization: Bearer <token> header.
Request Body:{
  "name": "Updated Laptop",
  "description": "Updated gaming laptop",
  "price": 1099.99,
  "category": "Electronics"
}


Response (200):{
  "_id": "1234567890abcdef",
  "name": "Updated Laptop",
  "description": "Updated gaming laptop",
  "price": 1099.99,
  "category": "Electronics",
  "createdAt": "2025-08-03T14:03:01.000Z",
  "updatedAt": "2025-08-03T14:05:00.000Z"
}


Errors: 400 (invalid input), 401 (unauthorized), 404 (product not found), 500 (server error).


DELETE /api/products/:id

Description: Delete a product by ID.
Authentication: JWT token in Authorization: Bearer <token> header.
Example:DELETE http://localhost:3000/api/products/1234567890abcdef


Response (200):{
  "message": "Product deleted"
}


Errors: 401 (unauthorized), 404 (product not found), 500 (server error).



Logging

Logs are written to logs/app.log and the console in JSON format.
Each log includes a context field (e.g., productService, authController) for traceability.
Example log:{"context":"productService","message":"Fetched products with filters","level":"info","timestamp":"2025-08-03T14:03:01.000Z","metadata":{"category":"Electronics","priceMin":500,"priceMax":1000,"name":"laptop"}}



Testing

Use Postman or curl to test the endpoints.
Register or log in to obtain a JWT token for protected endpoints.
Ensure MongoDB is running and the JWT_SECRET is set in .env.

Notes

The JWT_SECRET should be a secure, random string (e.g., generated via node -e "console.log(require('crypto').randomBytes(32).toString('hex'))").
Add .env to .gitignore to prevent exposing sensitive data.
For production, consider using a secrets manager for JWT_SECRET and MONGO_URI.

Future Improvements

Add input validation (e.g., Joi or express-validator).
Implement pagination for the product search endpoint.
Add password strength checks in AuthService.
Enhance logging with additional transports (e.g., cloud logging services).

License
MIT License
