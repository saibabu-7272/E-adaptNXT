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
git clone your-repo-link
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
```
POST	/api/auth/register	Public	Register new user
POST	/api/auth/login	Public	Login & get token
```
Product Routes
Method	Endpoint	Access	Description
```
GET	/api/products	Public	Get all products (search & pagination supported)
GET	/api/products/:id	Public	Get product by ID
POST	/api/products	Admin	Add new product
PUT	/api/products/:id	Admin	Update product
DELETE	/api/products/:id	Admin	Delete product
```
Search & Pagination Example:

```
GET /api/products?search=shirt&page=2&limit=5
```
Cart Routes
Method	Endpoint	Access	Description
```
GET	/api/cart	Customer	Get current cart
POST	/api/cart/add	Customer	Add item to cart
DELETE	/api/cart/remove/:productId	Customer	Remove item from cart
```
Order Routes
Method	Endpoint	Access	Description
```
POST	/api/orders	Customer	Place order from cart
GET	/api/orders/my-orders	Customer	View own orders
GET	/api/orders	Admin	View all orders (admin)
```
👥 User Roles
Customer: View products, manage cart, place orders

Admin: All customer permissions + manage products

📦 Example API Usage with Token
For protected routes, pass the token in headers:
```
Authorization: Bearer your_jwt_token_here
```
