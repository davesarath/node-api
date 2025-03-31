# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Demo URL
```
https://node-api-malm.onrender.com/api
```

---
## **Authentication APIs**

### **1. User Registration**
**Endpoint:**
```
POST /users
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "token": "jwt_token_here"
}
```
**Errors:**
- `400 Bad Request`: Validation errors
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Database error

---

### **2. User Login**
**Endpoint:**
```
POST /login
```
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "jwt_token_here"
}
```
**Errors:**
- `400 Bad Request`: Invalid email or password
- `500 Internal Server Error`: Database error

---
## **Category APIs** *(Requires Authentication)*

### **3. Create Category**
**Endpoint:**
```
POST /categories
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Request Body:**
```json
{
  "code": "ELEC",
  "name": "Electronics",
  "description": "Electronic products"
}
```
**Response:**
```json
{
  "id": 1,
  "code": "ELEC",
  "name": "Electronics",
  "description": "Electronic products"
}
```
**Errors:**
- `400 Bad Request`: Missing required fields
- `403 Forbidden`: Token missing or invalid
- `500 Internal Server Error`: Database error

---
### **4. Get All Categories**
**Endpoint:**
```
GET /categories
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Response:**
```json
[
  {
    "id": 1,
    "code": "ELEC",
    "name": "Electronics",
    "description": "Electronic products"
  }
]
```
**Errors:**
- `403 Forbidden`: Token missing or invalid
- `500 Internal Server Error`: Database error

---
### **5. Get Category by ID**
**Endpoint:**
```
GET /categories/:id
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Response:**
```json
{
  "id": 1,
  "code": "ELEC",
  "name": "Electronics",
  "description": "Electronic products"
}
```
**Errors:**
- `403 Forbidden`: Token missing or invalid
- `404 Not Found`: Category not found
- `500 Internal Server Error`: Database error

---
## **Product APIs** *(Requires Authentication)*

### **6. Create Product**
**Endpoint:**
```
POST /products
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Request Body:**
```json
{
  "code": "LAPTOP123",
  "name": "Laptop",
  "description": "Gaming laptop",
  "category_id": 1
}
```
**Response:**
```json
{
  "id": 1,
  "code": "LAPTOP123",
  "name": "Laptop",
  "description": "Gaming laptop",
  "category_id": 1
}
```
**Errors:**
- `400 Bad Request`: Missing required fields
- `403 Forbidden`: Token missing or invalid
- `409 Conflict`: Product code already exists
- `500 Internal Server Error`: Database error

---
### **7. Get All Products**
**Endpoint:**
```
GET /products
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Response:**
```json
[
  {
    "id": 1,
    "code": "LAPTOP123",
    "name": "Laptop",
    "description": "Gaming laptop",
    "category_id": 1,
    "category_name": "Electronics"
  }
]
```
**Errors:**
- `403 Forbidden`: Token missing or invalid
- `500 Internal Server Error`: Database error

---
### **8. Get Product by ID**
**Endpoint:**
```
GET /products/:id
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Response:**
```json
{
  "id": 1,
  "code": "LAPTOP123",
  "name": "Laptop",
  "description": "Gaming laptop",
  "category_id": 1,
  "category_name": "Electronics"
}
```
**Errors:**
- `403 Forbidden`: Token missing or invalid
- `404 Not Found`: Product not found
- `500 Internal Server Error`: Database error

---
## **Authentication Notes**
- All endpoints (except registration & login) **require JWT authentication**.
- Include `Authorization: Bearer jwt_token_here` in headers.
- Tokens expire in **1 hour**, users need to log in again to get a new token.

---
## **Response Status Codes**
| Status Code | Meaning |
|------------|---------|
| 200 OK | Successful request |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid input or missing fields |
| 403 Forbidden | Token missing or invalid |
| 404 Not Found | Requested resource not found |
| 409 Conflict | Duplicate data (e.g., email, product code) |
| 500 Internal Server Error | Database or server error |

---
## **Future Improvements**
- Implement **PUT/PATCH** endpoints for updating categories/products.
- Implement **DELETE** endpoints.
- Improve token expiration handling with refresh tokens.

---
**📌 Note:** Ensure `dotenv` is set up for `JWT_SECRET` security.

