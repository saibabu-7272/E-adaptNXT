# Frontend 
Implemented only a few features.
Tech stack:
- React
- CSS
- JavaScript
to set up the  frontend
Install dependencies
```
cd frontend
npm install
npm start
```
Note: Create a .env file as given.
```
REACT_APP_API_URL=api URL (ex HTTP://localhost:5000/)
```

# E-commerce API (Backend)
A basic E-commerce REST API built with Node.js, Express, MongoDB, and JWT Authentication, supporting:

- Product Listing with Search & Pagination

- Cart Management

- Order Placement

- User Authentication (Customer & Admin roles)

- Admin-only Product Management

## 🚀 Tech Stack
- Node.js

- Express.js

- MongoDB & Mongoose

- JSON Web Tokens (JWT)

- bcrypt (Password Hashing)

- dotenv

## 📁 Project Structure
```
ecommerce-api/
│
├── config/             # DB connection  
├── controllers/        # Route logic  
├── middleware/         # Auth & Role checks  
├── models/             # Mongoose models  
├── routes/             # API routes  
├── .env                # Environment variables (create your own, example file given below) 
├── server.js           # Entry point  
└── package.json   
```
## ⚙️ Backend Setup Instructions
Clone the repository

```
git clone https://github.com/saibabu-7272/E-adaptNXT
cd ecommerce-api
```
Install dependencies
```
npm install
```
or
```
npm install express mongoose jsonwebtoken bcrypt dotenv 
```
Configure .env file
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the server
```

```
node server.js
```
Server will run on: http://localhost:5000

## 🔑 API Endpoints
### Auth Routes
Method	Endpoint	Access	Description

POST	/api/auth/register	Public	Register new user
Example:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json
Accept: application/json

{
  "name": "aadhya",
  "email": "aadhya@example.com",
  "password": "123456",
  "role": "admin"
}

```
POST	/api/auth/login	Public	Login & get token
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json
Accept: application/json

{
  "email": "john@example.com",
  "password": "12345"
}
```

Product Routes
Method	Endpoint	Access	Description

GET	/api/products	Public	Get all products (search & pagination supported)
```
POST http://localhost:5000/api/products
Content-Type: application/json
Accept: application/json
Authorization: Bearer <Jwt token>

{
  "name": "Black Jeans",
  "category": "Clothing",
  "price": 2999,
  "description": "Comfortable Jeans",
  "stock": 50
}
```
GET	/api/products/:id	Public	Get product by ID
```
```
POST	/api/products	Admin	Add new product
```
POST http://localhost:5000/api/products
Content-Type: application/json
Accept: application/json
Authorization: Bearer <Jwt token>

{
  "name": "Black Jeans",
  "category": "Clothing",
  "price": 2999,
  "description": "Comfortable Jeans",
  "stock": 50
}
```

Search & Pagination Example:
GET http://localhost:5000/api/products (Public API to fetch all the products)

```
GET /api/products?search=shirt&page=2&limit=5
```
Cart Routes
Method	Endpoint	Access	Description

GET	/api/cart	Customer	 Get the current cart
```
GET http://localhost:5000/api/cart
Authorization: Bearer <Jwt token>

```
POST	/api/cart/add	Customer	Add item to cart
```
POST http://localhost:5000/api/cart/add
Content-Type: application/json
Accept: application/json
Authorization: Bearer <Jwt token>

{
  "productId":"686b60a6300c10bea071ebd8",
  "quantity": 2
}

```
DELETE	/api/cart/remove/:productId	Customer	Remove item from cart
```
DELETE http://localhost:5000/api/cart/remove/686b60a6300c10bea071ebd8
Authorization: Bearer <Jwt token>

```
Order Routes
Method	Endpoint	Access	Description

POST	/api/orders	Customer	Place order from cart
```
POST http://localhost:5000/api/orders
Authorization: Bearer <Jwt token>

```
GET	/api/orders/my-orders	Customer	View own orders
```
GET http://localhost:5000/api/orders/my-orders
Content-Type: application/json
Authorization: Bearer <Jwt token>

```
GET	/api/orders	Admin	View all orders (admin)
```
GET http://localhost:5000/api/orders
Authorization: Bearer <Jwt token>

```

👥 User Roles
Customer: View products, manage cart, place orders

Admin: All customer permissions + manage products

📦 Example API Usage with Token
For protected routes, pass the token in headers:
```
Authorization: Bearer your_jwt_token_here
```
